import User from "../models/userModels.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'

dotenv.config()//env file

export function postUsers(req,res){

    const user=req.body
    //pasword hasing
    const password=req.body.password;

    const saltRounds=10;
    const passwordHash=bcrypt.hashSync(password,saltRounds)
    console.log(passwordHash)
    user.password=passwordHash;

    const newUser=new User(user)
    newUser.save().then(
        ()=>{
            res.json({
                message:"User created sucesfully"
            })
        }
    ).catch(
        ()=>{
            res.json({
                message:"User creatioon failed"
            })
        }
    )
}

export function getUsers(req,res){
    const user=req.body;
   User.find().then((user)=>{
    res.status(200).json(user);
   }).catch((error) => {
    console.error("Error fetching users:", error); // Log the error
    res.status(500).json({
        message: "Failed to fetch users",
        error: error.message // Include the error message in the response
    });
});

}
export function loginUser(req, res) {
    const credentials = req.body;

    // Step 1: Find the user by email
    User.findOne({ email: credentials.email })
        .then((user) => {
            if (!user) {
                // If user is not found
                return res.status(403).json({
                    message: "User not found"
                });
            }

            // Step 2: Compare the provided password with the hashed password in the database
            const isPasswordValid = bcrypt.compareSync(credentials.password, user.password);

            if (!isPasswordValid) {
                // If the password is invalid
                return res.status(401).json({
                    message: "Invalid password"
                });
            }

            // Step 3: Generate a JWT token
            const payload = {
                id: user._id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                type: user.type,
            };

            const token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: "360h" });
            console.log(token)

            // Step 4: Send the response with the user and token
            res.json({
                message: "Login successful",
                user: {
                    id: user._id,
                    email: user.email,
                    password:user.password,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    type: user.type,
                },
                token: token
            });
        })
        .catch((error) => {
            console.error("Error during login:", error);
            res.status(500).json({
                message: "Login failed",
                error: error.message
            });
        });
}
