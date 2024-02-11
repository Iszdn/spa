import Teams from "../models/team.js";

export const createTeams=async(req,res)=>{
    try {
        const team=new Teams({
            image:req.body.image,
            title:req.body.title,
            position:req.body.position
        })
        await team.save()
        res.status(200).json("created")
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


export const getTeams=async(req,res)=>{
    try {
        const teams=await Teams.find({})
        res.json(teams)
    } catch (error) {
        res.status(500).json({messsage:error})
    }
}

export const updateTeams=async(req,res)=>{
    try {
        const {id}=req.params
        const teams=await Teams.findByIdAndUpdate(id,req.body)
        res.status(200).json("updated")
    } catch (error) {
        res.status(500).json({messsage:error})
    }
}


export const deleteTeams=async(req,res)=>{
    try {
        const {id}=req.params
        const team=await Teams.findByIdAndDelete(id)
        res.status(200).json("deleted")
    } catch (error) {
        res.status(500).json({messsage:error})
    }
}


export const getByIdTeams=async(req,res)=>{
    try {
        const {id}=req.params
        const team=await Teams.findById(id)
        res.json(team)
    } catch (error) {
        res.status(500).json({messsage:error})
    }
}