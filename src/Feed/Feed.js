import React, { useEffect, useState } from 'react';
import { PostService } from '../services/post.service';
import './Feed.scss';
import Post from '../common/Post/Post';
import { Link } from 'react-router-dom';
function Feed() {
	// let usernameToCheck=document.cookie
	// 	usernameToCheck=usernameToCheck.replace("instagram-user=","")
	// 	usernameToCheck=jwt_decode(usernameToCheck)
	const [posts, setPosts] = useState([]);
	const [goExplore, setGoExplore] = useState(false);
	const [checkPostsLength, setCheckPostsLength] = useState(false)
	useEffect(() => {
		async function getPosts() {
			setPosts(await PostService.feed());
			setCheckPostsLength(true)
		}
		getPosts();

	}, []);

	useEffect(() => {
		if (checkPostsLength === true) {
			if (posts.length === 0) {
				setGoExplore(true)
			} else {
				setGoExplore(false)
			}
		}
	}, [checkPostsLength]);
	return (
		<div className="row">
			{posts.map(post => (
				<Post key={post._id} data={post} />
			))}
			{goExplore && <Link to={'/explore'}>You're not following anyone yet! click here to explore</Link>}
		</div>
	);
}

export default Feed;
