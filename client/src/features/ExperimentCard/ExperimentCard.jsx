import { useEffect, useState } from 'react'
import { FaLock, FaLockOpen, FaPlus } from 'react-icons/fa'
import { useDispatch } from 'react-redux'

import IterationCard from './components/IterationCard'
import GenerateIterationForm from './components/GenerateIterationForm'
import AddIterationForm from './components/AddIterationForm'
import {
  lockExperiment,
  resetExperiment,
  unlockExperiment
} from '../../store/experiment/experimentSlice'
import Button from '../../components/Button'

// Enums for ExperimentCard stages, to determine which elements to render
export const EXPERIMENT_CARD_STAGE = {
  Default: 'Default',
  AddForm: 'AddForm',
  GenerateForm: 'GenerateForm'
}

export default function ExperimentCard ({
  title = '',
  isLocked = false,
  iterations = [],
  experimentIndex
}) {
  const dispatch = useDispatch()

  const [stage, setStage] = useState(EXPERIMENT_CARD_STAGE.Default)
  const [selectedIterationIndex, setSelectedIterationIndex] = useState(null)

  /**
   * Will open add iteration interface if experiment's iteration is empty
   */
  useEffect(() => {
    if (iterations.length) {
      return
    }

    if (stage !== EXPERIMENT_CARD_STAGE.Default) {
      return
    }

    setStage(EXPERIMENT_CARD_STAGE.AddForm)
  }, [stage])

  const handleReset = () => {
    dispatch(resetExperiment({ experimentIndex }))
    setStage(EXPERIMENT_CARD_STAGE.AddForm)
  }

  const handleLock = () => {
    dispatch(lockExperiment({ experimentIndex }))
  }

  const handleUnlock = () => {
    dispatch(unlockExperiment({ experimentIndex }))
  }

  const handleSelectIteration = (index) => {
    if (index === selectedIterationIndex) {
      setSelectedIterationIndex(null)
      return
    }

    setSelectedIterationIndex(index)
  }

  if (isLocked) {
    return (
      <div
        className='rounded-lg w-full bg-zinc-800 px-4 flex flex-col gap-6 py-6'
        onClick={handleUnlock}
      >
        <div className='flex justify-between font-bold text-2xl pr-4 items-center cursor-pointer'>
          <div>{title}</div>
          {iterations.length ? <FaLock title='lock-icon' /> : null}
        </div>
      </div>
    )
  }

  return (
    <div className='rounded-lg w-full bg-zinc-800 px-4 flex flex-col gap-6 py-6'>
      <div className='flex font-bold items-center text-2xl pr-4 cursor-pointer justify-between'>
        <div className='text-white'>{title}</div>
        {iterations.length ? <FaLockOpen title='lock-open-icon' /> : null}
      </div>

      <div className='flex flex-col gap-1'>
        <>
          {iterations.map((iteration, i) => {
            return (
              <IterationCard
                key={i}
                title={iteration.title}
                prefix={`EM-${i + 1}`}
                roundedTop={i === 0}
                roundedBottom={
                  i !== iterations.length - 1
                    ? false
                    : stage !== EXPERIMENT_CARD_STAGE.AddForm
                }
                onClick={() => handleSelectIteration(i)}
                isSelected={selectedIterationIndex === i}
              />
            )
          })}
        </>

        {stage === EXPERIMENT_CARD_STAGE.AddForm
          ? (
            <>
              <AddIterationForm
                prefix={`EM-${iterations.length + 1}`}
                experimentIndex={experimentIndex}
                lockOnCancel={!iterations.length}
                roundedTop={!iterations.length}
                roundedBottom
                close={() => {
                  setStage(EXPERIMENT_CARD_STAGE.Default)
                }}
                onGenerateClick={() =>
                  setStage(EXPERIMENT_CARD_STAGE.GenerateForm)}
              />
            </>
            )
          : null}
      </div>

      {stage === EXPERIMENT_CARD_STAGE.Default
        ? (
          <div className='flex justify-end gap-2'>
            <Button onClick={handleLock}>LOCK</Button>
            <Button onClick={handleReset}>RESET</Button>

            <Button
              lightText
              onClick={() => setStage(EXPERIMENT_CARD_STAGE.AddForm)}
            >
              <FaPlus className='inline size-3 mr-1' /> ADD ITERATION
            </Button>
          </div>
          )
        : null}

      {stage === EXPERIMENT_CARD_STAGE.GenerateForm
        ? (
          <GenerateIterationForm
            experimentIndex={experimentIndex}
            prefix={`EM-${iterations.length + 1}`}
            close={() => setStage(EXPERIMENT_CARD_STAGE.Default)}
          />
          )
        : null}
    </div>
  )
}
