import axios from "axios";

const API_URL = "http://localhost:5000/api/auth/";

class AuthService {
  async login(email: string, 
              password: string,) {
    const response = await axios
      .post(API_URL + "login", {
        email,
        password
      }, {
        timeout: 5000
      });
    if (response.data.accessToken) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(username: string, 
           email: string,
           password: string, 
           age: number, 
           country: string
           ) {
    return axios.post(API_URL + "register", {username,
                                             email,
                                             password,
                                             age,
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
