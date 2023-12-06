
import axios from "axios";
import { useSelector } from "react-redux";


const CreateUserInstance = ()=>{
    const token = useSelector((state) => state.ClientAuth.Token);
    const userAPI = "http://localhost:3000/";


    const userInstance = axios.create({
        baseURL:userAPI
    });

    userInstance.interceptors.request.use(
        (config)=>{
            if(token){
                config.headers["Authorization"] = `Bearer ${token}`;
            }
            return config
        },
        (error)=>{
            return Promise.reject(error);
        }
    );
    return userInstance
}



export default CreateUserInstance;



