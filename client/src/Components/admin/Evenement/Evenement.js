import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import Update from "./Update"
import { useDispatch, useSelector } from "react-redux";
import ModalSupression from "./ModalSupression"
import Participe from "./Participe"
const Evenement = (evenement) => {


  const user = useSelector((state) => state.userReducer.user);
  const isOwner = user.role === "modirateur" || user.role ==="admin superieur" || user.role ==="editeur"



 

  return (
    
    <div style={{marginBottom:"5%"}}>
    <Card  style={{ height: "600px",width: "80%",marginLeft:"3%"}} >
      <CardActionArea>
        <CardMedia
          component="img"
          height="300"
          width= "200"
          image={evenement.evenement.img}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {evenement.evenement.nom} :
          </Typography>
          <Typography variant="h5" component="div" >
           {evenement.evenement.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
      <div style={{ marginRight: "5%" }}>
      <Participe eve={evenement.evenement._id} userId={user._id} />
    </div>
        {isOwner && (
          <div style={{display:"flex",marginLeft: "3%"}} >
          <div style={{ marginRight: "30%", marginLeft: "30%" }}>
          <ModalSupression eve={evenement.evenement._id} />
       </div>
       <Update eve={evenement.evenement._id} />
       </div>

       )}
      </CardActions>
    </Card>
    </div>


     
   
  );
};

export default Evenement;
