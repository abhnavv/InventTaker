import apiService from "../api/apiService";

export const addItemAPI=async(reqBody)=>{
    return await apiService("POST",`/inventory`,reqBody)
}

export const getAllItemsAPI=async()=>{
    return await apiService("GET",`/inventory`)
}

export const deleteItemAPI=async(id)=>{
    return await apiService("DELETE",`/inventory/${id}`)
}

export const editItemAPI=async(id,reqBody)=>{
    return await apiService("PUT",`inventory/${id}`,reqBody)
}