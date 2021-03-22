import React, { useState ,useEffect } from 'react';
import Avatar from '../../Avatar/Avatar';
import CommentDate from '../../Comments/CommentDate/CommentDate';
import { PostService } from '../../../services/post.service';
import { UserService } from '../../../services/user.service';
function Comment({ comment }) {
	const [showDeleteAndEdit,setShowDeleteAndEdit]=useState(false)
	useEffect(async() => {
		const user = await UserService.me();
		console.log(user._id)
		const data = await PostService.getCommentData(comment._id)
		console.log(data.user)
		if (user._id===data.user){
			setShowDeleteAndEdit(true)
		} else {
			setShowDeleteAndEdit(false)
		}
	}, []);
	// show delete button if i'm the creator
	async function erase(){
		await PostService.deleteComment(comment._id)
		
	}

	return (
		<div>
			<Avatar image={comment.user.avatar} />
			<p className="mb-0">{comment.content}</p>
			<CommentDate date={comment.createdAt} />
			<button>Like</button>
			{showDeleteAndEdit &&<div>
			 <button onClick={erase}>Delete</button>
			<button>Edit</button></div>}
		</div>
	);
}

export default Comment;