import React, {  useState,useEffect } from 'react';
import { PostService } from '../../../services/post.service';
import { UserService } from '../../../services/user.service';
import { useParams } from 'react-router-dom';
function PostLike({ data   }) {
	const [likeButton,setLikeButton]=useState("like")
	const [gaveLikeTo,setGaveLikeTo]=useState(data.user.username)
	const [likesLength,setLikesLength]=useState("")
	const { username } = useParams();
	useEffect(() => {
		async function getLengthOfLikes(){
		let likesByUsername = await UserService.getLikesLength(data._id)
		setLikesLength(likesByUsername.length)
		}
		getLengthOfLikes()
		},
		[username,gaveLikeTo,data._id,likeButton])
	useEffect(() => {
	
		async function getInfoOfLikes() {
			const LoggedInUser = await UserService.me()
			// מתוך יוזאפקט, הגייבלייקטו לא נשמר [username,gaveLikeTo,data._id]למה כשאני מוציא את 
			if (username!==undefined) setGaveLikeTo(username)
			let isLiked=await PostService.checkIfLiked(data._id,gaveLikeTo,LoggedInUser.username)
			
			if (isLiked===200){
				setLikeButton("unlike")
			} else {
				setLikeButton("like")
			}
		}
		
		getInfoOfLikes();
		
	},[username,gaveLikeTo,data._id]);

async function toggleLike(){
		const LoggedInUser = await UserService.me();
		if (likeButton==="like"){
			PostService.like(data._id,gaveLikeTo,LoggedInUser.username)
			setLikeButton("unlike")
		}
		if (likeButton==="unlike"){
			PostService.unlike(data._id,LoggedInUser.username)
			setLikeButton("like")
		}
		
	}
	return (
		<div className="col-12 col-md-4">
			<button onClick={toggleLike}>{likeButton}</button>
			<div>Likes:{likesLength}</div>
		</div>
	);
}

export default PostLike;
