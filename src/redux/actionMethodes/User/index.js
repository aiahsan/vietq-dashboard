import {Types} from '../types'
export const LogOut=()=>{
    return { type: Types.logOut, payload: null }    
}
export const Login=(payload)=>{
    return {type:Types.signIn,payload:payload}
}