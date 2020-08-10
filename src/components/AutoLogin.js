import axios from "axios";

const autoLogin = async (localToken) => {
  const res = await axios({
    method: "get",
    url: "http://localhost:4000/api/loginJwt",
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
