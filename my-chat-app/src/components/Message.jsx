import { auth } from "../firebase";

export default function Message({ message }) {
  const isUser = message.uid === auth.currentUser.uid;

  return (
    <div
      className={`flex items-end ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`max-w-[70%] px-4 py-2 rounded-2xl text-white ${
          isUser
            ? "bg-pink-600 rounded-br-none"
            : "bg-gray-700 rounded-bl-none"
        }`}
      >
        <p>{message.text}</p>
      </div>
    </div>
  );
}
