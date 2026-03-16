import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Loader2, AlertCircle, CheckCircle2, LogIn } from 'lucide-react';
import { GoogleGenAI, Type, FunctionDeclaration } from "@google/genai";
import { auth, storage } from '../../firebase';
import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

import { Sidebar } from './Sidebar';
import { Chatbot } from './Chatbot';
import { RequestForm } from './RequestForm';
import { RequestList } from './RequestList';
import { ChatMessage, SupportRequest } from './types';

export function UserSupport() {
  const [activeTab, setActiveTab] = useState<'new' | 'my_requests' | 'public_board'>('new');
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [isAuthReady, setIsAuthReady] = useState(false);
  
  // Board State
  const [requests, setRequests] = useState<SupportRequest[]>([]);
  const [isLoadingBoard, setIsLoadingBoard] = useState(true);
  const [replyText, setReplyText] = useState('');
  const [isSubmittingReply, setIsSubmittingReply] = useState(false);

  // Chat State
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Form State
  const [showForm, setShowForm] = useState(false);
  const [useChatbot, setUseChatbot] = useState(true);
  const [formData, setFormData] = useState({
    name: '', email: '', title: '', description: '', deadline: '', budget: '', file_url: ''
  });
  const [uploadingFile, setUploadingFile] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      if (u) {
        setFormData(prev => ({ ...prev, name: u.displayName || '', email: u.email || '' }));
        if (chatMessages.length === 0) {
          setChatMessages([
            {
              id: '1',
              role: 'model',
              text: `Hello ${u.displayName?.split(' ')[0]}! I am your academic project assistant. Let's get your project request set up. What is the title of your project?`,
              step: 'title',
              formSubmitted: false
            }
          ]);
        }
      }
      setIsAuthReady(true);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      setIsLoadingBoard(true);
      const response = await fetch('/api/support-requests');
      if (response.ok) {
        const data = await response.json();
        setRequests(data.data || []);
      }
    } catch (error) {
      console.error('Error fetching requests:', error);
    } finally {
      setIsLoadingBoard(false);
    }
  };

  const handleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Error signing in with Google", error);
    }
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      setUser(null);
      setFormData({ name: '', email: '', title: '', description: '', deadline: '', budget: '', file_url: '' });
      setChatMessages([]);
      setActiveTab('new');
    } catch (error) {
      console.error("Error signing out", error);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    setUploadingFile(true);
    try {
      const storageRef = ref(storage, `support_files/${user.uid}/${Date.now()}_${file.name}`);
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      setFormData(prev => ({ ...prev, file_url: downloadURL }));
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Failed to upload file. Please try again.");
    } finally {
      setUploadingFile(false);
    }
  };

  const handleStepSubmit = (step: string) => {
    setChatMessages(prev => prev.map(msg => msg.step === step ? { ...msg, formSubmitted: true } : msg));
    
    let nextStep: 'title' | 'description' | 'deadline_budget' | 'files' | 'review_submit' | undefined;
    let nextMessage = '';

    if (step === 'name_email') {
      nextStep = 'title';
      nextMessage = "Great! What is the title of your project?";
    } else if (step === 'title') {
      nextStep = 'description';
      nextMessage = "Got it. Please provide a detailed description of your project objectives and requirements.";
    } else if (step === 'description') {
      nextStep = 'deadline_budget';
      nextMessage = "Excellent. Do you have a specific deadline or budget in mind? (These are optional)";
    } else if (step === 'deadline_budget') {
      nextStep = 'files';
      nextMessage = "Almost done. Do you have any files or documents to attach to this request?";
    } else if (step === 'files') {
      nextStep = 'review_submit';
      nextMessage = "Thank you! You can now review your details and submit the request.";
    }

    if (nextStep) {
      setIsTyping(true);
      setTimeout(() => {
        setChatMessages(prev => [...prev, {
          id: Date.now().toString(),
          role: 'model',
          text: nextMessage,
          step: nextStep,
          formSubmitted: false
        }]);
        setIsTyping(false);
      }, 1000);
    }
  };

  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || isTyping || !user) return;

    const userMessage = chatInput;
    setChatInput('');
    setChatMessages(prev => [...prev, { id: Date.now().toString(), role: 'user', text: userMessage }]);
    setIsTyping(true);

    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error("Gemini API key is missing");
      }

      const ai = new GoogleGenAI({ apiKey });
      
      const requestInputDeclaration: FunctionDeclaration = {
        name: "request_input",
        description: "Request specific information from the user to fill out the support request form.",
        parameters: {
          type: Type.OBJECT,
          properties: {
            field: {
              type: Type.STRING,
              description: "The field to request. Must be one of: 'title', 'description', 'deadline_budget', 'files', 'review_submit'",
            },
            message: {
              type: Type.STRING,
              description: "The message to display to the user asking for the information.",
            }
          },
          required: ["field", "message"],
        },
      };

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [
          { role: 'user', parts: [{ text: "System Context: You are an academic project assistant helping a user submit a request. The user's name is " + user.displayName + ". Guide them through providing a title, description, optional deadline/budget, and optional file attachments. Use the request_input tool to present form fields at the appropriate time." }] },
          ...chatMessages.map(msg => ({
            role: msg.role,
            parts: [{ text: msg.text }]
          })),
          { role: 'user', parts: [{ text: userMessage }] }
        ],
        config: {
          tools: [{ functionDeclarations: [requestInputDeclaration] }],
          systemInstruction: "You are a helpful academic project assistant. Your goal is to gather information for a project request. Be polite and concise. Use the request_input tool to ask for specific fields sequentially: title, description, deadline/budget, files, and finally review_submit. Do not ask for everything at once.",
        }
      });

      const functionCalls = response.functionCalls;
      if (functionCalls && functionCalls.length > 0) {
        const call = functionCalls[0];
        if (call.name === 'request_input') {
          const args = call.args as any;
          setChatMessages(prev => [...prev, {
            id: Date.now().toString(),
            role: 'model',
            text: args.message,
            step: args.field as any,
            formSubmitted: false
          }]);
        }
      } else if (response.text) {
        setChatMessages(prev => [...prev, { id: Date.now().toString(), role: 'model', text: response.text || "I didn't quite catch that." }]);
      }

    } catch (error) {
      console.error("Chat error:", error);
      setChatMessages(prev => [...prev, { id: Date.now().toString(), role: 'model', text: "I'm having trouble connecting right now. Please try again or use the manual form." }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('/api/support-requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          user_id: user?.uid // Assuming backend can handle user_id
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit request');
      }

      setSubmitStatus({ type: 'success', message: 'Request submitted successfully! We will be in touch soon.' });
      setFormData({ name: user?.displayName || '', email: user?.email || '', title: '', description: '', deadline: '', budget: '', file_url: '' });
      setShowForm(false);
      fetchRequests();
      setActiveTab('my_requests');
      
      // Reset chat
      setChatMessages([{
        id: Date.now().toString(),
        role: 'model',
        text: `Your request has been submitted successfully! Is there anything else I can help you with today?`,
      }]);

    } catch (error) {
      console.error('Submission error:', error);
      setSubmitStatus({ type: 'error', message: 'Failed to submit request. Please try again later.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReplySubmit = async (e: React.FormEvent, requestId: number) => {
    e.preventDefault();
    if (!replyText.trim() || !user) return;

    setIsSubmittingReply(true);
    try {
      const response = await fetch(`/api/support-requests/${requestId}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sender_name: user.displayName || 'User',
          sender_type: 'user',
          message: replyText,
        }),
      });

      if (response.ok) {
        setReplyText('');
        fetchRequests();
      } else {
        throw new Error('Failed to send reply');
      }
    } catch (error) {
      console.error('Error sending reply:', error);
      alert('Failed to send reply. Please try again.');
    } finally {
      setIsSubmittingReply(false);
    }
  };

  if (!isAuthReady) {
    return (
      <div className="flex-1 flex items-center justify-center bg-sand dark:bg-night">
        <Loader2 className="animate-spin text-sage" size={32} />
      </div>
    );
  }

  return (
    <div className="flex-1 bg-sand dark:bg-night flex flex-col md:flex-row pt-16">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        user={user} 
        handleLogin={handleLogin} 
        handleLogout={handleLogout} 
      />

      {/* Main Content Area */}
      <div className="flex-1 p-4 md:p-8 pb-24 md:pb-8 h-[calc(100vh-64px)] overflow-y-auto">
        <div className="max-w-6xl mx-auto h-full">
          
          {submitStatus && (
            <div className={`mb-6 p-4 rounded-2xl flex items-start gap-3 ${submitStatus.type === 'success' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800/50' : 'bg-red-50 text-red-700 border border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800/50'}`}>
              {submitStatus.type === 'success' ? <CheckCircle2 className="shrink-0 mt-0.5" size={20} /> : <AlertCircle className="shrink-0 mt-0.5" size={20} />}
              <p className="text-sm font-medium">{submitStatus.message}</p>
            </div>
          )}

          {!user ? (
            <div className="h-full flex flex-col items-center justify-center text-center max-w-md mx-auto">
              <div className="w-20 h-20 bg-white dark:bg-night-surface rounded-full flex items-center justify-center mb-6 shadow-sm border border-dark/5 dark:border-white/5">
                <LogIn size={32} className="text-sage" />
              </div>
              <h2 className="text-3xl font-serif text-dark dark:text-night-text mb-4">Welcome to Project Hub</h2>
              <p className="text-stone dark:text-night-muted mb-8 text-lg">Sign in to submit requests, track progress, and collaborate with our team.</p>
              <button
                onClick={handleLogin}
                className="flex items-center gap-3 bg-dark text-white dark:bg-white dark:text-dark px-8 py-4 rounded-2xl text-lg font-medium hover:bg-dark/90 dark:hover:bg-white/90 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                <LogIn size={20} />
                Sign In with Google
              </button>
            </div>
          ) : (
            <AnimatePresence mode="wait">
              {activeTab === 'new' && (
                <motion.div
                  key="new"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="h-full flex flex-col gap-6"
                >
                  <div className="flex justify-end">
                    <button
                      onClick={() => setUseChatbot(!useChatbot)}
                      className="text-sm font-medium text-sage hover:text-sage/80 transition-colors bg-sage/10 px-4 py-2 rounded-full"
                    >
                      {useChatbot ? 'Switch to Manual Form' : 'Use AI Assistant'}
                    </button>
                  </div>
                  
                  <div className="flex-1 flex flex-col lg:flex-row gap-6 h-full">
                    {useChatbot ? (
                      <>
                        <Chatbot 
                          chatMessages={chatMessages}
                          chatInput={chatInput}
                          setChatInput={setChatInput}
                          isTyping={isTyping}
                          handleChatSubmit={handleChatSubmit}
                          formData={formData}
                          setFormData={setFormData}
                          handleStepSubmit={handleStepSubmit}
                          handleFileUpload={handleFileUpload}
                          uploadingFile={uploadingFile}
                          setShowForm={setShowForm}
                          showForm={showForm}
                        />

                        {showForm && (
                          <RequestForm 
                            formData={formData}
                            setFormData={setFormData}
                            handleSubmit={handleSubmit}
                            handleFileUpload={handleFileUpload}
                            uploadingFile={uploadingFile}
                            isSubmitting={isSubmitting}
                            setShowForm={setShowForm}
                          />
                        )}
                      </>
                    ) : (
                      <div className="w-full max-w-3xl mx-auto">
                        <RequestForm 
                          formData={formData}
                          setFormData={setFormData}
                          handleSubmit={handleSubmit}
                          handleFileUpload={handleFileUpload}
                          uploadingFile={uploadingFile}
                          isSubmitting={isSubmitting}
                          setShowForm={() => setUseChatbot(true)}
                        />
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {activeTab === 'my_requests' && (
                <motion.div
                  key="my_requests"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="h-full"
                >
                  {isLoadingBoard ? (
                    <div className="flex items-center justify-center h-full">
                      <Loader2 className="animate-spin text-sage" size={32} />
                    </div>
                  ) : (
                    <RequestList 
                      requests={requests.filter(r => r.email === user.email)}
                      title="My Requests"
                      description="Track the status of your submitted projects."
                      user={user}
                      handleReplySubmit={handleReplySubmit}
                      replyText={replyText}
                      setReplyText={setReplyText}
                      isSubmittingReply={isSubmittingReply}
                    />
                  )}
                </motion.div>
              )}

              {activeTab === 'public_board' && (
                <motion.div
                  key="public_board"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="h-full"
                >
                  {isLoadingBoard ? (
                    <div className="flex items-center justify-center h-full">
                      <Loader2 className="animate-spin text-sage" size={32} />
                    </div>
                  ) : (
                    <RequestList 
                      requests={requests}
                      title="Public Board"
                      description="View all ongoing and completed projects."
                      user={null} // Don't allow replies on public board
                      handleReplySubmit={() => {}}
                      replyText={''}
                      setReplyText={() => {}}
                      isSubmittingReply={false}
                    />
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </div>
      </div>
    </div>
  );
}
