import { motion } from "framer-motion";
import {
  ArrowRight,
  Brain,
  Edit3,
  FileText,
  Globe,
  Heart,
  Share2,
  Shield,
  Sparkles,
  Star,
  TrendingUp,
  Zap,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const NotesDashboard = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const cardVariants = {
    hidden: { scale: 0.9, opacity: 0, y: 30 },
    visible: {
      scale: 1,
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
    hover: {
      scale: 1.03,
      y: -5,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  const features = [
    {
      icon: FileText,
      title: "Smart Organization",
      description:
        "AI-powered tagging and categorization keeps your notes perfectly organized",
      gradient: "from-blue-600 via-blue-500 to-cyan-500",
      bgGradient: "from-blue-500/5 via-blue-400/10 to-cyan-400/5",
      borderGradient: "from-blue-500/20 to-cyan-500/20",
    },
    {
      icon: Brain,
      title: "AI Writing Assistant",
      description:
        "Advanced GPT integration for summarization, grammar checking, and content enhancement",
      gradient: "from-purple-600 via-violet-500 to-fuchsia-500",
      bgGradient: "from-purple-500/5 via-violet-400/10 to-fuchsia-400/5",
      borderGradient: "from-purple-500/20 to-fuchsia-500/20",
    },
    {
      icon: Share2,
      title: "Team Collaboration",
      description:
        "Real-time editing, comments, and sharing with advanced permission controls",
      gradient: "from-emerald-600 via-green-500 to-teal-500",
      bgGradient: "from-emerald-500/5 via-green-400/10 to-teal-400/5",
      borderGradient: "from-emerald-500/20 to-teal-500/20",
    },
    {
      icon: Heart,
      title: "Mood Analytics",
      description:
        "Track emotional patterns in your writing with detailed insights and trends",
      gradient: "from-pink-600 via-rose-500 to-orange-500",
      bgGradient: "from-pink-500/5 via-rose-400/10 to-orange-400/5",
      borderGradient: "from-pink-500/20 to-orange-500/20",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-emerald-400/10 to-cyan-400/10 rounded-full blur-3xl"
        />
      </div>

      {/* Header */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 p-6 bg-white/80 backdrop-blur-xl border-b border-gray-200/50"
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <motion.div
            className="flex items-center space-x-4"
            whileHover={{ scale: 1.02 }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-75"></div>
              <div className="relative p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl">
                <Edit3 className="w-7 h-7 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-3xl font-black bg-gradient-to-r from-blue-700 via-purple-600 to-indigo-700 bg-clip-text text-transparent">
                NotesAI
              </h1>
              <p className="text-sm text-gray-500 font-medium">
                Professional Edition
              </p>
            </div>
          </motion.div>

          <div className="flex items-center space-x-4">
            <motion.div
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-emerald-500/10 to-green-500/10 rounded-full border border-emerald-500/20"
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-semibold text-emerald-700">
                Live
              </span>
            </motion.div>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative max-w-7xl mx-auto px-6 py-20 text-center"
      >
        <motion.div variants={itemVariants} className="mb-12">
          <motion.div
            className="inline-flex items-center space-x-3 px-6 py-3 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-indigo-600/10 rounded-2xl border border-blue-500/20 mb-8"
            whileHover={{ scale: 1.05 }}
            animate={{
              boxShadow: [
                "0 0 20px rgba(59, 130, 246, 0.1)",
                "0 0 30px rgba(59, 130, 246, 0.2)",
                "0 0 20px rgba(59, 130, 246, 0.1)",
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Sparkles className="w-5 h-5 text-blue-600" />
            <span className="text-base font-bold bg-gradient-to-r from-blue-700 to-purple-700 bg-clip-text text-transparent">
              Powered by Advanced AI • Trusted by 50,000+ Professionals
            </span>
            <Zap className="w-5 h-5 text-purple-600" />
          </motion.div>

          <motion.h2
            className="text-7xl font-black mb-8 leading-tight"
            variants={itemVariants}
          >
            <span className="bg-gradient-to-r from-gray-900 via-blue-800 to-gray-900 bg-clip-text text-transparent">
              Transform Ideas Into
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Intelligent Notes
            </span>
          </motion.h2>

          <motion.p
            className="text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-12"
            variants={itemVariants}
          >
            The world's most advanced note-taking platform. Create, collaborate,
            and enhance your writing with AI that understands your thoughts.
          </motion.p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-6 justify-center mb-16"
        >
          <Link to={"/login"}>
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)",
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsLoggedIn(!isLoggedIn)}
              className="group cursor-pointer relative px-12 py-5 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white rounded-2xl font-bold text-xl shadow-2xl overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-700 via-purple-700 to-indigo-700 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
              <span className="relative flex items-center justify-center space-x-3 cursor-pointer">
                <Zap className="w-6 h-6" />
                <span>Start Now</span>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </span>
            </motion.button>
          </Link>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="px-12 py-5 bg-white/80 backdrop-blur-xl border-2 border-gray-300 hover:border-blue-400 text-gray-700 hover:text-blue-700 rounded-2xl font-bold text-xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <span className="flex items-center justify-center space-x-3">
              <Globe className="w-6 h-6" />
              <span>View Demo</span>
            </span>
          </motion.button>
        </motion.div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative max-w-7xl mx-auto px-6 pb-20"
      >
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h3 className="text-5xl font-black mb-6">
            <span className="text-gray-900">Enterprise-Grade Features</span>
            <br />
            <span className="text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text">
              Built for Professionals
            </span>
          </h3>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Every feature is designed to maximize productivity and streamline
            your workflow
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover="hover"
                className={`group relative p-8 rounded-3xl backdrop-blur-xl border border-white/50 shadow-xl hover:shadow-2xl transition-all duration-500 bg-gradient-to-br ${feature.bgGradient} hover:bg-white/60`}
              >
                {/* Gradient Border Effect */}
                <div
                  className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${feature.borderGradient} p-px opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                >
                  <div className="w-full h-full bg-white rounded-3xl"></div>
                </div>

                {/* Glow Effect */}
                <motion.div
                  className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${feature.gradient} opacity-0 blur-2xl transition-opacity duration-500`}
                  whileHover={{ opacity: 0.1 }}
                />

                <div className="relative z-10">
                  <motion.div
                    className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${feature.gradient} mb-6 shadow-lg`}
                    whileHover={{ rotate: 5, scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <IconComponent className="w-8 h-8 text-white" />
                  </motion.div>

                  <h4 className="text-2xl font-black mb-4 text-gray-900 group-hover:text-blue-700 transition-colors">
                    {feature.title}
                  </h4>

                  <p className="text-gray-600 leading-relaxed mb-4 group-hover:text-gray-700">
                    {feature.description}
                  </p>

                  <div
                    className={`inline-flex items-center space-x-2 px-3 py-1 bg-gradient-to-r ${feature.gradient} bg-opacity-10 rounded-full`}
                  >
                    <TrendingUp className="w-4 h-4 text-gray-600" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.section>

      {/* Bottom CTA */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="relative py-24 bg-gradient-to-r from-blue-900 via-purple-900 to-indigo-900 overflow-hidden"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(120,119,198,0.3),transparent_50%),radial-gradient(circle_at_80%_80%,rgba(255,255,255,0.15),transparent_50%)]"></div>

        <div className="relative max-w-6xl mx-auto text-center px-6">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="p-12 rounded-4xl bg-white/10 backdrop-blur-2xl border border-white/20 shadow-2xl"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="w-20 h-20 mx-auto mb-8 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center"
            >
              <Sparkles className="w-10 h-10 text-white" />
            </motion.div>

            <h3 className="text-4xl font-black mb-6 text-white">
              Ready to Revolutionize Your Workflow?
            </h3>
            <p className="text-xl text-blue-100 mb-10 max-w-3xl mx-auto leading-relaxed">
              Join the world's most innovative teams and transform how you
              capture, organize, and share knowledge. Start your free trial
              today.
            </p>

            <Link
              Link
              to={"/login"}
              className="flex flex-col sm:flex-row gap-6 justify-center "
            >
              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 25px 50px rgba(255, 255, 255, 0.2)",
                }}
                whileTap={{ scale: 0.95 }}
                className="px-12 py-5 cursor-pointer bg-white text-blue-900 rounded-2xl font-black text-xl shadow-2xl hover:shadow-white/20 transition-all duration-300"
              >
                <span className="flex items-center justify-center space-x-3">
                  <Shield className="w-6 h-6" />
                  <span>Start Now</span>
                  <ArrowRight className="w-6 h-6" />
                </span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="px-12 py-5 border-2 border-white/30 text-white hover:bg-white/10 rounded-2xl font-bold text-xl backdrop-blur-xl transition-all duration-300"
              >
                Schedule Demo
              </motion.button>
            </Link>

            <div className="flex justify-center items-center space-x-8 mt-10 text-white/70">
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5" />
                <span>Enterprise Security</span>
              </div>
              <div className="flex items-center space-x-2">
                <Zap className="w-5 h-5" />
                <span>24/7 Support</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5" />
                <span>No Setup Fee</span>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default NotesDashboard;
