import axios from "axios";

const autoLogin = async (localToken) => {
  const res = await axios({
    method: "get",
    url: "http://caloriebuddy-backend.herokuapp.com/api/loginJwt",
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
