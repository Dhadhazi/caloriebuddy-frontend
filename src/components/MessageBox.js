import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { selectMessage } from "../store/appState/selectors";
import { clearMessage } from "../store/appState/actions";

export default function MessageBox() {
  const message = useSelector(selectMessage);
  const dispatch = useDispatch();

  const showMessage = message !== null ? "show" : "";
  if (!showMessage) return null;

  return (
    <div>
      <div
        className={`alert  alert-${message.variant} alert-dismissible fade ${showMessage}`}
      >
        {message.text}
        <button
          type="button"
          className="close"
          data-dismiss="alert"
          aria-label="Close"
          onClick={() => dispatch(clearMessage())}
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    </div>
  );
}
