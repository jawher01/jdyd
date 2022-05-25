import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useSelector } from "react-redux";
import Modal from "./model";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { current } from "../../js/actions/user";
import Acceil from "../loyout/acceil";
import { getAllFormation } from "../../js/actions/formation";
import { getAllPublications } from "../../js/actions/publication";
import { Spinner } from "react-bootstrap";
import Publication from "../publication/publication";
export default function Profil() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(current());
  }, [current]);
  useEffect(() => {
    dispatch(getAllPublications());
  }, [getAllPublications]);
  useEffect(() => {
    dispatch(getAllFormation());
  }, []);
  
  const user = useSelector((state) => state.userReducer.user);
  
  const publications = useSelector(
    (state) => state.publicationReducer.publication
  );
 
  
  let tabs=[];
  for (let i=0;i<publications.length;i++){
   
     if (publications[i].user._id==user._id) {
       tabs.push(publications[i])
     }
  }
  
  
 
  const loadPublications = useSelector(
    (state) => state.publicationReducer.loadPublications
  );
  
  const formations = useSelector((state) => state.formationReducer.formation);
  let form = [];
  for (let i = 0; i < formations.length; i++) {
    if (formations[i]._id === user.forma[0]) {
      form.push(formations[i]);
    }
  }

  return (
    <div>
      <div>
        <Acceil />
      </div>
      <div style={{ marginLeft: "20%", marginTop: "5%" }}>
        <Box
          component='form'
          sx={{
            "& .MuiTextField-root": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete='off'
        >
          <div>
          <div style={{marginBottom:"10%", marginLeft: "1%"}}>
            <img style={{width:"20%",border: '1px solid black'}} src={user.receipt} alt="photo" />
            </div>
            
            <TextField
              required
              id='outlined-required'
              label='nom'
              defaultValue={user.nom}
              InputProps={{
                readOnly: true,
              }}
            />
            <TextField
              required
              id='outlined-require'
              label='prenom'
              defaultValue={user.prenom}
              InputProps={{
                readOnly: true,
              }}
            />
            <div>
              <TextField
                required
                id='outlined-helperTex'
                label='email'
                defaultValue={user.email}
                InputProps={{
                  readOnly: true,
                }}
              />
              <TextField
                required
                id='outlined-password-input'
                label='password'
                type='password'
                defaultValue={user.password}
                InputProps={{
                  readOnly: true,
                }}
              />
            </div>
            <TextField
              required
              id='outlined-read-only-input'
              label='role'
              defaultValue={user.role}
              InputProps={{
                readOnly: true,
              }}
            />
          </div>
          <div>
            <TextField
              id='filled-required'
              label='adresse'
              defaultValue={user.adresse}
              InputProps={{
                readOnly: true,
              }}
            />
            <TextField
              id='filled-disabled'
              label='num_tel'
              defaultValue={user.num_tel}
              InputProps={{
                readOnly: true,
              }}
            />

            <TextField
              id='filled-read-only-input'
              label='niveaux_scolaire'
              defaultValue={user.niveau_scolaire}
              InputProps={{
                readOnly: true,
              }}
            />
            <TextField
              id='filled-number'
              label='salaire'
              defaultValue={user.salaire}
              InputProps={{
                readOnly: true,
              }}
            />
            <TextField
              id='filled-search'
              label='formation'
              defaultValue=''
              InputProps={{
                readOnly: true,
              }}
            />
          </div>
        </Box>
      </div>
      <div style={{ marginLeft: "20%" }}>
        <Modal />
      </div>
      <div>
      
        <div style={{ marginLeft: "200px", marginTop: "5%" }}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              flexDirection: "column",
              marginTop: "5%",
              marginBottom: "20%",
            }}
          >
            {loadPublications ? (
              <Spinner animation='border' variant='info'>
                <span className='sr-only'></span>
              </Spinner>
            ) : (
              tabs.map((el) => (
                <Publication key={el._id} publication={el} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
