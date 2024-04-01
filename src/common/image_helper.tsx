import { baseUrl } from "./constants";



const imageHelper=(url:any)=>{
    console.log("what is the image");
    console.log(`${baseUrl}${url}`);
    return `${baseUrl}${url}`;
}

export default imageHelper;