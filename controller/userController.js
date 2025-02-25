
let users = []
let userId = 1

export const addUser = async (req,res) =>{
    try{        
        const {name,email,age} = req.body
        if(!name || !email){
            return res.status(400).json({message:"Name and Email are required"});
        }
        const emailExists = users.some(user => user.email == email);
        if (emailExists) {
            return res.status(400).json({message:"Email already exists"});
        }
        const newUser = {id:userId++,name:name,email:email,age:age}
        users.push(newUser)
        res.status(200).json({message:"user created successfully",userData:newUser})
    }catch(error){
        console.log("Add user Error :" ,error.message)
        res.status(500).json({message:"Internal sertver error"})
    }
}


export const getAllUser = async (req,res) =>{
    try{
        res.status(200).json({message:"Users fetched Successfully",users})
    }catch(error){
        console.log("Error while fetching users:" ,error.message)
        res.status(500).json({message:"Internal sertver error"})
    }
}


export const getSpecificUser = async (req,res) =>{
    try{
        const userId = parseInt(req.params.id)
        const user = users.find((data)=>data.id == userId)
        if(!user){
            return res.status(404).json({message:"User not found"})
        }
        res.status(200).json({message:"User fetched Successfully",user})
    }catch(error){
        console.log("Error while fetching user:" ,error.message)
        res.status(500).json({message:"Internal sertver error"})
    }
}

export const editUser = async (req,res) =>{
    try{
        const userId = parseInt(req.params.id)
        const {name,email,age} = req.body
        const userIndex = users.findIndex((data)=> data.id == userId)
        if(userIndex == -1){
            return res.status(404).json({message:"User not found"})
        }
        if(email){
            const existingEmail = users.some((data) => data.email === email && data.id !== userId);
            if (existingEmail) {
                return res.status(400).json({message:"Email already exists"});
            }
        }
        users[userIndex] = {
            ...users[userIndex],
            name: name || users[userIndex].name,
            email: email || users[userIndex].email,
            age: age !== undefined ? age : users[userIndex].age
        };
        res.status(200).json({message:"User edited successfully",user: users[userIndex]});
    }catch(error){
        console.log("Error while editing user:" ,error.message)
        res.status(500).json({message:"Internal sertver error"})
    }
}


export const removeUser = async (req,res) =>{
    try{
        const userId = parseInt(req.params.id)
        const userIndex = users.findIndex((data)=> data.id == userId)
        if(userIndex == -1){
            return res.status(404).json({message:"User not found"})
        }
        users.splice(userIndex, 1)
        res.status(200).json({message:"User removed successfully"});
    }catch(error){
        console.log("Error while removing user:" ,error.message)
        res.status(500).json({message:"Internal sertver error"})
    }
}

