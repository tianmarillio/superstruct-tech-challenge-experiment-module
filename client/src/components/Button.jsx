import React from 'react'
import { twMerge } from 'tailwind-merge'

export default function Button ({
  type = 'button',
  className = '',
  onClick = () => {},
  lightText = false,
  children
}) {
  return (
    <button
      type={type}
      className={twMerge(
        'bg-transparent rounded-lg px-4 py-2 border-2 border-transparent hover:border-zinc-400 font-bold white xl:max-w-96 max-w-72',
        lightText ? 'text-white' : '',
        className
      )}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
