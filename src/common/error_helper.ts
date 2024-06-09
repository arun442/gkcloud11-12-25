import { AxiosError } from "axios";

 const errorHelper=(error:any):string=>{
return error?.response?.data["error"];
}

export default errorHelper;