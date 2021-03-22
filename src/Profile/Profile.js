import React, { useEffect, useState,useContext } from 'react';
import './Profile.scss';
import { useParams } from 'react-router-dom';
import { UserService } from '../services/user.service';
import Post from '../common/Post/Post';
import ProfileHeader from './ProfileHeader/ProfileHeader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt  } from '@fortawesome/free-solid-svg-icons';
import { faMemory  } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { UserContext } from '../user-context';
 function Profile() {

	const { username } = useParams(); // followed user 
	const followed = username
	const [posts, setPosts] = useState([]);
	// const [likes, setLikes] = useState([]);
	const [showEdit,setShowEdit]=useState(false)
	const [showFollow,setShowFollow]=useState(true)
	const [showUnfollow,setShowUnfollow]=useState(false)
	const [followingUserId,setFollowingUserId] = useState("")
	const [followedUserId,setFollowedUserId] = useState("")
	useEffect(async() => {
		const user = await UserService.me(); // following user
		if (username===user.username){
			setShowEdit(true)
		} else {
			setShowEdit(false)
		}
		async function getPosts() {
			try {
				const posts = await UserService.getPosts(username);
				setPosts(posts);
			} catch(err) {
				console.log(err);
			}
		}
		async function checkIfFollow(){
			const status = await UserService.checkIfFollow(username)
			console.log(status)
			if (status===200){
				setShowFollow(false)
				setShowUnfollow(true)
			} else {
				setShowFollow(true)
				setShowUnfollow(false)
			}
		}
		async function getUserData(){
			const data = await UserService.getUserData(username)
			setFollowedUserId(data._id)
			setFollowingUserId(user._id)
		}
		checkIfFollow()
		getPosts();
		getUserData()
		
	}, [username,followingUserId]);
	

	async function follow(){
		await UserService.follow(followingUserId,followedUserId)
		setShowFollow(false)
				setShowUnfollow(true)
	}

	async function unfollow(){
		await UserService.unfollow(username)
		setShowFollow(true)
				setShowUnfollow(false)
			
	}
	
	function check(){
		console.log("followingUserId:",followingUserId,"followedUserId:",followedUserId)
	}
	return (
	<>
		<ProfileHeader username={username} postNum={posts.length}   />
		{showEdit && <div className="nav-item">
				<Link className="nav-link" to={"/profile/"+username+"/edit"}>
					<FontAwesomeIcon icon={faPencilAlt} />
				</Link>
			</div>}
			<button onClick={check}>check follow data</button>
			{showFollow && <div className="nav-item">
					<button onClick={follow}>Follow   <FontAwesomeIcon icon={faMemory} /></button>
			</div>}
			{showUnfollow && <div className="nav-item">
					<button onClick={unfollow}>Unfollow   <FontAwesomeIcon icon={faMemory} /></button>
			</div>}
		<hr />
		<div className="row">
			{posts.map(post => (
				<Post key={post._id} data={post} username={{username}} />
			))}
		</div>
		<ul className="nav">
			
			<ul></ul></ul>
		
	</>
	);
}

export default Profile;
