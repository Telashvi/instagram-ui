import React, { useEffect, useState } from 'react';
import './Comments.scss';
import CommentAdd from './CommentAdd/CommentAdd';
import { PostService } from '../../services/post.service';
import Comment from './Comment/Comment';

function Comments({ postId }) {

	const [comments, setComments] = useState([]);

	useEffect(() => {
		async function getComments() {
			try {
				const commentsArr = await PostService.getComments(postId)
				setComments(commentsArr);
			} catch(err) {
				console.log(err);
			}
		}
		getComments();
	}, [postId,comments]);

	function onCommentAdd(comment) {
		setComments([...comments, comment]);
	}

	return (
		<div>
			<h2 className="h5">Comments</h2>
			<div className="my-2">
				{comments.map(comment => <Comment key={comment._id} comment={comment} onCommentAdd={onCommentAdd} />)}
			</div>
			<CommentAdd postId={postId} onCommentAdd={onCommentAdd} />
		</div>
	);
}

export default Comments;