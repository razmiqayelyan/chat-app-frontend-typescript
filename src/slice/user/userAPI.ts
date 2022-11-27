import axios from "axios"
import {  editUserType, loginUserType, registerUserType } from "../../types/userType"

// export const DOMAIN = 'https://ragram.herokuapp.com/'
export const DOMAIN = 'http://localhost:5500/'



const login = async(user : loginUserType) => {
    try {
        return axios.post(DOMAIN + "api/user/login", user)        
    } catch (error) {
        localStorage.removeItem("token")
        return
    }
}

const register = async(user: registerUserType) => {
    try {
        return axios.post(DOMAIN + "api/user", user)        
    } catch (error) {
        localStorage.removeItem("token")
        return
    }
}


const validateToken = async(token: string) => {
    return await axios.post(DOMAIN + "api/user/verify", {}, {
        headers: {
            'Authorization': `Bearer ${token}` 
          }
    })
}

const editUser = async(data:editUserType, token: string) => {
    let body;
    const {name, pic} = data
    if(name && pic) body = {name, pic}
    else if (name && !pic) body = {name}
    else if (pic && !name) body = {pic}
    return await axios.put(DOMAIN + "api/user", body, {
        headers: {
            'Authorization': `Bearer ${token}` 
          }
    })
}

const allUsers = async(token: string) => {
    return await axios.get(DOMAIN + `api/user` , {
        headers: {
            'Authorization': `Bearer ${token}` 
          }
    })
}

const functions = {
    login,
    validateToken,
    allUsers,
    register,
    editUser
}
export default functions