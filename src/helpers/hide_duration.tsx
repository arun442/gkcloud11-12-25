const hideDuration=(partner:number,technology:number)=>{
    if(partner==1||technology==2){
        return true;
    }
    return false;
}

export default hideDuration;