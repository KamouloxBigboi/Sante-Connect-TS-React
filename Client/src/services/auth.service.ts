import axios from "axios";

const API_URL = "http://localhost:8081/api/auth/";

class AuthService {
  login(email: string, password: string) {
    return axios
      .post(API_URL + "login", {
        email,
        password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(username: string, 
           email: string,
           password: string, 
           age: number, 
           gender: string, 
           occupation: string, 
           country: string) {
    return axios.post(API_URL + "register", {
      username,
      email,
      password,
      age,
      gender,
      occupation,
      country
    });
  }

  getCurrentUser() {
    const userStr = localStorage.getItem("user");
    if (userStr) return JSON.parse(userStr);

    return null;
  }
}

export default new AuthService();
