import React, { useState } from 'react';
import './CommentAdd.scss';
import { PostService } from '../../../services/post.service';

function CommentAdd({ postId, onCommentAdd }) {

	const [content, setContent] = useState('');

	async function submit(e) {
		e.preventDefault();
		const comment = await PostService.addComment(postId, content);
		onCommentAdd(comment);
		setContent('');
	}

	return (
		<form onSubmit={submit}>
			<div className="mb-2">
				<textarea
					onChange={(e) => setContent(e.target.value)}
					className="form-control"
					value={content}>
				</textarea>
			</div>
			<button className="btn btn-success">Submit</button>
		</form>
	);
}

export default CommentAdd;