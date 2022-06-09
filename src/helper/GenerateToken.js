import axios from "axios";

export default async function GenerateToken() {
  const refreshToken = JSON.parse(localStorage.getItem("refreshkey"));

  const result = await axios.get(`http://localhost:8080/auth/${refreshToken}`);
  if (result.data.data.token !== undefined) {
    localStorage.setItem("tokenkey", JSON.stringify(result.data.data.token));
    return;
  }
}
