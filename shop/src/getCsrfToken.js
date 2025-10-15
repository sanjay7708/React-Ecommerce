import api from "./api";

export async function getCsrfToken() {
    try{
        const res=await api.get('accounts/csrf_token/',{
            withCredentials:true
        })
        
        return res.data.csrf_token
    }
    catch(error){
        console.error('Failed to fetch CSRF token:',error)
        return 'null'
    }
}