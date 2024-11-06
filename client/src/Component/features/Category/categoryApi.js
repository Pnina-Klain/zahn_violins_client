import axios from 'axios'

export const getCategories = async ()=>{
    const response=await axios.get("https://localhost:7280/getCategories")
    return response.data
}

export const getById = async (id) => {
    const response = await axios.get("https://localhost:7280/api/Category/getById/" + id)
    return response.data
}

export const addCategory = async (newCategory)=>{
    const response=await axios.post("https://localhost:7280/addCategory",newCategory)
    return response.data
}

export const updateCategory = async (id, category) => {
    const response = await axios.put("https://localhost:7280/updateCategory/" + id,category )
    return response.data
}

export const deleteCategory = async (id)=>{
    const response=await axios.delete("https://.../"+id)
    return response.data
}