const mongoose = require("mongoose");
const schema = mongoose.Schema;
const PubSchema = new schema({
    img: { 
        type: String,
        default:"http://127.0.0.1:6500/public//default.png"
    },
    nom: {
        type: String,
        required: true,
    },
    titre: {
        type: String,
    },
    content: {
        type: String,
        required: true,
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "comment",
        }
    ],
    likers: {
        type: [String],
    },
    user: 
    {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
    },
   
   
},
{
    timestamps:true,
}
);

module.exports = mongoose.model("publication", PubSchema);