// src/pages/Privacy.jsx

const Privacy = () => {
  return (
    <div className="max-w-3xl mx-auto p-8 bg-white dark:bg-gray-900 rounded-xl shadow-lg mt-10">
      <h1 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white">
        Privacy Policy
      </h1>
      <p className="mb-4 text-gray-700 dark:text-gray-300">
        Last updated: October 2025
      </p>

      <p className="mb-4 text-gray-700 dark:text-gray-300">
        At <strong>NoteWise</strong>, your privacy is our top priority. This
        policy explains what information we collect, how we use it, and your
        rights.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2 text-gray-800 dark:text-gray-200">
        Information We Collect
      </h2>
      <ul className="list-disc ml-6 mb-4 text-gray-700 dark:text-gray-300">
        <li>Google account info (name, email, avatar) for authentication.</li>
        <li>
          Your notes and associated metadata (tags, mood, public/private
          status).
        </li>
        <li>
          Interactions with our AI assistant for improving note suggestions.
        </li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-2 text-gray-800 dark:text-gray-200">
        How We Use Your Information
      </h2>
      <ul className="list-disc ml-6 mb-4 text-gray-700 dark:text-gray-300">
        <li>To provide personalized note creation and AI assistance.</li>
        <li>To enable sharing notes publicly if you choose to do so.</li>
        <li>To maintain and secure your account data.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-2 text-gray-800 dark:text-gray-200">
        Data Sharing
      </h2>
      <p className="mb-4 text-gray-700 dark:text-gray-300">
        We never sell your data. Public notes are visible to other users, but
        private notes remain confidential.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2 text-gray-800 dark:text-gray-200">
        Your Rights
      </h2>
      <p className="mb-4 text-gray-700 dark:text-gray-300">
        You can request deletion of your account and associated data anytime by
        contacting us at <strong>support@note-wise.com</strong>.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2 text-gray-800 dark:text-gray-200">
        Contact Us
      </h2>
      <p className="text-gray-700 dark:text-gray-300">
        Questions about this policy? Email{" "}
        <strong>support@note-wise.com</strong>.
      </p>
    </div>
  );
};

export default Privacy;
