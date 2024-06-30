import { beforeEach, describe, expect, it } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'

import { store } from '../../../store'
import { setExperiments } from '../../../store/experiment/experimentSlice'
import GenerateIterationForm from './GenerateIterationForm'

describe('GenerateIterationForm component', () => {
  beforeEach(() => {
    store.dispatch(
      setExperiments([
        {
          title: 'Experiment Module',
          isLocked: false,
          iterations: []
        }
      ])
    )
  })

  it('should add new iteration based on selection', () => {
    render(
      <Provider store={store}>
        <GenerateIterationForm experimentIndex={0} />
      </Provider>
    )

    const option = screen.getByText('MEDIUM LENGTH')
    const submitButton = screen.getByText('DONE')

    fireEvent.click(option)
    fireEvent.click(submitButton)

    const experiment = store.getState().experiment.experiments[0]

    expect(experiment.iterations.length).toBe(1)
    expect(experiment.iterations[0].title).toBe('MEDIUM LENGTH')
  })
})
