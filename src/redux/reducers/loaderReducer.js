const initialState = {
  isLoading: false,
};

export const loaderReducer = (state = initialState, action) => {
  console.log('loader state', state)
  switch (action.type) {
    case "SHOW_LOADER":
      return {
        ...state,
        isLoading: true,
      };
    case "HIDE_LOADER":
      return {
        ...state,
        isLoading: false,
      };
      default: return state;
  }
};
