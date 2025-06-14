import { auth, provider } from '../firebase'
import { signInWithPopup } from 'firebase/auth'

export default function Login() {
  const signIn = () => {
    signInWithPopup(auth, provider).catch(alert)
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <button
        onClick={signIn}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Sign in with Google
      </button>
    </div>
  )
}
