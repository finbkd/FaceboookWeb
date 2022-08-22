import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:5000/",
  withCredentials: true,
  headers: {
    "Access-Control-Allow-Credentials": true,
    "Access-Control-Allow-Headers": "origin, content-type, accept",
    "Access-Control-Allow-Origin": "http://localhost:5000",
    "Content-type": "application/json",
    Accept: "application/json",
  },
});

export const loginUser = async (data) => await api.post("/api/auth/login", data);
export const createPost = async (data) => await api.post("/api/posts/create", data);
export const fetchPosts = async (data) => await api.get("/api/posts/timeline/62ce9dcb417497c53124de3d", data);
export const updateUserProfile = async (data, id) => await api.put(`/api/users/${id}`, data);
// export const updateUserProfile = async (data, id) => console.log(data, id);

// api.interceptors.response.use(
//   (config) => {
//     return config;
//   },
//   async (error) => {
//     const originalRequest = error.config;
//     if (error.response.status === 401 && originalRequest && !originalRequest._isRetry) {
//       originalRequest.isRetry = true;
//       try {
//         await axios.get(`http://localhost:5000/api/auth/refresh`, {
//           //not using instance of axios(api)
//           withCredentials: true, // so we can send cookies
//         });

//         return api.request(originalRequest); //hit original route after refresh(Activate)
//       } catch (err) {
//         console.log("err", err.message);
//       }
//     }
//     throw error;
//   }
// );
