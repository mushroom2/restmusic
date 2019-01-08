export const initialState = {
  tracks: [],
}

export function rootReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_TRACKS':
      return { ...state, tracks: action.payload };

    default:
      return state
  }
}