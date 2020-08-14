const initialState = {
  token: "",
  activity: [],
  budget: {},
  consumption: [],
  weight: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_DATA":
      return { ...state, ...action.payload };
    case "LOG_OUT":
      return { ...state, token: "", activity: [], budget: [], consumption: [] };
    case "UPDATE_FULL_STATE":
      return { ...state, ...action.payload };
    case "SET_BUDGET":
      return { ...state, budget: { ...state.budget, ...action.payload } };
    case "ADD_DATA": {
      const section = Object.keys(action.payload)[0];
      return {
        ...state,
        [section]: [...state[section], action.payload[section]],
      };
    }
    default:
      return state;
  }
};
