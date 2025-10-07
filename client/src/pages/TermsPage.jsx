const Terms = () => {
  return (
    <div className="max-w-3xl mx-auto p-8 bg-white dark:bg-gray-900 rounded-xl shadow-lg mt-10">
      <h1 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white">
        Terms of Service
      </h1>
      <p className="mb-4 text-gray-700 dark:text-gray-300">
        Last updated: October 2025
      </p>

      <p className="mb-4 text-gray-700 dark:text-gray-300">
        Welcome to <strong>NoteWise</strong>! By using our app, you agree to
        these Terms of Service. Please read them carefully.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2 text-gray-800 dark:text-gray-200">
        Account Responsibilities
      </h2>
      <ul className="list-disc ml-6 mb-4 text-gray-700 dark:text-gray-300">
        <li>Keep your account credentials secure.</li>
        <li>Do not share accounts with others.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-2 text-gray-800 dark:text-gray-200">
        Content & Notes
      </h2>
      <ul className="list-disc ml-6 mb-4 text-gray-700 dark:text-gray-300">
        <li>Public notes are visible to all users.</li>
        <li>
          Private notes are confidential and cannot be accessed by others.
        </li>
        <li>You are responsible for the content you create.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-2 text-gray-800 dark:text-gray-200">
        AI Assistance
      </h2>
      <p className="mb-4 text-gray-700 dark:text-gray-300">
        Our AI assistant helps create, summarize, and improve notes. Results are
        suggestions and may not always be perfect.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2 text-gray-800 dark:text-gray-200">
        Limitations
      </h2>
      <p className="mb-4 text-gray-700 dark:text-gray-300">
        NoteWise is provided "as-is". We do not guarantee uninterrupted access
        or complete accuracy of AI suggestions.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2 text-gray-800 dark:text-gray-200">
        Contact
      </h2>
      <p className="text-gray-700 dark:text-gray-300">
        Questions about these terms? Email{" "}
        <strong>support@note-wise.com</strong>.
      </p>
    </div>
  );
};

export default Terms;
