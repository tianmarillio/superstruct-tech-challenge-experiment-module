import { useMemo, useState } from 'react'
import { useDispatch } from 'react-redux'
import { twMerge } from 'tailwind-merge'

import { addIteration } from '../../../store/experiment/experimentSlice'
import Button from '../../../components/Button'

export default function GenerateIterationForm ({
  prefix = '',
  experimentIndex,
  close = () => {}
}) {
  const dispatch = useDispatch()
  const [selectedIndex, setSelectedIndex] = useState(0)

  const options = useMemo(() => {
    return [
      { value: 'SHORT' },
      { value: 'MEDIUM LENGTH' },
      { value: 'VERY VERY VERY LONG (UP TO 35 CHAR)' }
    ]
  }, [])

  const handleGenerate = () => {
    dispatch(
      addIteration({
        experimentIndex,
        title: options[selectedIndex].value
      })
    )

    close()
  }

  return (
    <div className='flex bg-black p-4 pb-8 rounded-lg'>
      <div className='w-32 text-white'>{prefix}</div>

      <div className='grow flex flex-col gap-6'>
        <div className='text-white'>Iteration title</div>

        <div className='flex gap-4 flex-wrap border-2 border-t-0 border-x-0 border-b-zinc-800 pb-4'>
          {options.map((option, i) => {
            return (
              <Button
                key={i}
                className={twMerge(
                  'border-2 rounded-lg text-wrap hover:border-green-600 hover:outline-0 border-zinc-600',
                  i === selectedIndex ? 'border-green-600 text-green-600' : ''
                )}
                onClick={() => setSelectedIndex(i)}
              >
                {option.value}
              </Button>
            )
          })}
        </div>

        <div className='flex justify-end gap-2'>
          <Button onClick={() => close()}>REMOVE</Button>
          <Button lightText onClick={handleGenerate}>
            DONE
          </Button>
        </div>
      </div>
    </div>
  )
}
