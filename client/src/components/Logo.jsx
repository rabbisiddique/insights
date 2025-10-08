const Logo = () => {
  return (
    <>
      {" "}
      <div className="relative">
        {/* Glow effect */}
        <div className="absolute -inset-1 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl opacity-0 group-hover:opacity-30 blur-xl transition-all duration-500"></div>

        {/* Image container (made bigger) */}
        <div className="relative w-16 h-16 flex items-center justify-center">
          <img
            src="/note-wise-logo.png"
            alt="NoteWise Logo"
            className="w-full h-full object-contain relative z-10 drop-shadow-lg group-hover:scale-110 group-hover:drop-shadow-2xl transition-all duration-500"
          />
        </div>

        {/* Sparkle effects */}
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full opacity-0 group-hover:opacity-100 animate-ping"></span>
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full opacity-0 group-hover:opacity-100 shadow-lg shadow-yellow-400/50"></span>

        <span
          className="absolute -bottom-1 -left-1 w-2 h-2 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full opacity-0 group-hover:opacity-100 animate-ping"
          style={{ animationDelay: "150ms" }}
        ></span>
        <span className="absolute -bottom-1 -left-1 w-2 h-2 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 shadow-lg shadow-blue-400/50"></span>

        <span
          className="absolute top-1/2 -right-2 w-1.5 h-1.5 bg-purple-400 rounded-full opacity-0 group-hover:opacity-100 animate-pulse"
          style={{ animationDelay: "300ms" }}
        ></span>
      </div>
    </>
  );
};

export default Logo;
