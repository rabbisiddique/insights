import {
  AlertCircle,
  Check,
  Eye,
  FileText,
  Lock,
  Mail,
  Shield,
  Sparkles,
  Users,
} from "lucide-react";
const Privacy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800 py-20 px-4 mt-12">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="relative mb-12 text-center">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 blur-3xl"></div>
          <div className="relative inline-flex items-center justify-center w-20 h-20 mb-6 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl shadow-xl">
            <Shield className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-slate-900 via-blue-800 to-purple-900 dark:from-white dark:via-blue-300 dark:to-purple-300 bg-clip-text text-transparent">
            Privacy Policy
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Your trust matters to us. Here's how we protect your data.
          </p>
          <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full text-sm text-blue-700 dark:text-blue-300">
            <Sparkles className="w-4 h-4" />
            Last updated: October 2025
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-slate-200/50 dark:border-slate-700/50 overflow-hidden">
          {/* Introduction */}
          <div className="p-8 md:p-12 border-b border-slate-200/50 dark:border-slate-700/50 bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-blue-900/10 dark:to-purple-900/10">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                <Eye className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-3 text-slate-900 dark:text-white">
                  Our Commitment to You
                </h2>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  At{" "}
                  <span className="font-semibold text-blue-600 dark:text-blue-400">
                    NoteWise
                  </span>
                  , your privacy is our top priority. This policy explains what
                  information we collect, how we use it, and your rights.
                </p>
              </div>
            </div>
          </div>

          {/* Information We Collect */}
          <div className="p-8 md:p-12 border-b border-slate-200/50 dark:border-slate-700/50">
            <div className="flex items-start gap-4 mb-6">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center">
                <Lock className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                  Information We Collect
                </h2>
              </div>
            </div>
            <div className="space-y-4 ml-16">
              {[
                {
                  icon: Users,
                  text: "Google account info (name, email, avatar) for authentication",
                  color: "blue",
                },
                {
                  icon: FileText,
                  text: "Your notes and associated metadata (tags, mood, public/private status)",
                  color: "purple",
                },
                {
                  icon: Sparkles,
                  text: "Interactions with our AI assistant for improving note suggestions",
                  color: "pink",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 group hover:translate-x-2 transition-transform duration-300"
                >
                  <div
                    className={`flex-shrink-0 w-8 h-8 bg-${item.color}-100 dark:bg-${item.color}-900/30 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                  >
                    <item.icon
                      className={`w-4 h-4 text-${item.color}-600 dark:text-${item.color}-400`}
                    />
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 pt-1">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* How We Use Your Information */}
          <div className="p-8 md:p-12 border-b border-slate-200/50 dark:border-slate-700/50 bg-gradient-to-br from-slate-50/50 to-blue-50/50 dark:from-slate-800/50 dark:to-blue-900/10">
            <div className="flex items-start gap-4 mb-6">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                <Check className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                  How We Use Your Information
                </h2>
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-4 ml-0 md:ml-16">
              {[
                {
                  title: "Personalization",
                  desc: "To provide personalized note creation and AI assistance",
                  gradient: "from-blue-500 to-cyan-500",
                },
                {
                  title: "Sharing",
                  desc: "To enable sharing notes publicly if you choose to do so",
                  gradient: "from-purple-500 to-pink-500",
                },
                {
                  title: "Security",
                  desc: "To maintain and secure your account data",
                  gradient: "from-green-500 to-emerald-500",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 border border-slate-200/50 dark:border-slate-700/50"
                >
                  <div
                    className={`w-10 h-10 bg-gradient-to-br ${item.gradient} rounded-xl mb-4 flex items-center justify-center`}
                  >
                    <Check className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-bold text-slate-900 dark:text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Data Sharing */}
          <div className="p-8 md:p-12 border-b border-slate-200/50 dark:border-slate-700/50">
            <div className="flex items-start gap-4 mb-4">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-red-500 to-pink-500 rounded-xl flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
                  Data Sharing
                </h2>
                <div className="bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 border-l-4 border-red-500 rounded-r-xl p-4">
                  <p className="text-slate-700 dark:text-slate-300 font-semibold">
                    We never sell your data. Public notes are visible to other
                    users, but private notes remain confidential.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Your Rights */}
          <div className="p-8 md:p-12 border-b border-slate-200/50 dark:border-slate-700/50 bg-gradient-to-br from-purple-50/50 to-pink-50/50 dark:from-purple-900/10 dark:to-pink-900/10">
            <div className="flex items-start gap-4 mb-4">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
                  Your Rights
                </h2>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  You can request deletion of your account and associated data
                  anytime by contacting us at{" "}
                  <a
                    href="mailto:support@note-wise.com"
                    className="font-semibold text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    support@note-wise.com
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="p-8 md:p-12 bg-gradient-to-br from-blue-500 to-purple-500">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4 text-white">
                <div className="w-14 h-14 bg-white/20 backdrop-blur-xl rounded-xl flex items-center justify-center">
                  <Mail className="w-7 h-7" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-1">Questions?</h2>
                  <p className="text-blue-100">We're here to help</p>
                </div>
              </div>
              <a
                href="mailto:support@note-wise.com"
                className="px-8 py-4 bg-white text-blue-600 font-bold rounded-xl hover:bg-blue-50 hover:scale-105 transition-all duration-300 shadow-xl"
              >
                Contact Support
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
