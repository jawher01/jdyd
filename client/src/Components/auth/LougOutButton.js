import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../js/actions/user";
import { useNavigate } from 'react-router-dom';

export default  () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();


    return (
        <button
            
            onClick={() => {
                dispatch(logout());
                navigate('/');
            }}
        >
            Logout
        </button>);
}