import React, {  useState,useEffect } from 'react';
import { PostService } from '../../../services/post.service';
import { UserService } from '../../../services/user.service';
import { useParams,useHistory } from 'react-router-dom';
import Post from '../Post';
function PostLike({ data,getPosts   }) {
	const history = useHistory();
	const [likeButton,setLikeButton]=useState("like")
	const [gaveLikeTo,setGaveLikeTo]=useState(data.user.username)
	const [likesLength,setLikesLength]=useState("")
	const [showDelete,setShowDelete]=useState(true)
	const { username } = useParams();
	useEffect(() => {
		async function getLengthOfLikes(){
		let likesByUsername = await UserService.getLikesLength(data._id)
		setLikesLength(likesByUsername.length)
		}
		getLengthOfLikes()
		},[likeButton])
	useEffect(() => {
	
		async function getInfoOfLikes() {
			const LoggedInUser = await UserService.me()
			// מתוך יוזאפקט, הגייבלייקטו לא נשמר [username,gaveLikeTo,data._id]למה כשאני מוציא את 
			if (username!==undefined) setGaveLikeTo(username)
			let isLiked=await PostService.checkIfLiked(data._id,gaveLikeTo,LoggedInUser.username)
			console.log(LoggedInUser.username,data.user.username)
			if (isLiked===200){
				setLikeButton("unlike")
			} else {
				setLikeButton("like")
			}
			if (LoggedInUser.username!==data.user.username){
				setShowDelete(false)
			}

		}
		
		getInfoOfLikes();
		
	},[likeButton]);

async function toggleLike(){
		const LoggedInUser = await UserService.me();
		if (likeButton==="like"){
			console.log(data)
			PostService.like(data._id,gaveLikeTo,LoggedInUser.username)
			setLikeButton("unlike")
		}
		if (likeButton==="unlike"){
			PostService.unlike(data._id,LoggedInUser.username)
			setLikeButton("like")
		}
		
	}
	async function deletePost(){
		var cnf = window.confirm("Are you sure?")
		if (cnf === true){
			PostService.deletePost(data._id)
			getPosts()
		}
	}
	function editPost(){
		history.push('/postedit/'+data._id)
	}
	return (
		<div className="col-12 col-md-4">
			<button onClick={toggleLike}>{likeButton}</button>
			{showDelete && <div><button onClick={deletePost}>delete</button>
			<button onClick={editPost}>edit</button></div>}
			<div>Likes:{likesLength}</div>
		</div>
	);
}

export default PostLike;
