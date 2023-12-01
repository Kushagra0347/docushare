import { useState } from 'react'

function Message({ message, variant, className }) {
  const [isVisible, setIsVisible] = useState(true)

  setTimeout(() => {
    setIsVisible(false)
  }, 2000)

  return (
    isVisible && (
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
  )
}

export default Message
