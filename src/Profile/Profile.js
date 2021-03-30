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
	const [posts, setPosts] = useState([]);
	// const [likes, setLikes] = useState([]);
	const [showEdit,setShowEdit]=useState(false)
	const [showFollow,setShowFollow]=useState(true)
	const [showUnfollow,setShowUnfollow]=useState(false)
	const [followingUserId,setFollowingUserId] = useState("")
	const [followedUserId,setFollowedUserId] = useState("")
	const [userData,setUserData]=useState("")
	const [showGoPost,setShowGoPost]=useState(false)
	const [checkPostsLength,setCheckPostsLength]=useState(false)
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
				setCheckPostsLength(true)
			} catch(err) {
				console.log(err);
			}
		}
		async function checkIfFollow(){
			const status = await UserService.checkIfFollow(followingUserId,followedUserId)
			console.log(status)
			if (status===200){
				setShowFollow(false)
				setShowUnfollow(true)
			} else {
				setShowFollow(true)
				setShowUnfollow(false)
			}
			if (followingUserId===followedUserId){
				setShowFollow(false)
				setShowUnfollow(false)
			}
		}
		async function getUserData(){
			const data = await UserService.getUserData(username)
			setFollowedUserId(data._id)
			setFollowingUserId(user._id)
		}
		getPosts();
		getUserData()
		checkIfFollow()
		
		
		
	}, [username,followingUserId]);
	
	useEffect(() => {
		if (checkPostsLength===true){
			if (posts.length===0){
				setShowGoPost(true)
			} else {
				setShowGoPost(false)
			}
		}
	},[checkPostsLength])

	useEffect(() => {

	},[]);
	
	async function follow(){
		await UserService.follow(followingUserId,followedUserId)
		setShowFollow(false)
				setShowUnfollow(true)
	}

	async function unfollow(){
		await UserService.unfollow(followingUserId,followedUserId)
		setShowFollow(true)
				setShowUnfollow(false)
			
	}
	
	async function getPosts() {
		try {
			const posts = await UserService.getPosts(username);
			setPosts(posts);
		} catch(err) {
			console.log(err);
		}
	}
	
	// async function getFollowers(){
	// 	const followers = await UserService.getFollowers(username)
	// 	setFollowers(followers.length)
	// }
	// function check(){
	// 	console.log("followingUserId:",followingUserId,"followedUserId:",followedUserId)
	// }
	return (
	<>
		<ProfileHeader username={username} postNum={posts.length}  />
		{showEdit && <div className="nav-item">
				<Link className="nav-link" to={"/profile/"+username+"/edit"}>
					<FontAwesomeIcon icon={faPencilAlt} />
				</Link>
			</div>}
			{/* <button onClick={check}>check follow data</button> */}
			{showFollow && <div className="nav-item">
					<button onClick={follow}>Follow   <FontAwesomeIcon icon={faMemory} /></button>
			</div>}
			{showUnfollow && <div className="nav-item">
					<button onClick={unfollow}>Unfollow   <FontAwesomeIcon icon={faMemory} /></button>
			</div>}
		<hr />
		{showGoPost && <Link to={'/post/create'   }>You haven't posted anything yet! click here to post something...</Link>}
		<div className="row">
			{posts.map(post => (
				<Post key={post._id} data={post} username={{username}} getPosts={getPosts} />
			))}
		</div>
		<ul className="nav">
			
			<ul></ul></ul>
		
	</>
	);
}

export default Profile;
