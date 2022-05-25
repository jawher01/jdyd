import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import ModalSupression from "./ModalSupression";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import Button from "@mui/material/Button";
import { addComment } from "../../js/actions/publication";
import LikeButoon from "./LikeButton";
import ModalUpdate from "./ModalUpdate";
import CardMedia from "@mui/material/CardMedia";
import MessageIcon from "@mui/icons-material/Message";
import { Comment } from "semantic-ui-react";
import { useSelector } from "react-redux";


const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));
const Publication = ({ publication }) => {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const user = useSelector((state) => state.userReducer.user);

  const isOwner = publication && user && publication.user._id == user._id;
  const renderName = (c) => {
    if (c.user._id == user._id) return "moi";
    return c.user.nom;
  }; 
  
  const renderImg = (c) => {
    if (c.user._id == user._id) return user.receipt;
    return c.user.receipt;
  }; 
  
 
  const renderComment = (c, index) => (
    <div
      key={`comment-${index}`}
      style={{
        display: "flex",
        justifyContent: "space-between",
        paddingInline: 22,
      }}
    >
      <div style={{ marginTop: "4%", marginButton: "4%" }}>
        <Comment style={{ display: "flex", flexDirection: "row" }}>
          <div>
          <Avatar >
              <img  style={{ width: "40px"}} src={renderImg(c)}  />
            </Avatar>
            
         
            <Comment.Author>{renderName(c)}</Comment.Author>
          </div>
          <div>
            <Comment.Content>
              <Comment.Text>{c.content}</Comment.Text>
              <Comment.Metadata>
                <div>{c.date}</div>
              </Comment.Metadata>
            </Comment.Content>
          </div>
        </Comment>
      </div>
    </div>
  );

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div>
     

      <Card
        style={{
          width: "80%",
          marginLeft: "2%",
          marginTop: "5%",
          marginBottom: "20%",
        }}
      >
        <CardHeader
          avatar={
            <Avatar >
              <img  style={{ width: "40px"}} src={publication.user.receipt} />
            </Avatar>
          }
          title={user.nom}
          subheader={publication.titre}
          action={publication.updatedAt}
        />
        <CardMedia
          component='img'
          height='194'
          image={publication.img}
          alt='Paella dish'
        />
        <CardContent>
          <Typography variant='body2' color='text.secondary'>
            {publication.content}
          </Typography>
        </CardContent>
        <div style={{ marginBottom: "2%" }}>
          <CardActions disableSpacing>
            <IconButton aria-label='add to favorites'>
              <div style={{ marginRight: "50%" }}>
                <LikeButoon pub={publication._id} userId={user._id} />
              </div>
            </IconButton>
            {isOwner && (
              <IconButton aria-label='share'>
                <div style={{ marginRight: "30%", marginLeft: "30%" }}>
                  <ModalUpdate pub={publication._id} />
                </div>
                <ModalSupression pub={publication._id} />
              </IconButton>
            )}
            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label='show more'
            >
              <MessageIcon />
            </ExpandMore>
          </CardActions>
        </div>
        <Collapse in={expanded} timeout='auto' unmountOnExit>
          <CardContent>
            <Typography paragraph>
              {publication.comments
                .filter((c, i) => (c.length > 0 ? c.key : i < 3))
                .map((c) => ({
                  content: c.content,
                  user: c.user,
                  nom: c.nom,
                  publication: c.publication,
                  date: c.updatedAt,
                }))
                .map(renderComment)}
              {comments
                .map((c) => ({ content: c, userName: "You", nom: user.nom }))
                .map(renderComment)}
            </Typography>
            <div style={{ marginLeft: "4%" }}>
              <TextField
                id='outlined-required'
                label='commenter'
                defaultValue=''
                onChange={(e) => setComment(e.target.value)}
                InputProps={{
                  readOnly: false,
                }}
              />
            </div>
            <div style={{ marginTop: "4%", marginLeft: "4%" }}>
              <Button
                variant='contained'
                onClick={() => {
                  setComments([...comments, comment]);
                  addComment({
                    user: user._id,
                    publication: publication._id,
                    content: comment,
                  });
                  setComment("");
                }}
              >
                add comment
              </Button>
            </div>
          </CardContent>
        </Collapse>
      </Card>
    </div>
  );
};

export default Publication;
