import { render, screen, fireEvent } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import Button from './Button'

describe('Button component', () => {
  it('should renders correct button text', () => {
    render(<Button>Click</Button>)
    const button = screen.getByText('Click')

    expect(button).toBeInTheDocument()
  })

  it('should calls onClick handler when clicked', () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>Click</Button>)
    const button = screen.getByText('Click')
    fireEvent.click(button)

    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('should has correct type attribute when type prop is passed', () => {
    render(
      <Button type='submit' lightText className='bg-black'>
        Submit
      </Button>
    )
    const button = screen.getByText('Submit')

    expect(button).toHaveAttribute('type', 'submit')
  })

  it('should has correct className when lightText prop is passed', () => {
    render(<Button lightText>Click</Button>)
    const button = screen.getByText('Click')

    expect(button).toHaveClass('text-white')
  })
})
