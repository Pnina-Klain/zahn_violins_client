import axios from 'axios'

export const getLends = async ()=>{
    const response=await axios.get("https://localhost:7280/getLends")
    return response.data
}

export const getById = async (id) => {
    const response = await axios.get("https://localhost:7280/api/Lend/getById/" + id)
    return response.data
}

export const addLend = async (newLend)=>{
    const response=await axios.post("https://localhost:7280/addLend",newLend)
    return response.data
}

export const updateLend = async (id, lend) => {
    const response = await axios.put("https://localhost:7280/updateLend/" + id, lend )
    return response.data
}

export const deleteLend = async (id)=>{
    const response=await axios.delete("https://.../"+id)
    return response.data
}