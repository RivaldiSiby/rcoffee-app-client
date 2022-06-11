export const addProducts = (url) => {
  return {
    type: "ADD_PRODUCTS",
    url: url,
  };
};
export const clearProducts = () => {
  return {
    type: "CLEAR_PRODUCTS",
  };
};
