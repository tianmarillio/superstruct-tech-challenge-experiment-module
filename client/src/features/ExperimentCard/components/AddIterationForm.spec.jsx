import { beforeEach, describe, expect, it } from 'vitest'
import { Provider } from 'react-redux'
import { fireEvent, render, screen } from '@testing-library/react'

import { store } from '../../../store'
import AddIterationForm from './AddIterationForm'
import { setExperiments } from '../../../store/experiment/experimentSlice'

describe('AddIterationForm component', () => {
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

  it('should add new iteration on submit', () => {
    render(
      <Provider store={store}>
        <AddIterationForm experimentIndex={0} />
      </Provider>
    )

    const formElement = screen.getByTitle('AddIterationForm')
    const inputElement = screen.getByPlaceholderText(/Adding iteration/i)

    fireEvent.change(inputElement, { target: { value: 'New Iteration' } })
    fireEvent.submit(formElement)

    const experiment = store.getState().experiment.experiments[0]

    expect(experiment.iterations.length).toBe(1)
    expect(experiment.iterations[0].title).toBe('New Iteration')
  })
})
