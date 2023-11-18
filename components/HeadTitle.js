export default function HeadTitle({ children }) {
  return (
    <div className="w-full flex justify-center">
      <h1
        className="flex justify-center text-3xl
 font-bold border-b border-gray-500 py-3 px-8 text-gray-700"
      >
        {children}
      </h1>
    </div>
  );
}
