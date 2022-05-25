import { useEffect } from "react";
import React, { Fragment } from "react";
import "./App.css";
import Dash from "./Components/loyout/dashbord.js";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { current } from "./js/actions/user";
import Acceil from "./Components/loyout/acceil";
import UserEtud from "./Components/admin/UserList";
import UserProf from "./Components/admin/ProfesseurList"
import Profil from "./Components/profil/Profil";
import PrivateRoute from "./Components/router/PrivateRoute";
import Publication from "./Components/publication/PublicationList";
import Evenement from "./Components/admin/Evenement/EvenementList"
import Classe from "./Components/admin/classes";
import Formation from "./Components/admin/formationList";
import Employer from "./Components/admin/Employer/Employer"
import Autres from "./Components/admin/user/user"
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(current());
  },[current]);

  return (
    
    <Router>
      <Fragment>
        <section className='container'>
          <Routes>
            <Route exact path='/' element={<Dash />} />
            <Route
              exact
              path='/acceil'
              element={
                <PrivateRoute>
                  <Acceil />
                </PrivateRoute>
              }
            />
            <Route
              exact
              path='/profil/:id'
              element={
                <PrivateRoute>
                  <Profil />
                </PrivateRoute>
              }
            />
            <Route
              exact
              path='/admin/user/etudiant'
              element={
                <PrivateRoute>
                  <UserEtud />
                </PrivateRoute>
              }
            />
            <Route
            exact
            path='/admin/user/autres'
            element={
              <PrivateRoute>
                <Autres />
              </PrivateRoute>
            }
          />
            <Route
              exact
              path='/admin/user/employer'
              element={
                <PrivateRoute>
                  <Employer />
                </PrivateRoute>
              }
            />
            <Route
              exact
              path='/admin/user/professeur'
              element={
                <PrivateRoute>
                  <UserProf />
                </PrivateRoute>
              }
            />
            <Route
              exact
              path='/forum'
              element={
                <PrivateRoute>
                  <Publication />
                </PrivateRoute>
              }
            />
            <Route
              exact
              path='/evenement'
              element={
                <PrivateRoute>
                  <Evenement />
                </PrivateRoute>
              }
            />
            <Route
              exact
              path='/classe'
              element={
                <PrivateRoute>
                  <Classe />
                </PrivateRoute>
              }
            />
            <Route
              exact
              path='/formation'
              element={
                <PrivateRoute>
                  <Formation />
                </PrivateRoute>
              }
            />
          </Routes>
        </section>
      </Fragment>
    </Router>
  );
}

export default App;
