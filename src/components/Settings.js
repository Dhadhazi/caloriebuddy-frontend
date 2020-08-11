import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { selectToken } from "../store/user/selectors";
import { useSelector, useDispatch } from "react-redux";
import { showMessageWithTimeout } from "../store/appState/actions";
import { logOut } from "../store/user/actions";
import axios from "axios";

export default function Settings() {
  const history = useHistory();
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const [resetSure, setResetSure] = useState(false);
  const [deleteSure, setDeleteSure] = useState(false);

  async function resetAccount() {
    try {
      const response = await axios({
        method: "put",
        url: "http://localhost:4000/api/user/",
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch(logOut());
      dispatch(showMessageWithTimeout("success", response.data.message));
      history.push("/");
    } catch (err) {
      console.log(err);
    }
  }

  async function delteAccount() {
    try {
      const response = await axios({
        method: "delete",
        url: "http://localhost:4000/api/user/",
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch(logOut());
      dispatch(showMessageWithTimeout("success", response.data.message));
      history.push("/");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="column">
      {" "}
      <div className="row justify-content-center margin-top">
        {!resetSure ? (
          <button className="btn btn-danger" onClick={() => setResetSure(true)}>
            Reset Account Data
          </button>
        ) : (
          <button className="btn btn-danger" onClick={() => resetAccount()}>
            Click again to confirm
          </button>
        )}
      </div>
      <div className="row justify-content-center margin-top">
        {!deleteSure ? (
          <button
            className="btn btn-danger"
            onClick={() => setDeleteSure(true)}
          >
            Delete Account
          </button>
        ) : (
          <button className="btn btn-danger" onClick={() => delteAccount()}>
            Click again to confirm
          </button>
        )}
      </div>{" "}
    </div>
  );
}
