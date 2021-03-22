import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './PostPage.scss';
import { PostService } from '../services/post.service';
import Avatar from '../common/Avatar/Avatar';
import PostDate from '../common/Post/PostDate/PostDate';
import PostLike from '../common/Post/PostLike/PostLike';
import Comments from '../common/Comments/Comments'
function PostPage() {

	const { id } = useParams();
	const [post, setPost] = useState(null);

	useEffect(() => {
		async function getPost() {
			try {
				const p = await PostService.get(id);
				if(p) {
					setPost(p);
				} else {
					console.log('POST DOES NOT EXIST!');
				}
			} catch(err) {
				console.log(err);
			}
		}
		getPost();
	}, [id]);

	return (
	<div className="PostPage">
		{post && <div className="row">
			<div className="col-md-8">
				<img className="PostPage__image" src={'data:; base64,' + post.image} alt="" />
				<div className="PostPage__content">
					<p className="PostPage__description">{post.description}</p>
				</div>
				<div className="PostPage__date">
					<PostDate date={post.createdAt} />
				</div>
			</div>
			<div className="col-md-4">
				<header>
					<div className="PostPage__user">
						<Link to={`/profile/${post.user.username}`} className="d-flex">
							<Avatar size="md" image={post.user.avatar} />
							<h3 className="PostPage__user__username">{post.user.username}</h3>
						</Link>
					</div>
					<PostLike data={post}/> 
				</header>
				<hr />
				<Comments postId={post._id}/>
			</div>
		</div>}
	</div>
	);
}

export default PostPage;
