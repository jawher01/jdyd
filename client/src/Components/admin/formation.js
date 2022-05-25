import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import Modal from "./modalFormation"
import ModalSup from "./ModalSupFor"
import Model from "./modiferFormation"
import { useSelector } from "react-redux";
export default function MultiActionAreaCard({formation}) {
 
  const user = useSelector((state) => state.userReducer.user);
  const isOwner = user.role === "modirateur" || user.role ==="admin superieur" || user.role ==="editeur"
 


  return (
    
    <div style={{marginBottom:"5%"}}>
    <Card  style={{ height: "500px",width: "60%",marginLeft:"20%"}} >
      <CardActionArea>
        <CardMedia
          component="img"
          height="300"
          width= "200"
          image={formation.img}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {formation.nom}
          </Typography>
          <Typography variant="body2" color="text.secondary">
           {formation.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" >
          <Modal formation={formation}/>
        </Button>
        {isOwner && (
          <div style={{display:"flex"}} >
          <div style={{ marginRight: "30%", marginLeft: "30%" }}>
       <ModalSup formation={formation._id}/>
       </div>
       <Model form={formation._id}/>
       </div>
       )}
      </CardActions>
    </Card>
    </div>
  );
}