import axios from "axios";
import { toast } from "react-toastify";

axios.interceptors.request.use((config) =>{

    return config
},(error)=>{
    return Promise.reject(error)
});

axios.interceptors.response.use((response)=>{
    switch(response?.status){
        case 200:
            toast("success");
            break;
        case 401:
            localStorage.getItem("refreshtoken");
            return ;
        default:
            return response;
    }
    return response
},(error)=>{
    toast.error(error)
    return Promise.reject(error); 
})
export default axios