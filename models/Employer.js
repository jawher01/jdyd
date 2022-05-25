const mongoose=require("mongoose")

const EmployerSchema=new mongoose.Schema({
    
    nom:{
        required:true,
        type:String
    },
    prenom:{
        required:true,
        type:String
    },
    poste:{
        required:true,
        type:String
    },
    salaire:{
        required:true,
        type:String
    },
    rib:{
        required:true,
        type:String
    },
},

{
    timestamps:true,
}


)

module.exports=mongoose.model("employer",EmployerSchema);