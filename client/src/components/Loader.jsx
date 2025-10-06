export default function Loader({ text, color }) {
  return (
    <>
      <span
        className={`w-4 h-4 border-2  ${
          color ? color : "border-white"
        } border-t-transparent rounded-full animate-spin`}
      ></span>
      <span>{text}</span>
    </>
  );
}
