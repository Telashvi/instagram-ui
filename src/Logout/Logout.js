import React,{  useState,useEffect,useContext} from 'react';
import Cookies from 'js-cookie';
import {  useHistory } from 'react-router-dom';
function Logout(props) {
    const history = useHistory();
	async function out(){
		Cookies.remove('instagram-user');
        history.push('/login');
        props.setUser("")
        props.check()
    }

	return (
    <div>
    <button onClick={out}>Click here to log out</button>
    </div>);
}

export default Logout;
