const mongoose = require("mongoose");
const schema = mongoose.Schema;
const CommentSchema = new schema({
    content: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
    publication:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"publication"
    }
},
{
    timestamps:true,
}
);

module.exports = mongoose.model("comment", CommentSchema);
