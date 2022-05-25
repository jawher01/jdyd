const mongoose=require("mongoose")

const FormationSchema=new mongoose.Schema({
    
    nom:{
        required:true,
        type:String
    },
    description:{
        required:true,
        type:String
    },
    type:{
        type:String,
        required:true,
    },
    duree:{  
        type:String, 
    },
    prix:{ 
        type:String,
    },
    date_debut:{
        type:String,
    },
    date_fin:{
        type:String,
    },
    img: { 
        type: String,
        default:"http://127.0.0.1:6500/public//default.png"
    },
    etudiant: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    }],
    proffeseur:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
},
{
    timestamps:true,
}
)

module.exports=mongoose.model("formation",FormationSchema);


