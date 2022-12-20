const initialState = {
  homeData: "",
};
export const homeReducer = (state = initialState, action) => {
  // console.log("=======", action);
  if (action.type === "addData") {
    return {
      ...state,
      homeData: action.payload,
    };
  } else {
    return state;
  }
  // return {
  //   ...state,
  //   homeData: action.payload,
  // };
};
