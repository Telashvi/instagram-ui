import React, { useEffect, useState } from 'react';
import { UserService } from '../../services/user.service';
import Avatar from '../../common/Avatar/Avatar';

function ProfileHeader({ username, postNum }) {

	const [user, setUser] = useState({});

	useEffect(() => {
		async function getUser() {
			const user = await UserService.get(username);
			setUser(user);
		}
		getUser();
	}, [username]);

	return (
		<div className="mt-5">
			<Avatar image={user.avatar} size="lg" />
			<h2>{user.username}</h2>
			<p>{postNum} posts</p>
		</div>
	);
}

export default ProfileHeader;
