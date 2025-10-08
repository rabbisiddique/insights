import {
  AlertCircle,
  Check,
  FileText,
  Lock,
  Mail,
  Sparkles,
  Users,
} from "lucide-react";
const Terms = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-pink-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800 py-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="relative mb-12 text-center">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-red-500/10 blur-3xl"></div>
          <div className="relative inline-flex items-center justify-center w-20 h-20 mb-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl shadow-xl">
            <FileText className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-slate-900 via-purple-800 to-pink-900 dark:from-white dark:via-purple-300 dark:to-pink-300 bg-clip-text text-transparent">
            Terms of Service
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Simple, transparent terms for using NoteWise
          </p>
          <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-purple-100 dark:bg-purple-900/30 rounded-full text-sm text-purple-700 dark:text-purple-300">
            <Sparkles className="w-4 h-4" />
            Last updated: October 2025
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-slate-200/50 dark:border-slate-700/50 overflow-hidden">
          {/* Introduction */}
          <div className="p-8 md:p-12 border-b border-slate-200/50 dark:border-slate-700/50 bg-gradient-to-br from-purple-50/50 to-pink-50/50 dark:from-purple-900/10 dark:to-pink-900/10">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-3 text-slate-900 dark:text-white">
                  Welcome to NoteWise!
                </h2>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  By using our app, you agree to these Terms of Service. Please
                  read them carefully.
                </p>
              </div>
            </div>
          </div>

          {/* Account Responsibilities */}
          <div className="p-8 md:p-12 border-b border-slate-200/50 dark:border-slate-700/50">
            <h2 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                <Users className="w-5 h-5 text-white" />
              </div>
              Account Responsibilities
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                {
                  title: "Keep it Secure",
                  desc: "Keep your account credentials secure",
                  icon: Lock,
                },
                {
                  title: "Personal Use",
                  desc: "Do not share accounts with others",
                  icon: AlertCircle,
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl hover:shadow-lg transition-all duration-300 border border-slate-200/50 dark:border-slate-700/50"
                >
                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white mb-1">
                      {item.title}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Content & Notes */}
          <div className="p-8 md:p-12 border-b border-slate-200/50 dark:border-slate-700/50 bg-gradient-to-br from-slate-50/50 to-purple-50/50 dark:from-slate-800/50 dark:to-purple-900/10">
            <h2 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              Content & Notes
            </h2>
            <div className="space-y-4">
              {[
                {
                  text: "Public notes are visible to all users",
                  color: "blue",
                },
                {
                  text: "Private notes are confidential and cannot be accessed by others",
                  color: "purple",
                },
                {
                  text: "You are responsible for the content you create",
                  color: "pink",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 group hover:translate-x-2 transition-transform duration-300"
                >
                  <div
                    className={`flex-shrink-0 w-6 h-6 bg-gradient-to-br from-${item.color}-500 to-${item.color}-600 rounded-full flex items-center justify-center`}
                  >
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <p className="text-slate-700 dark:text-slate-300">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* AI Assistance */}
          <div className="p-8 md:p-12 border-b border-slate-200/50 dark:border-slate-700/50">
            <div className="flex items-start gap-4 mb-4">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
                  AI Assistance
                </h2>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  Our AI assistant helps create, summarize, and improve notes.
                  Results are suggestions and may not always be perfect.
                </p>
              </div>
            </div>
          </div>

          {/* Limitations */}
          <div className="p-8 md:p-12 border-b border-slate-200/50 dark:border-slate-700/50 bg-gradient-to-br from-orange-50/50 to-red-50/50 dark:from-orange-900/10 dark:to-red-900/10">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
                  Limitations
                </h2>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  NoteWise is provided "as-is". We do not guarantee
                  uninterrupted access or complete accuracy of AI suggestions.
                </p>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="p-8 md:p-12 bg-gradient-to-br from-purple-500 to-pink-500">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4 text-white">
                <div className="w-14 h-14 bg-white/20 backdrop-blur-xl rounded-xl flex items-center justify-center">
                  <Mail className="w-7 h-7" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-1">Need Help?</h2>
                  <p className="text-purple-100">Get in touch with us</p>
                </div>
              </div>
              <a
                href="mailto:support@note-wise.com"
                className="px-8 py-4 bg-white text-purple-600 font-bold rounded-xl hover:bg-purple-50 hover:scale-105 transition-all duration-300 shadow-xl"
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

export default Terms;
