import Login from "./components/Login";
import { auth } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import DarkModeToggle from "./components/DarkModeToggle";
import ChatRoom from "./components/ChatRoom";

export default function App() {
  const [user] = useAuthState(auth);
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-black text-white">
      {user ? <ChatRoom /> : <Login />}
      <DarkModeToggle />
    </div>
  );
}
