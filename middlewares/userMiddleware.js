import JWT from 'jsonwebtoken';

// protected Signin user token base

export const middlewaresForSigninUser=async (req,res,next)=>{
    try {
        const decodejwtoken=JWT.verify(req.headers.authorization,process.env.JWT_SECRET);
        console.log("decodejwtoken",decodejwtoken)
        global.signinUser = decodejwtoken;
        console.log("req.signinUser",req.signinUser)
        next();
    } catch (error) {
        console.log(error)
        
    }
}