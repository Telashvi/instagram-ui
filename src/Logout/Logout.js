import React,{  useState,useEffect } from 'react';
import Cookies from 'js-cookie';
import {  useHistory } from 'react-router-dom';
function Logout() {
    const history = useHistory();
	 function out(){
		
		Cookies.remove('instagram-user');
        history.push('/login');
    }

	
	return (
    <div>
    <button onClick={out}>Click here to log out</button>
    </div>);
}

export default Logout;
