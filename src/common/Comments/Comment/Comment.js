import React, { useState, useEffect } from 'react';
import Avatar from '../../Avatar/Avatar';
import CommentDate from '../../Comments/CommentDate/CommentDate';
import { Link } from 'react-router-dom';
import { PostService } from '../../../services/post.service';
import { UserService } from '../../../services/user.service';
function Comment({ comment }) {
	const [showDeleteAndEdit, setShowDeleteAndEdit] = useState(false)
	const [commenterName,setCommenterName] = useState("")
	useEffect(async () => {
		const user = await UserService.me();
		const data = await PostService.getCommentData(comment._id)
		const userDataById = await UserService.getUserDataById(data.user)
		setCommenterName(userDataById.username)
		if (user._id === data.user) {
			setShowDeleteAndEdit(true)
		} else {
			setShowDeleteAndEdit(false)
		}
	}, []);
	// show delete button if i'm the creator
	async function erase() {
		await PostService.deleteComment(comment._id)

	}
	
	return (
		<div>
		<Link to={'/profile/' +  commenterName}>
			<Avatar image={comment.user.avatar} />
			<div>{commenterName}</div>
			</Link>
			<p className="mb-0">{comment.content}</p>
			<CommentDate date={comment.createdAt} />
			<button>Like</button>
			{showDeleteAndEdit && <div>
				<button onClick={erase}>Delete</button>
				<button>Edit</button></div>}
		</div>
	);
}

export default Comment;