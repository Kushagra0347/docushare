function AddButton({ variant, label }) {
  return (
    <button
      type="button"
      data-te-toggle="modal"
      data-te-target="#addFileModal"
      className="group flex w-fit items-center transition-colors hover:text-secondary"
    >
      <div
        className={`${
          label ? 'mr-2' : 'mr-0'
        } flex h-[50px] w-[50px] items-center justify-center rounded-full bg-quaternary transition-colors group-hover:bg-gray-300 group-hover:bg-opacity-25`}
      >
        <i
          className={`fas fa-circle-plus text-2xl ${
            variant == 'primary' ? 'text-primary' : 'text-black'
          }`}
        ></i>
      </div>
      <span className="font-bold">{label}</span>
    </button>
  )
}

export default AddButton
