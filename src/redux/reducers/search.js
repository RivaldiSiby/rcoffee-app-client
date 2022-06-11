const initialState = {
  search: false,
};

const search = (prevState = initialState, action) => {
  // action
  switch (action.type) {
    case "ADD_SEARCH":
      return { search: true };
    case "CLEAR_SEARCH":
      return { search: false };
    default:
      return prevState;
  }
};

export default search;
