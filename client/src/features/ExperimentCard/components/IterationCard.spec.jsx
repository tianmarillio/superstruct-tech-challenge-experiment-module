import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import IterationCard from './IterationCard'

describe('IterationCard component', () => {
  it('should renders title & prefix', () => {
    render(<IterationCard title='Iteration title' prefix='EM-1' />)

    const title = screen.getByText('Iteration title')
    const prefix = screen.getByText('EM-1')

    expect(title).toBeInTheDocument()
    expect(prefix).toBeInTheDocument()
  })

  it('should calls onClick handler when clicked', () => {
    const handleClick = vi.fn()

    render(
      <IterationCard
        title='Iteration title'
        prefix='EM-1'
        onClick={handleClick}
      />
    )

    const element = screen.getByText('Iteration title')
    fireEvent.click(element)

    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('should hide selection text when passed selected props', () => {
    render(<IterationCard title='Iteration title' prefix='EM-1' isSelected />)
    const element = screen.queryByText('Selection')

    expect(element).not.toBeInTheDocument()
  })
})
