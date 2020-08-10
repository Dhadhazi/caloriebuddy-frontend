import axios from "axios";
import { selectToken, selectWeight } from "./selectors";
import { showMessageWithTimeout } from "../appState/actions";

export const loginUser = (data) => {
  return {
    type: "LOGIN_DATA",
    payload: { ...data },
  };
};

export const logOut = () => {
  localStorage.clear();
  return {
    type: "LOG_OUT",
  };
};

export const addDAta = (data) => {
  return {
    type: "ADD_DATA",
    payload: { ...data },
  };
};

export const updateFullState = (data) => {
  return {
    type: "UPDATE_FULL_STATE",
    payload: { ...data },
  };
};

export const setBudget = (data) => {
  return {
    type: "SET_BUDGET",
    payload: { ...data },
  };
};

export const setBudgetThunk = (data) => {
  return async (dispatch, getState) => {
    const token = selectToken(getState());
    dispatch(setBudget(data));
    try {
      const response = await axios({
        method: "patch",
        data: data,
        url: "http://localhost:4000/api/user/budget",
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch(showMessageWithTimeout("success", response.data.message));
    } catch (err) {
      console.log(err);
    }
  };
};

export const addUserData = (data) => {
  return async (dispatch, getState) => {
    const token = selectToken(getState());
    dispatch(addDAta(data));
    try {
      const response = await axios({
        method: "post",
        data: data,
        url: "http://localhost:4000/api/user/add",
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch(showMessageWithTimeout("success", response.data.message));
    } catch (err) {
      console.log(err);
    }
  };
};

export const addWeight = (data) => {
  return async (dispatch, getState) => {
    const weight = selectWeight(getState());
    const token = selectToken(getState());
    const update = weight.filter(
      (w) => +new Date(w.date) === +new Date(data.weight.date)
    );
    if (update.length > 0) {
      const payload = weight.map((w) => {
        if (+new Date(w.date) === +new Date(data.weight.date))
          w.weight = Number(data.weight.weight);
        return w;
      });
      console.log("Payload from actions", payload);
      data.weight._id = update[0]._id;
      const sendDate = {
        weight: { _id: [update[0]._id], weight: data.weight },
      };
      try {
        const response = await axios({
          method: "patch",
          data: sendDate,
          url: "http://localhost:4000/api/user/weight",
          headers: { Authorization: `Bearer ${token}` },
        });
        dispatch(updateFullState(payload));
        dispatch(showMessageWithTimeout("success", response.data.message));
      } catch (err) {
        console.log(err);
      }
    } else {
      dispatch(addUserData(data));
    }
  };
};
