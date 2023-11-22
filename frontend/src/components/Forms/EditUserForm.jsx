import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {Input, Ripple, initTE} from 'tw-elements';
import Loader from '../Icons/Loader';
import Message from '../Message';

function EditUserForm() {
  //   const dispatch = useDispatch()
  const {loading, userInfo, error} = useSelector((state) => state.userLogin);

  const [details, setDetails] = useState({
    f_name: userInfo.first_name,
    l_name: userInfo.last_name === null ? '' : userInfo.last_name,
    email: userInfo.email,
    dob: userInfo.dob === null ? '' : userInfo.dob,
    avatar: userInfo.avatar === null ? '' : userInfo.avatar,
  });

  async function handleSubmit(event) {
    event.preventDefault();
  }

  function handleChange(e) {
    const id = e.target.id;

    setDetails((details) => ({
      ...details,
      [id]: e.target.value,
    }));
  }

  useEffect(() => {
    initTE({Input, Ripple});
  }, []);
  return (
    <form className="relative w-full px-24" onSubmit={handleSubmit}>
      {error && <Message className="mb-5" message={error} variant={'error'}/>}

      {/* First Name */}
      <div className="relative mt-4" data-te-input-wrapper-init>
        <input
          type="text"
          className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
          value={details.f_name}
          onChange={handleChange}
          id="f_name"
        />
        <label
          htmlFor="f_name"
          className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none "
        >
          First Name
        </label>
      </div>

      {/* Last Name */}
      <div className="relative mt-4" data-te-input-wrapper-init>
        <input
          type="text"
          className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
          value={details.l_name}
          onChange={handleChange}
          id="l_name"
        />
        <label
          htmlFor="l_name"
          className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none "
        >
          Last Name
        </label>
      </div>

      {/* Date Of Birth */}
      <div className="relative mt-4" data-te-input-wrapper-init>
        <input
          type="date"
          className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
          value={details.dob}
          onChange={handleChange}
          id="dob"
        />
        <label
          htmlFor="dob"
          className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none "
        >
          Date Of Birth
        </label>
      </div>

      {/* Email */}
      <div className="relative mt-4" data-te-input-wrapper-init>
        <input
          type="email"
          className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
          value={details.email}
          id="email"
          disabled
        />
        <label
          htmlFor="email"
          className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none "
        >
          Email
        </label>
      </div>

      <button
        type="submit"
        className="mt-4 inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-200 ease-in-out hover:bg-blue-900 hover:font-bold hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-blue-900 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-blue-900 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
      >
        {loading ? <Loader className={'mx-5 h-7 w-7 text-white'}/> : 'Upload'}
      </button>
    </form>
  );
}

export default EditUserForm;
