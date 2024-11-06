import axios from 'axios'

export const getProducts = async ()=>{
    const response=await axios.get("https://localhost:7280/getProducts")
    return response.data
}

export const getById = async (id) => {
    const response = await axios.get("https://localhost:7280/api/Product/getById/" + id)
    return response.data
}

export const addProduct = async (newProduct)=>{
    const response=await axios.post("https://localhost:7280/addProduct",newProduct)
    return response.data
}

export const updateProduct = async (id, product) => {
    const response = await axios.put("https://localhost:7280/updateProduct/" + id, product )
    return response.data
}

export const deleteProduct = async (id)=>{
    const response=await axios.delete("https://.../"+id)
    return response.data
}