import axios from "axios";
import {
  selectToken,
  selectWeight,
  selectConsumption,
  selectActivity,
} from "./selectors";
import { showMessageWithTimeout } from "../appState/actions";
import { BACKEND_ADDRESS } from "../../constants";

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
        url: `${BACKEND_ADDRESS}/api/user/budget`,
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
    try {
      const response = await axios({
        method: "post",
        data: data,
        url: `${BACKEND_ADDRESS}/api/user/add`,
        headers: { Authorization: `Bearer ${token}` },
      });
      data[Object.keys(data)[0]]._id = response.data;
      dispatch(addDAta(data));
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
      const payloadData = weight.map((w) => {
        if (+new Date(w.date) === +new Date(data.weight.date))
          w.weight = Number(data.weight.weight);
        return w;
      });
      const payload = { weight: payloadData };
      data.weight._id = update[0]._id;
      const sendDate = {
        weight: { _id: [update[0]._id], ...data.weight },
      };
      try {
        const response = await axios({
          method: "patch",
          data: sendDate,
          url: `${BACKEND_ADDRESS}/api/user/weight`,
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

export const deleteWeightThunk = (id, date) => {
  return async (dispatch, getState) => {
    const weight = selectWeight(getState());
    const token = selectToken(getState());
    const filteredWeight = weight.filter(
      (w) => w._id !== id || w.date !== date
    );
    const payload = { weight: filteredWeight };
    try {
      const response = await axios({
        method: "delete",
        data: { id, date },
        url: `${BACKEND_ADDRESS}/api/user/weight`,
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch(updateFullState(payload));
      dispatch(showMessageWithTimeout("success", response.data.message));
    } catch (err) {
      console.log(err);
    }
  };
};

export const deleteLogItemThunk = (data) => {
  return async (dispatch, getState) => {
    const stateData =
      data.category === "consumption"
        ? selectConsumption(getState())
        : selectActivity(getState());
    const token = selectToken(getState());
    const filteredStateDate = stateData.filter((d) => d._id !== data.id);
    const payload = { [data.category]: filteredStateDate };
    try {
      const response = await axios({
        method: "delete",
        data: data,
        url: `${BACKEND_ADDRESS}/api/user/add`,
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch(updateFullState(payload));
      dispatch(showMessageWithTimeout("success", response.data.message));
    } catch (err) {
      console.log(err);
    }
  };
};
