import React, {useState,useEffect} from 'react';
import Avatar from '../Avatar/Avatar';
import './Post.scss';
import { Link } from 'react-router-dom';
import PostDate from './PostDate/PostDate';
import PostLike from './PostLike/PostLike';
function Post({ data,username,getPosts  }) {

	const [usernameToLink,setUsernameToLink]=useState("")
	useEffect(() => {
		if (username===undefined){
			setUsernameToLink(data.user.username)
		} else{
			setUsernameToLink(username.username)
		}
	}, [data, username]);
	

	return (
		<div className="col-12 col-md-4">
			<article className="Post">
				<header>
					<Link to={'/profile/' +  usernameToLink}>
					<div className="Post__user">
						<Avatar size="md" image={data.user.avatar}  />
						{data.user.username}
					</div>
					</Link>
					<div className="Post__date">

							<PostDate date={data.createdAt} />
					</div>
				</header>
				<div className="Post__image">
					<Link to={'/post/' + data._id}>
					<img src={'data:; base64,' + data.image} className="Post__image" alt="" />
					</Link>
				</div>
				<div className="Post__content">
					<h1 className="Post__description">{data.description}</h1>
				</div>
				<PostLike data={data} getPosts={getPosts}/> 
				
				
			</article>
		</div>
	);
}

export default Post;
