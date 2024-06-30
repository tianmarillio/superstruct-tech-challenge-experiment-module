import { FaCircle } from 'react-icons/fa'
import { twMerge } from 'tailwind-merge'

export default function IterationCard ({
  title = '',
  prefix = '',
  roundedTop = false,
  roundedBottom = false,
  onClick = () => {},
  isSelected = false
}) {
  return (
    <div
      className={twMerge(
        'bg-black grid grid-cols-[4rem,1fr,6rem] gap-4 p-4 cursor-pointer',
        roundedTop ? 'rounded-t-lg' : '',
        roundedBottom ? 'rounded-b-lg' : '',
        isSelected ? 'text-white' : ''
      )}
      onClick={onClick}
    >
      <div>{prefix}</div>
      <div className='break-all'>{title}</div>
      <div className='text-end'>
        {isSelected
          ? (
              ''
            )
          : (
            <>
              Selection <FaCircle className='text-green-500 size-3 inline ml-2' />
            </>
            )}
      </div>
    </div>
  )
}
