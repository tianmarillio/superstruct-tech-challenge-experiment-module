import { describe, expect, it } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'

import ExperimentCard from './ExperimentCard'
import { store } from '../../store'

describe('ExperimentCard feature component', () => {
  it('should renders correct title', () => {
    render(
      <Provider store={store}>
        <ExperimentCard experimentIndex={0} title='Experiment Title' />
      </Provider>
    )

    const element = screen.getByText('Experiment Title')

    expect(element).toBeInTheDocument()
  })

  it('should renders iteration cards when passed iterations props with length more than 0', () => {
    render(
      <Provider store={store}>
        <ExperimentCard
          experimentIndex={0}
          title='Experiment Title'
          iterations={[
            {
              title: 'Iteration title 1'
            },
            {
              title: 'Iteration title 2'
            },
            {
              title: 'Iteration title 3'
            }
          ]}
        />
      </Provider>
    )

    const iterationCard1 = screen.getByText('Iteration title 1')
    const iterationCard2 = screen.getByText('Iteration title 1')
    const iterationCard3 = screen.getByText('Iteration title 1')

    expect(iterationCard1).toBeInTheDocument()
    expect(iterationCard2).toBeInTheDocument()
    expect(iterationCard3).toBeInTheDocument()
  })

  it('should renders correct empty Experiment Module state on empty iterations', () => {
    render(
      <Provider store={store}>
        <ExperimentCard
          experimentIndex={0}
          title='Experiment Title'
          iterations={[]}
        />
      </Provider>
    )

    const inputElement = screen.getByPlaceholderText(/Adding iteration/i)
    const tooltipElement = screen.getByText(/To add a new iteration,/i)

    expect(inputElement).toBeInTheDocument()
    expect(tooltipElement).toBeInTheDocument()

    const lockIcon = screen.queryByTitle('lock-icon')
    const lockOpenIcon = screen.queryByTitle('lock-open-icon')

    expect(lockIcon).not.toBeInTheDocument()
    expect(lockOpenIcon).not.toBeInTheDocument()
  })

  it('should renders generate iteration form when clicking generate link', () => {
    render(
      <Provider store={store}>
        <ExperimentCard
          experimentIndex={0}
          title='Experiment Title'
          iterations={[]}
        />
      </Provider>
    )

    const generateLinkElement = screen.getByText(/generate/i)
    fireEvent.click(generateLinkElement)

    const titleElement = screen.getByText('Iteration title')
    const optionElement = screen.getByText('SHORT')

    expect(titleElement).toBeInTheDocument()
    expect(optionElement).toBeInTheDocument()
  })

  it('should display lock icon when locked', () => {
    render(
      <Provider store={store}>
        <ExperimentCard
          experimentIndex={0}
          title='Experiment Title'
          iterations={[
            {
              title: 'Iteration title 1'
            }
          ]}
          isLocked
        />
      </Provider>
    )

    const lockIcon = screen.getByTitle('lock-icon')
    expect(lockIcon).toBeInTheDocument()
  })

  it('should display lock open icon when locked', () => {
    render(
      <Provider store={store}>
        <ExperimentCard
          experimentIndex={0}
          title='Experiment Title'
          iterations={[
            {
              title: 'Iteration title 1'
            }
          ]}
          isLocked={false}
        />
      </Provider>
    )

    const lockOpenIcon = screen.getByTitle('lock-open-icon')
    expect(lockOpenIcon).toBeInTheDocument()
  })
})
