import axios from "axios";

//creating varibale for axios instance
const axiosInstances=axios.create({
    baseURL:"https://inventaker-api.onrender.com",
    timeout:5000
})

//response interceptors handling global/common error
axiosInstances.interceptors.response.use(
    (response)=>{
        console.log("Response Recieved..");
        return response
    },
    (error)=>{
        if(error.response){
            const status=error.response.status
            if(status==401){
                console.log("Un-Authorized");
            }else if(status==404){
                console.log("API Not Found!..");
            }else if(status==500){
                console.log("Server Error !...");
            }else if(error.request){
                console.log("No response From Server!..");
            }else{
                console.log("Error"+error.message);
            }
            return Promise.reject(error)
        }
    }

)

export default axiosInstances