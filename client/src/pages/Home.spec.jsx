import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { beforeEach, describe, expect, it } from 'vitest'

import Home from './Home'
import { store } from '../store'
import { setExperiments } from '../store/experiment/experimentSlice'

describe('Home page', () => {
  // Mock store values
  beforeEach(() => {
    store.dispatch(
      setExperiments([
        {
          title: 'Experiment Module',
          isLocked: false,
          iterations: []
        },
        {
          title: 'Experiment Module',
          isLocked: false,
          iterations: [
            {
              title: 'Iteration title 1'
            },
            {
              title: 'Iteration title 2'
            }
          ]
        }
      ])
    )
  })

  it('should render all experiment items from the store', () => {
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    )

    const experimentCardElements = screen.getAllByText('Experiment Module')

    expect(experimentCardElements.length).toBe(2)
  })
})
