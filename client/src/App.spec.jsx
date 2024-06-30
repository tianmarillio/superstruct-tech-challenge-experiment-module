import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Provider } from 'react-redux'

import App from './App'
import { store } from './store'

describe('App', () => {
  it('should render Home component', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    )

    const element = screen.getByTitle('Home')

    expect(element).toBeInTheDocument()
  })
})
