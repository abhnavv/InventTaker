import axiosInstances from "./axiosInstance";

const apiService=async(httpMethod,url,reqBody)=>{
    const reqConfig={
        method:httpMethod,
        url,
        data:reqBody
    }
    try{
        const response=await axiosInstances(reqConfig)
        return response
    }catch(err){
        throw err
    }
}

export default apiService