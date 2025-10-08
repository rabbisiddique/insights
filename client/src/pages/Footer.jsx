const Footer = () => {
  return (
    <>
      <footer className="text-center text-gray-500 text-sm mt-10 pb-6">
        © {new Date().getFullYear()} NoteWise —
        <a href="/policy" className="text-blue-600 hover:underline mx-1">
          Privacy Policy
        </a>{" "}
        |
        <a href="/policy" className="text-blue-600 hover:underline mx-1">
          Terms of Service
        </a>
      </footer>
    </>
  );
};

export default Footer;
