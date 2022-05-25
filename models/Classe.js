const mongoose=require("mongoose")

const ClasseSchema=new mongoose.Schema({
    
    nom:{
     
        type:String,
    },
    duree:{
        type:String,
    },
    nb_heure:{
        type:String,
    },
    calendrier:{
        type:String,
    },
    cours: {
       
        
            type: String,
          
        default: "../cour/default.pdf",
      },
    formation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "formation",
    },
   
},
{
    timestamps:true,
}


)

module.exports=mongoose.model("classe",ClasseSchema);
