const User = require("../Model/userModel");
const jwt = require("jsonwebtoken")
const passport = require("passport");
require("../Middleware/passport")

const createToken = (_id)=>{
    return jwt.sign({_id}, process.env.SECRET, {expiresIn: '3d'})
 }


// login user 
const loginUser = async(req, res)=>{

    const {email, password} = req.body

    try{
        const user = await User.login(email, password)
        // create token
        const token = createToken(user._id)

        res.status(200).json({email, token})
    }catch (error){
        res.status(400).json({error: error.message})
    }
}

//signup user
const signupUser = async (req, res)=>{
    const {username, email, password} = req.body

    try{
        const existingUser = await User.findOne({ username });

        if (existingUser) {
            return res.status(400).json({ error: 'Username already exists' });
        }

        const user = await User.signup(username, email, password)
        // create token
        const token = createToken(user._id)

        res.status(200).json({username, email, token})
    }catch (error){
        res.status(400).json({error: error.message})
    }

}

//google signin
const google = passport.authenticate('google', { scope: ['email', 'profile'] })

const googleCallBack = (req, res, next) => {
    passport.authenticate("google", (err,{user, token}) => {
        if (err) {
            console.error("Google authentication error:", err);
            return res.status(500).json({ error: "An error occurred during Google authentication" });
        }
        if (!user || !token) {
            console.error("Google authentication failed");
            return res.status(401).json({ error: "Google authentication failed" });
        }
        res.redirect(`http://localhost:5173/Home?token=${token}`);
    })(req, res, next);
}


module.exports = {loginUser, signupUser, google, googleCallBack}
