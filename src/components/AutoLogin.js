import axios from "axios";
import { BACKEND_ADDRESS } from "../constants";

const autoLogin = async (localToken) => {
  const res = await axios({
    method: "get",
    url: `${BACKEND_ADDRESS}/api/loginJwt`,
    headers: { Authorization: `Bearer ${localToken}` },
  });
  if (res.data.message) {
    return res.data.message;
  } else {
    const userData = { ...res.data, token: localToken };
    return userData;
  }
};

export default autoLogin;
