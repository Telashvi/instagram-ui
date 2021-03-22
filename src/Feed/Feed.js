import React, { useEffect, useState } from 'react';
import { PostService } from '../services/post.service';
import './Feed.scss';
import Post from '../common/Post/Post';
function Feed() {
	// let usernameToCheck=document.cookie
	// 	usernameToCheck=usernameToCheck.replace("instagram-user=","")
	// 	usernameToCheck=jwt_decode(usernameToCheck)
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		async function getPosts() {
			setPosts(await PostService.feed());
		}
		getPosts();
	}, []);

	return (
		<div className="row">
			{posts.map(post => (
				<Post key={post._id} data={post}  />
			))}
		</div>
	);
}

export default Feed;
