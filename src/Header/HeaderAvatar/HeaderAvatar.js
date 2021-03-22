
import React, { useEffect, useState,useContext } from 'react';
import './HeaderAvatar.scss';
import Avatar from '../../common/Avatar/Avatar';
import { UserContext } from '../../user-context';
import { Link } from 'react-router-dom';
import { UserService } from '../../services/user.service';
function HeaderAvatar() {
	const { user } = useContext(UserContext);
	async function getUser(){
		const user = await UserService.me();
		const userData = await UserService.getUserData(user.username)
		setUserData(userData);
  }
  const [userData,setUserData]=useState({})
  useEffect(() => {
		getUser();
  }, []);
	return (
		<div className="HeaderAvatar">
			<Link to={'/profile/' + user.username}>
				<Avatar size="md" image={userData.avatar} />
				<span className="mx-2 HeaderAvatar__username d-none d-lg-block">{ user.username }</span>
			</Link>
		</div>
	);
}

export default HeaderAvatar;
