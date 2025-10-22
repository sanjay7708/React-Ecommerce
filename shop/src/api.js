import axios from "axios";
const api=axios.create({
    baseURL:"https://sanjaym.pythonanywhere.com/",
    withCredentials:true
})

export default api
