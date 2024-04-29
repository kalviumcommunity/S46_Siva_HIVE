const User = require("../Model/userModel")


// login user 
const loginUser = async(req, res)=>{

    const {email, password} = req.body

    try{
        const user = await User.login(email, password)

        res.status(200).json({email})
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

        res.status(200).json({username, email})
    }catch (error){
        res.status(400).json({error: error.message})
    }

}

module.exports = {loginUser, signupUser}
