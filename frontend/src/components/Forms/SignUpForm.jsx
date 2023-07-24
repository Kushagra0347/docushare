import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Input, Ripple, initTE } from 'tw-elements'
import { register } from '../../redux/actions/userActions'
import Message from '../Message'
import Loader from '../Icons/Loader'

function SignupForm() {
  const [fName, setFName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  const user = useSelector((state) => state.userRegister)

  const { error, loading } = user

  function handleSubmit(event) {
    event.preventDefault()
    dispatch(register(fName, email, password))
  }

  useEffect(() => {
    initTE({ Input, Ripple })
  }, [])

  return (
    <form className="w-full px-8 py-5" onSubmit={handleSubmit}>
      {error && <Message className="mb-5" message={error} variant={'error'} />}

      <div className="relative" data-te-input-wrapper-init>
        <input
          type="text"
          className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
          value={fName}
          onChange={(e) => setFName(e.target.value)}
          id="formControlInputFName"
        />
        <label
          htmlFor="formControlInputFName"
          className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
        >
          First Name
        </label>
      </div>

      <div className="relative mt-5" data-te-input-wrapper-init>
        <input
          type="email"
          className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          id="formControlInputEmail"
        />
        <label
          htmlFor="formControlInputEmail"
          className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
        >
          Email
        </label>
      </div>

      <div className="relative mt-5" data-te-input-wrapper-init>
        <input
          type="password"
          className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          id="formControlInputPassword"
        />
        <label
          htmlFor="formControlInputPassword"
          className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
        >
          Password
        </label>
      </div>

      <button
        type="submit"
        data-te-ripple-init
        data-te-ripple-color="light"
        data-te-ripple-duration="1000ms"
        className="hover:bg-primary-600 focus:bg-primary-600 active:bg-primary-700 mt-6 flex items-center justify-center rounded bg-primary px-6 pb-2 pt-2.5 text-base font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition-all duration-150 ease-in-out hover:font-bold hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
      >
        {loading ? <Loader /> : 'Sign Up'}
      </button>
    </form>
  )
}

export default SignupForm
