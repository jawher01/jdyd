import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import './Navbar.css';
import { IconContext } from 'react-icons';
import { useSelector } from "react-redux"
import LogoutBtn from "../Components/auth/LougOutButton"
import { getAllFormation } from "../js/actions/formation";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { current } from "../js/actions/user";
function Navbar() {
  const dispatch = useDispatch();
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);
 

  const user = useSelector(state => state.userReducer.user);
  
  const id=user._id
  useEffect(() => {
    dispatch(getAllFormation());
  }, []);
 
  //{ const formations = useSelector((state) => state.formationReducer.formation);}
  
  
  return (
    <div style={{width:"113%"}}>
      <IconContext.Provider value={{ color: '#fff' }}>
        <div className='navbar'  style={{marginLeft:"5%"}}>
          <Link to='#' className='menu-bars'>
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
         
          <div style={{marginLeft:"5%",display:"flex",marginRight:"5%",justifycontent:" space-between"}}>
              <div style={{marginRight:"30%" ,textDecoration: 'none'}}>
              <Link to={`/profil/${id}`} >profil</Link>
              </div>
             
              <LogoutBtn/>
         
          </div>
        </div>
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className='nav-menu-items' onClick={showSidebar}>
         
            <li className='navbar-toggle'>
              <Link to='#' className='menu-bars'>
                <AiIcons.AiOutlineClose />
                
              </Link>
              
            </li>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName} >
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
                
              );
            })}
           
          </ul>
          
        </nav>
      
      </IconContext.Provider>
      </div>
  );
}

export default Navbar;