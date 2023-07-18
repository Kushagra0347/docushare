import { useState } from 'react'
import LoginForm from '../components/Forms/LoginForm'
import SignUpForm from '../components/Forms/SignUpForm'

function AuthenticationScreen({ className }) {
  const [state, setState] = useState('login')

  function handleStateChange(event) {
    const name = event.target.name

    if (name === 'loginBtn' && state !== 'login') {
      setState('login')
    } else if (name === 'signupBtn' && state !== 'signup') {
      setState('signup')
    }
  }

  return (
    <div
      className={`${className} min-h-screen bg-primary bg-opacity-25 flex items-center justify-center`}
    >
      <div className="h-fit w-1/3 py-5 px-10 bg-quaternary rounded-3xl">
        <div className="flex items-center justify-center mt-4">
          <button
            className={`${
              state === 'login' ? 'font-bold' : 'font-normal text-slate-400'
            } text-4xl`}
            name="loginBtn"
            onClick={handleStateChange}
          >
            Login
          </button>
          <span className="text-4xl text-slate-500"> / </span>
          <button
            className={`${
              state === 'signup' ? 'font-bold' : 'font-normal text-slate-400'
            } text-4xl`}
            name="signupBtn"
            onClick={handleStateChange}
          >
            Signup
          </button>
        </div>
        <div className="flex items-center justify-center">
          {state === 'login' ? <LoginForm /> : <SignUpForm />}
        </div>
      </div>
    </div>
  )
}

export default AuthenticationScreen
