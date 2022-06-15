import axios from "axios";

export default async function GenerateToken(auth, cb) {
  const result = await axios.get(
    `${process.env.REACT_APP_HOST}/auth/${auth["refreshkey"]}`
  );
  if (result.data.data.token !== undefined) {
    const authData = {
      datauser: auth["datauser"],
      tokenkey: result.data.data.token,
      refreshkey: auth["refreshkey"],
    };
    cb(authData, result.data.data.token);
    return result.data.data.token;
  }
}
