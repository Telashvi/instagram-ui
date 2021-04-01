import React, { useEffect, useState } from 'react';
import { UserService } from '../../services/user.service';
import Avatar from '../../common/Avatar/Avatar';

 function ProfileHeader({ username, postNum,followersNum,isFollow }) {

	const [user, setUser] = useState({});
	const [userData,setUserData]= useState([])
	const [followers,setFollowers] = useState(0)
	useEffect(() => {
		async function getUser() {
			try {
				const user = await UserService.get(username);
				setUser(user);
				const data = await UserService.getUserData(username)
			setUserData(data)
			} catch (err){
				console.log(err)
			}
			
		}
		getUser();
		console.log(userData)
	}, [isFollow]);
	// useEffect(() => {
	// 	console.log(userData)
	//   }, [userData])
	return (
		<div className="mt-5">
			<Avatar image={user.avatar} size="lg" />
			<h2>{user.username}</h2>
			<p>{postNum} posts</p>
		<p> {userData?.followers?.length} followers</p>
		<p> {userData?.following?.length} following</p>	
		</div>
	);
}

export default ProfileHeader;
