import axios from 'axios'
             
export const getUsers = async ()=>{
    const response=await axios.get("https://localhost:7280/getUsers")
    return response.data
}

export const getById = async (id) => {
    const response = await axios.get("https://localhost:7280/api/User/getById/" + id)
    return response.data
}
export const getByName = async (name) => {
    const response = await axios.get("https://localhost:7280/api/User/getByName/" + name)
    return response.data
}

export const addUser = async (newUser)=>{
    const response=await axios.post("https://localhost:7280/addUser",newUser)
    return response.data
}

export const updateUser = async (id, user) => {
    const response = await axios.put("https://localhost:7280/updateUser/" + id, user )
    return response.data
}

export const deleteUser = async (id)=>{
    const response=await axios.delete("https://.../"+id)
    return response.data
}