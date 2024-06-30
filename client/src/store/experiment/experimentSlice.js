import { createSlice } from '@reduxjs/toolkit'

const exampleExperiments = [
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
      },
      {
        title: 'Iteration title 3'
      }
    ]
  },

  {
    title: 'Experiment Module',
    isLocked: true,
    iterations: [
      {
        title: 'Iteration title 1'
      }
    ]
  },
  {
    title: 'Experiment Module',
    isLocked: true,
    iterations: []
  }
]

const initialState = {
  experiments: [...exampleExperiments]
}

export const experimentSlice = createSlice({
  name: 'experiment',
  initialState,
  reducers: {
    setExperiments: (state, action) => {
      state.experiments = action.payload
    },
    lockExperiment: (state, action) => {
      const { experimentIndex } = action.payload
      const experiment = state.experiments[experimentIndex]

      state.experiments[experimentIndex] = {
        ...experiment,
        isLocked: true
      }
    },
    unlockExperiment: (state, action) => {
      const { experimentIndex } = action.payload
      const experiment = state.experiments[experimentIndex]

      state.experiments[experimentIndex] = {
        ...experiment,
        isLocked: false
      }
    },
    resetExperiment: (state, action) => {
      const { experimentIndex } = action.payload
      const experiment = state.experiments[experimentIndex]

      state.experiments[experimentIndex] = {
        ...experiment,
        iterations: []
      }
    },
    addIteration: (state, action) => {
      const { title, experimentIndex } = action.payload
      const experiment = state.experiments[experimentIndex]
      const newIteration = {
        title
      }

      state.experiments[experimentIndex] = {
        ...experiment,
        iterations: [...experiment.iterations, newIteration]
      }
    }
  }
})

export const {
  setExperiments,
  lockExperiment,
  unlockExperiment,
  resetExperiment,
  addIteration
} = experimentSlice.actions

const experimentReducer = experimentSlice.reducer

export default experimentReducer
