const initialState = {
  url: "http://localhost:8080/product/favorite?limit=12",
};

const products = (prevState = initialState, action) => {
  // action
  switch (action.type) {
    case "ADD_PRODUCTS":
      return { url: action.url };
    case "CLEAR_PRODUCTS":
      return { url: "http://localhost:8080/product/favorite?limit=12" };
    default:
      return prevState;
  }
};

export default products;
