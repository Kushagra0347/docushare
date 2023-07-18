function Message({ message, variant, className }) {
  return (
    <div
      className={`${
        variant == 'warning'
          ? 'text-yellow-500'
          : variant == 'error'
          ? 'text-red-500'
          : 'text-green-500'
      } ${className}`}
    >
      {message}
    </div>
  )
}

export default Message
