import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { twMerge } from 'tailwind-merge'

import {
  addIteration,
  lockExperiment
} from '../../../store/experiment/experimentSlice'
import Button from '../../../components/Button'

export default function AddIterationForm ({
  prefix = '',
  roundedTop = false,
  roundedBottom = false,
  experimentIndex,
  lockOnCancel = false,
  close = () => {},
  onGenerateClick = () => {}
}) {
  const dispatch = useDispatch()

  const [iterationTitle, setIterationTitle] = useState('')

  const handleChange = (e) => {
    setIterationTitle(e?.target?.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!iterationTitle) {
      close()

      if (lockOnCancel) {
        dispatch(lockExperiment({ experimentIndex }))
      }

      return
    }

    dispatch(
      addIteration({
        experimentIndex,
        title: iterationTitle
      })
    )

    setIterationTitle('')
    close()
  }

  const handleCancel = () => {
    close()

    if (lockOnCancel) {
      dispatch(lockExperiment({ experimentIndex }))
    }
  }

  return (
    <form className='flex flex-col gap-6' onSubmit={handleSubmit} title='AddIterationForm'>
      <div
        className={twMerge(
          'bg-black grid grid-cols-[4rem,1fr] gap-4 p-4',
          roundedTop ? 'rounded-t-lg' : '',
          roundedBottom ? 'rounded-b-lg' : ''
        )}
      >
        <div>{prefix}</div>
        <input
          className='bg-transparent focus:outline-none placeholder:text-zinc-500 text-white'
          placeholder='Adding iteration...'
          onChange={handleChange}
          value={iterationTitle}
        />
      </div>

      <div className='bg-black rounded-lg p-4'>
        To add a new iteration, start typing a prompt or{' '}
        <span
          className='underline underline-offset-4 hover:text-white cursor-pointer'
          onClick={() => onGenerateClick()}
        >
          generate
        </span>{' '}
        one.
      </div>

      <div className='flex justify-end gap-2'>
        <Button onClick={handleCancel}>CANCEL</Button>
        <Button type='submit' lightText>
          DONE
        </Button>
      </div>
    </form>
  )
}
