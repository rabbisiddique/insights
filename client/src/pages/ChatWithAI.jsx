import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, MessageCircle, Plus, Send, Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NoteMakerModal from "../components/NoteMakerModal";
import {
  useAiNoteMakerMutation,
  useGetAiMessagesQuery,
} from "../features/ai/aiAPI";
import { useGetNoteQuery } from "../features/notes/notesAPI";
import { useAuth } from "../hooks/useAuth";

const ChatWithAI = () => {
  const { noteId } = useParams();
  const navigate = useNavigate();

  // Chat state
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [noteInfo, setNoteInfo] = useState(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Note maker state
  const [showNoteMaker, setShowNoteMaker] = useState(false);

  const isNoteChat = !!noteId;
  const isGeneralChat = !noteId;

  const {
    data: aiMessagesData,
    isLoading: messagesLoading,
    refetch: refetchMessages,
  } = useGetAiMessagesQuery(noteId || "general");

  const { user } = useAuth(true);
  const { data: noteData } = useGetNoteQuery(noteId, {
    skip: !noteId,
  });

  const [aiNoteMaker, { isLoading: aiLoading }] = useAiNoteMakerMutation();

  useEffect(() => {
    if (isNoteChat && noteData?.getNote) {
      setNoteInfo(noteData.getNote);
    }
  }, [isNoteChat, noteData]);

  useEffect(() => {
    if (!isNoteChat) {
      setMessages([
        {
          id: "welcome",
          type: "bot",
          content: `Hello ${user?.username}! I'm your AI assistant. How can I help you today?`,
          timestamp: new Date(),
        },
      ]);
      setNoteInfo(null);
      return;
    }
    refetchMessages();
  }, [isNoteChat, noteId, user?.username, refetchMessages]);

  useEffect(() => {
    if (!aiMessagesData || messagesLoading) return;

    const welcomeMessage = {
      id: "welcome",
      type: "bot",
      content: `Hi ${user?.username}! I'm here to help you discuss your note. What would you like to know?`,
      timestamp: new Date(),
    };

    let historyMessages = [welcomeMessage];

    if (aiMessagesData.messages?.length > 0) {
      historyMessages = [
        welcomeMessage,
        ...aiMessagesData.messages.flatMap((msg) => [
          {
            id: `user-${msg._id}`,
            type: "user",
            content: msg.question,
            timestamp: new Date(msg.createdAt),
          },
          {
            id: `bot-${msg._id}`,
            type: "bot",
            content: msg.answer,
            timestamp: new Date(msg.createdAt),
          },
        ]),
      ];
    }

    setMessages(historyMessages);

    if (
      aiMessagesData.note &&
      (aiMessagesData.note.title ||
        aiMessagesData.note.content ||
        aiMessagesData.note.summary)
    ) {
      setNoteInfo(aiMessagesData.note);
    } else if (noteData?.getNote) {
      setNoteInfo(noteData.getNote);
    }
  }, [aiMessagesData, messagesLoading, noteData, user?.username]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (!isTyping && !aiLoading) {
      inputRef.current?.focus();
    }
  }, [isTyping, aiLoading]);

  const handleSend = async () => {
    if (inputValue.trim() && !aiLoading) {
      const userMessage = {
        id: `user-${Date.now()}`,
        type: "user",
        content: inputValue,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMessage]);
      const currentQuestion = inputValue;
      setInputValue("");

      // Show typing indicator immediately
      setIsTyping(true);

      // Force scroll to bottom
      setTimeout(() => scrollToBottom(), 100);

      try {
        let payload;

        if (isNoteChat) {
          payload = {
            noteId: noteId,
            question: currentQuestion,
          };
        } else {
          const conversationMessages = messages
            .filter((msg) => msg.id !== "welcome")
            .map((msg) => ({
              role: msg.type === "user" ? "user" : "assistant",
              content: msg.content,
            }));

          conversationMessages.push({
            role: "user",
            content: currentQuestion,
          });

          payload = {
            messages: conversationMessages,
          };
        }

        const response = await aiNoteMaker(payload).unwrap();
        setIsTyping(false);

        if (response.type === "qa" && response.answer) {
          const aiResponse = {
            id: `bot-${Date.now()}`,
            type: "bot",
            content: response.answer,
            timestamp: new Date(),
          };
          setMessages((prev) => [...prev, aiResponse]);
        } else if (response.type === "chat" && response.response) {
          const aiResponse = {
            id: `bot-${Date.now()}`,
            type: "bot",
            content: response.response,
            timestamp: new Date(),
          };
          setMessages((prev) => [...prev, aiResponse]);
        }
      } catch (error) {
        setIsTyping(false);
        const errorMessage = {
          id: `error-${Date.now()}`,
          type: "bot",
          content:
            "Sorry, I encountered an error processing your question. Please try again.",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, errorMessage]);
        console.error("AI interaction error:", error);
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (isNoteChat && messagesLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-950 dark:via-indigo-950 dark:to-purple-950 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="relative w-16 h-16 mx-auto mb-6">
            <div className="absolute inset-0 border-4 border-purple-200 dark:border-purple-800 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p className="text-lg font-medium bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Loading chat...
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-950 dark:via-indigo-950 dark:to-purple-950">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [90, 0, 90],
          }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-indigo-400/20 rounded-full blur-3xl"
        />
      </div>

      <div
        className="max-w-6xl mx-auto flex flex-col p-4 sm:p-6 pt-20 sm:pt-24 pb-6 sm:pb-8 relative z-10"
        style={{ height: "calc(100vh - 80px)" }}
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-4 sm:mb-6 flex-wrap gap-3"
        >
          <div className="flex items-center gap-2 sm:gap-4">
            <motion.button
              whileHover={{ scale: 1.05, x: -2 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm text-gray-700 dark:text-gray-300 rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl border border-white/20 dark:border-gray-800/50 transition-all text-sm"
              onClick={() => navigate("/home")}
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden xs:inline font-medium">Back</span>
            </motion.button>

            <div className="flex items-center gap-2 sm:gap-3">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg"
              >
                <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </motion.div>
              <div>
                <h1 className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent">
                  {isNoteChat ? "Note Chat" : "AI Assistant"}
                </h1>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-medium truncate max-w-[150px] sm:max-w-none">
                  {isNoteChat ? noteInfo?.title || "Your Note" : "General Chat"}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {isGeneralChat && !showNoteMaker && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowNoteMaker(true)}
                className="flex items-center gap-1 sm:gap-2 px-3 sm:px-5 py-2 sm:py-2.5 bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 text-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl font-medium text-sm"
              >
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">Quick Create</span>
                <span className="sm:hidden">Create</span>
              </motion.button>
            )}
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2 bg-green-500/10 dark:bg-green-500/20 rounded-full border border-green-500/20"
            >
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full" />
              <span className="text-xs sm:text-sm font-medium text-green-600 dark:text-green-400 hidden xs:inline">
                Online
              </span>
            </motion.div>
          </div>
        </motion.div>

        {/* Note Preview */}
        {isNoteChat && noteInfo && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-white/20 dark:border-gray-800/50 p-4 sm:p-6 mb-4 sm:mb-6 shadow-xl"
          >
            <h2 className="text-base sm:text-xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-3 flex items-center gap-2">
              <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 text-purple-500" />
              <span className="truncate">{noteInfo.title}</span>
            </h2>
            {noteInfo.summary || noteInfo.content || noteInfo.body ? (
              <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4 line-clamp-2 sm:line-clamp-3">
                {noteInfo.summary || noteInfo.content || noteInfo.body}
              </p>
            ) : (
              <p className="italic text-gray-400 text-sm">
                No content available
              </p>
            )}

            {noteInfo.tags && noteInfo.tags.length > 0 && (
              <div className="flex gap-1.5 sm:gap-2 flex-wrap">
                {noteInfo.tags.map((tag, index) => (
                  <motion.span
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    className="px-2 sm:px-3 py-1 sm:py-1.5 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/40 dark:to-pink-900/40 text-purple-700 dark:text-purple-300 text-xs font-medium rounded-full border border-purple-200 dark:border-purple-800"
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {/* Note Maker Modal */}
        <NoteMakerModal
          showNoteMaker={showNoteMaker}
          aiNoteMaker={aiNoteMaker}
          aiLoading={aiLoading}
          setShowNoteMaker={setShowNoteMaker}
        />

        {/* Chat Container */}
        <div className="flex-1 bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-white/20 dark:border-gray-800/50 flex flex-col overflow-hidden shadow-2xl min-h-0">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 sm:p-6 space-y-4 sm:space-y-6 scrollbar-thin scrollbar-thumb-purple-500 scrollbar-track-transparent">
            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`flex ${
                    message.type === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`flex items-start gap-2 sm:gap-3 max-w-[85%] sm:max-w-[80%] ${
                      message.type === "user" ? "flex-row-reverse" : ""
                    }`}
                  >
                    {/* Avatar */}
                    <div className="relative flex-shrink-0">
                      {message.type === "bot" ? (
                        <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl bg-gradient-to-br from-purple-500 via-pink-500 to-indigo-500 flex items-center justify-center shadow-lg ring-2 sm:ring-4 ring-purple-100 dark:ring-purple-900/50">
                          <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                        </div>
                      ) : (
                        <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl overflow-hidden ring-2 sm:ring-4 ring-blue-100 dark:ring-blue-900/50 shadow-lg">
                          <img
                            className="w-full h-full object-cover"
                            onClick={() => navigate("/profile")}
                            src={
                              user?.avatar ||
                              `https://ui-avatars.com/api/?name=${user?.username}&background=gradient&color=fff&bold=true`
                            }
                            alt="User"
                            onError={(e) => {
                              e.target.src = `https://ui-avatars.com/api/?name=${
                                user?.username || "User"
                              }&background=3b82f6&color=fff&bold=true`;
                            }}
                          />
                        </div>
                      )}
                    </div>

                    {/* Message Bubble */}
                    <div
                      className={`px-3 py-2.5 sm:px-5 sm:py-3.5 rounded-2xl sm:rounded-3xl text-xs sm:text-sm leading-relaxed whitespace-pre-wrap shadow-lg ${
                        message.type === "bot"
                          ? "bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-800 dark:text-gray-200 border border-purple-100 dark:border-purple-900/50"
                          : "bg-gradient-to-br from-blue-500 to-indigo-600 text-white"
                      } ${
                        message.type === "user"
                          ? "rounded-tr-md"
                          : "rounded-tl-md"
                      }`}
                    >
                      {message.content}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Typing Indicator with Enhanced Animation */}
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex justify-start"
              >
                <div className="flex items-start gap-2 sm:gap-3">
                  <motion.div
                    animate={{
                      rotate: [0, 360],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      rotate: { duration: 2, repeat: Infinity, ease: "linear" },
                      scale: {
                        duration: 1,
                        repeat: Infinity,
                        ease: "easeInOut",
                      },
                    }}
                    className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl bg-gradient-to-br from-purple-500 via-pink-500 to-indigo-500 flex items-center justify-center shadow-lg"
                  >
                    <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </motion.div>
                  <div className="px-4 py-3 sm:px-6 sm:py-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl rounded-tl-md border border-purple-100 dark:border-purple-900/50 shadow-lg">
                    <div className="flex gap-1.5">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                          animate={{
                            scale: [1, 1.5, 1],
                            opacity: [0.4, 1, 0.4],
                            y: [0, -5, 0],
                          }}
                          transition={{
                            duration: 0.8,
                            repeat: Infinity,
                            delay: i * 0.15,
                            ease: "easeInOut",
                          }}
                        />
                      ))}
                    </div>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="text-xs text-gray-500 dark:text-gray-400 mt-2 font-medium"
                    >
                      AI is thinking...
                    </motion.p>
                  </div>
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-white/20 dark:border-gray-800/50 p-3 sm:p-5 bg-gradient-to-r from-purple-50/50 to-pink-50/50 dark:from-gray-900/50 dark:to-indigo-950/50 backdrop-blur-sm">
            <div className="flex gap-2 sm:gap-3">
              <input
                type="text"
                placeholder={
                  isNoteChat ? "Ask about your note..." : "Ask me anything..."
                }
                className="flex-1 px-4 sm:px-6 py-3 sm:py-4 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-2 border-gray-200 dark:border-gray-700 rounded-2xl sm:rounded-3xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all text-xs sm:text-sm text-gray-800 dark:text-gray-200 placeholder-gray-400 shadow-sm"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={aiLoading}
                ref={inputRef}
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSend}
                disabled={!inputValue.trim() || aiLoading}
                className={`px-4 sm:px-7 py-3 sm:py-4 rounded-2xl sm:rounded-3xl font-semibold text-xs sm:text-sm transition-all flex items-center gap-1.5 sm:gap-2 shadow-lg relative overflow-hidden ${
                  inputValue.trim() && !aiLoading
                    ? "bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 text-white hover:shadow-xl"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed"
                }`}
              >
                {aiLoading && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    animate={{ x: ["-100%", "200%"] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                )}
                {aiLoading ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-white border-t-transparent rounded-full"
                    />
                    <span className="hidden sm:inline">Sending...</span>
                  </>
                ) : (
                  <>
                    <span className="hidden sm:inline">Send</span>
                    <Send className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </>
                )}
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatWithAI;
