import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Mic, MicOff, Send, MessageSquare, ArrowLeft, Loader2, StopCircle } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { submitFollowUp, getNextQuestion, endInterviewSession } from "../utils/api";

export default function InterviewSession() {
  const navigate = useNavigate();
  const location = useLocation();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const { interviewData, setupData } = location.state || {};
  
  // Audio playback ref
  const audioRef = useRef(null);

  // States for flow
  // Phases: init, question, follow_up, ending, finished
  const [phase, setPhase] = useState("init");
  const [questionNum, setQuestionNum] = useState(1);
  const [conversation, setConversation] = useState([]);
  
  // Speech Recognition state
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const recognitionRef = useRef(null);

  useEffect(() => {
    if (!interviewData) {
      navigate("/dashboard/interview/setup");
      return;
    }

    // Initialize Speech Recognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;

      recognition.onresult = (event) => {
        let currentTranscript = "";
        for (let i = event.resultIndex; i < event.results.length; i++) {
          currentTranscript += event.results[i][0].transcript;
        }
        setTranscript(prev => {
          // Because continuous is true, we might just append, or we replace depending on interim logic.
          // For simplicity, we just set the entire final+interim from the event if it's the only one, 
          // or we manage it carefully. A safer approach:
          let finalTranscript = "";
          let interimTranscript = "";
          for (let i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
              finalTranscript += event.results[i][0].transcript;
            } else {
              interimTranscript += event.results[i][0].transcript;
            }
          }
          // We assume we clear the transcript state when recording starts.
          // So we can append final to a ref or just keep replacing state.
          // To make it simple, we just use event.results to build the full text since start.
          let full = "";
          for (let i = 0; i < event.results.length; i++) {
            full += event.results[i][0].transcript;
          }
          return full;
        });
      };

      recognition.onerror = (event) => {
        console.error("Speech recognition error", event.error);
        if (event.error === 'not-allowed') {
          setError("Microphone access denied.");
          setIsRecording(false);
        }
      };
      
      recognition.onend = () => {
         setIsRecording(false);
      }

      recognitionRef.current = recognition;
    } else {
      setError("Speech recognition is not supported in this browser.");
    }

    // Start flow: Play intro, then first question
    startFlow();

    return () => {
      if (audioRef.current) audioRef.current.pause();
      if (recognitionRef.current) recognitionRef.current.stop();
    };
  }, [navigate, interviewData]);

  const playAudio = (base64Audio) => {
    return new Promise((resolve) => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      const audio = new Audio(`data:audio/mp3;base64,${base64Audio}`);
      audioRef.current = audio;
      audio.onended = resolve;
      audio.play().catch(e => {
        console.error("Audio play failed", e);
        resolve(); // resolve anyway to keep flow moving
      });
    });
  };

  const addMessage = (speaker, text) => {
    setConversation(prev => [...prev, { speaker, text }]);
  };

  const startFlow = async () => {
    setPhase("init");
    addMessage("ai", interviewData.intro.text);
    await playAudio(interviewData.intro.audio_base64);

    setPhase("question");
    addMessage("ai", interviewData.first_question.text);
    await playAudio(interviewData.first_question.audio_base64);
  };

  const toggleRecording = () => {
    if (isRecording) {
      recognitionRef.current?.stop();
      setIsRecording(false);
    } else {
      setTranscript("");
      setError("");
      recognitionRef.current?.start();
      setIsRecording(true);
    }
  };

  const handleManualTranscriptChange = (e) => {
    setTranscript(e.target.value);
  };

  const handleSubmitAnswer = async () => {
    if (!transcript.trim()) return;

    const answer = transcript.trim();
    addMessage("user", answer);
    setTranscript("");
    setIsLoading(true);

    try {
      if (phase === "question") {
        // Submit answer to main question -> get follow-up
        const res = await submitFollowUp(
          interviewData.interview_id,
          questionNum,
          "text",
          answer,
          null
        );

        if (res.status === "success") {
          setPhase("follow_up");
          addMessage("ai", res.follow_up.text);
          await playAudio(res.follow_up.audio_base64);
        } else {
          setError(res.message);
        }
      } else if (phase === "follow_up") {
        if (questionNum < 5) {
          // Submit follow-up answer -> get next question
          const nextQNum = questionNum + 1;
          const res = await getNextQuestion(
            interviewData.interview_id,
            nextQNum,
            "text",
            answer,
            null
          );

          if (res.status === "success") {
            setQuestionNum(nextQNum);
            setPhase("question");
            addMessage("ai", res.question.text);
            await playAudio(res.question.audio_base64);
          } else {
            setError(res.message);
          }
        } else {
          // Submit last follow-up answer -> end interview
          setPhase("ending");
          addMessage("ai", "Thank you. Analyzing your responses...");
          
          const res = await endInterviewSession(
            interviewData.interview_id,
            "text",
            answer,
            null
          );

          if (res.status === "success") {
             navigate("/dashboard/interview/results", {
               state: { score: res.score, feedback: res.feedback }
             });
          } else {
             setError(res.message);
          }
        }
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred connecting to the backend.");
    } finally {
      setIsLoading(false);
    }
  };

  // Auto-scroll conversation
  const messagesEndRef = useRef(null);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversation, transcript]);

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col">
      <div className="p-6 flex justify-between items-center border-b border-slate-800">
        <button
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Exit Session
        </button>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-4 py-2 bg-rose-500/10 text-rose-500 rounded-full border border-rose-500/20">
            <div className="w-2 h-2 bg-rose-500 rounded-full animate-pulse"></div>
            Live Session
          </div>
          <div className="text-white font-mono text-lg">
             Q{questionNum}/5
          </div>
        </div>
      </div>
      
      <div className="flex-1 flex flex-col lg:flex-row p-6 gap-6 h-[calc(100vh-80px)] overflow-hidden">
        
        {/* Left Side: Avatar & Status */}
        <div className="lg:w-1/3 flex flex-col items-center justify-center bg-slate-800/50 rounded-[2rem] border border-slate-700/50 p-8 relative">
           <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/5 to-transparent rounded-[2rem] pointer-events-none"></div>
           
           <motion.div
             animate={!isLoading && (phase === "question" || phase === "follow_up" || phase === "init") ? { scale: [1, 1.05, 1], transition: { repeat: Infinity, duration: 2 } } : {}}
             className="w-32 h-32 bg-indigo-600 rounded-full flex items-center justify-center shadow-2xl shadow-indigo-500/40 mb-8 relative"
           >
             {isLoading ? (
               <Loader2 className="w-12 h-12 text-white animate-spin" />
             ) : (
               <Play className="w-14 h-14 fill-current ml-2 text-white" />
             )}
             
             {isRecording && (
                <div className="absolute -bottom-2 -right-2 bg-rose-500 p-2 rounded-full border-4 border-slate-800">
                   <Mic className="w-4 h-4 text-white" />
                </div>
             )}
           </motion.div>

           <h2 className="text-2xl font-bold mb-2">AI Interviewer</h2>
           <p className="text-slate-400 text-center text-sm max-w-[250px]">
             {isLoading ? "Thinking..." : "Listening to your response"}
           </p>
           
           {error && (
             <div className="mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm text-center">
               {error}
             </div>
           )}
        </div>

        {/* Right Side: Conversation & Input */}
        <div className="lg:w-2/3 flex flex-col bg-slate-800/30 rounded-[2rem] border border-slate-700/50 relative overflow-hidden">
           
           {/* Chat Log */}
           <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {conversation.map((msg, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.speaker === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`max-w-[80%] rounded-2xl p-4 ${
                    msg.speaker === "user" 
                      ? "bg-indigo-600 text-white rounded-br-none" 
                      : "bg-slate-700 text-slate-100 rounded-bl-none"
                  }`}>
                    {msg.text}
                  </div>
                </motion.div>
              ))}

              {/* Live Transcript Preview */}
              {isRecording && transcript && (
                 <motion.div 
                   initial={{ opacity: 0 }}
                   animate={{ opacity: 1 }}
                   className="flex justify-end"
                 >
                   <div className="max-w-[80%] rounded-2xl p-4 bg-indigo-600/50 text-white/80 rounded-br-none italic border border-indigo-500/30">
                     {transcript} <span className="animate-pulse">...</span>
                   </div>
                 </motion.div>
              )}
              <div ref={messagesEndRef} />
           </div>

           {/* Input Area */}
           <div className="p-6 bg-slate-800 border-t border-slate-700">
              <div className="flex flex-col gap-3">
                 <div className="flex items-center justify-between text-sm text-slate-400 px-1">
                    <span>Your Answer</span>
                    {isRecording && <span className="text-rose-400 animate-pulse flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-rose-500"></span> Recording...</span>}
                 </div>
                 
                 <div className="flex gap-3 items-end">
                    <button
                       onClick={toggleRecording}
                       disabled={isLoading}
                       className={`p-4 rounded-2xl transition-all ${
                         isRecording 
                           ? "bg-rose-500 hover:bg-rose-600 text-white" 
                           : "bg-slate-700 hover:bg-slate-600 text-slate-300"
                       } disabled:opacity-50`}
                    >
                       {isRecording ? <StopCircle className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
                    </button>
                    
                    <textarea 
                      value={transcript}
                      onChange={handleManualTranscriptChange}
                      placeholder="Type your answer or use the microphone..."
                      className="flex-1 bg-slate-900 border border-slate-700 rounded-2xl p-4 text-white focus:outline-none focus:border-indigo-500 resize-none min-h-[56px] max-h-[120px]"
                      rows={2}
                      disabled={isRecording || isLoading}
                    />

                    <button
                       onClick={handleSubmitAnswer}
                       disabled={isLoading || (!transcript.trim())}
                       className="p-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[56px]"
                    >
                       {isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : <Send className="w-6 h-6" />}
                    </button>
                 </div>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
}