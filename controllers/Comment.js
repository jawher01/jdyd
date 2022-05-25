const Comment = require("../models/comment");
const Publication = require("../models/Publication");
const User = require("../models/User");

exports.Postcomment = async (req, res) => {
      try {
            let pub =await Publication.findOne({
                  _id:req.body.publication
            })
            let USER =await User.findOne({
                  _id:req.body.user
            })
           
           
            const comment = new Comment({
                   content: req.body.content,
                
                   });
                   comment.user=USER._id
                   comment.publication=pub._id
          let resultat=   await comment.save();
               pub.comments.push(resultat._id);

              await pub.save();

            res.status(200).send({ response:comment, msg:"comment ajouter avec suucces" });
            
            return;
      } catch (error) {
            console.log(error)
           res.status(404).send({ message: "can not save it" });
          
          
      }
};

