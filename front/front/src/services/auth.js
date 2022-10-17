import Axios from '../apis/Axios'
import jwt_decode from "jwt-decode"

export const login = async function(username, password){
    const cred = {
        username: username,
        password: password
    }

    try{
        const ret = await Axios.post('/users/auth',cred)
        const decoded = jwt_decode(ret.data);
        console.log(decoded.role.authority)
        window.localStorage.setItem('role', decoded.role.authority);
        window.localStorage.setItem('jwt',ret.data);
        window.location.reload();
    }catch(err){
        console.log(err);
        alert('Neuspesan login');
    }
}

export const logout = async function(){
    window.localStorage.removeItem('role');
    window.localStorage.removeItem('jwt');
    window.location.reload();
}