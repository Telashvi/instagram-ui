import React, { useEffect, useState } from 'react';
import { PostService } from '../services/post.service';
import './Explore.scss';
import Post from '../common/Post/Post';
function Explore() {
	// let usernameToCheck=document.cookie
	// 	usernameToCheck=usernameToCheck.replace("instagram-user=","")
	// 	usernameToCheck=jwt_decode(usernameToCheck)
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		async function getPosts() {
			setPosts(await PostService.exploreFeed());
		}
		getPosts();
	}, []);
    async function getPosts() {
        setPosts(await PostService.exploreFeed());
    }
	return (
		<div className="row">
			{posts.map(post => (
				<Post key={post._id} data={post} getPosts={getPosts}  />
			))}
		</div>
	);
}

export default Explore;
