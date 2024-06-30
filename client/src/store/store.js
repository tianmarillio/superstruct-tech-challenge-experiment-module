import { configureStore } from '@reduxjs/toolkit'

import experimentReducer from './experiment/experimentSlice'

export const store = configureStore({
  reducer: {
    experiment: experimentReducer
  }
})
