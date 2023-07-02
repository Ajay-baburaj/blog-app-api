

const authController =()=>{

    const signup = async(req,res)=>{
        console.log('call is coming')
        console.log(req.body);
    }

    return{
        signup
    }
}

export default authController