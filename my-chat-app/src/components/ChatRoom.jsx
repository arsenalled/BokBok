import { useEffect, useRef, useState } from "react";
import {
  collection,
  addDoc,
  query,
  orderBy,
  serverTimestamp,
  onSnapshot,
} from "firebase/firestore";
import { auth, db } from "../firebase";
import { signOut } from "firebase/auth";
import Message from "./Message";
import EmojiPicker from "emoji-picker-react";

export default function ChatRoom() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const dummy = useRef();

  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("createdAt"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const msgs = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(msgs);
      dummy.current?.scrollIntoView({ behavior: "smooth" });
    });
    return unsubscribe;
  }, []);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    await addDoc(collection(db, "messages"), {
      text: newMessage,
      uid: auth.currentUser.uid,
      photoURL: auth.currentUser.photoURL,
      createdAt: serverTimestamp(),
    });
    setNewMessage("");
    setShowEmoji(false);
  };

  return (
    <div className="flex flex-col w-full max-w-2xl h-full bg-black">
      {/* Header */}
      <div className="bg-pink-600 p-4 flex justify-between items-center">
        <h1 className="text-lg font-semibold">BOKBOK: Global Chatroom</h1>
        <button onClick={() => signOut(auth)} className="text-white hover:underline">Sign Out</button>
      </div>

      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((msg) => (
          <Message key={msg.id} message={msg} />
        ))}
        <div ref={dummy}></div>
      </div>

      {/* Input */}
      <form onSubmit={sendMessage} className="flex items-center gap-2 p-4 bg-black border-t border-gray-700">
        <button
          type="button"
          onClick={() => setShowEmoji(!showEmoji)}
          className="text-pink-400"
        >
          😊
        </button>
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 px-4 py-2 rounded-l-lg bg-white text-black focus:outline-none"
          placeholder="Type a message..."
        />
        <button
          type="submit"
          className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700"
        >
          Send
        </button>
      </form>

      {/* Emoji Picker */}
      {showEmoji && (
        <div className="absolute bottom-20 left-4 z-50">
          <EmojiPicker
            theme="dark"
            onEmojiClick={(e) => setNewMessage((prev) => prev + e.emoji)}
          />
        </div>
      )}
    </div>
  );
}
