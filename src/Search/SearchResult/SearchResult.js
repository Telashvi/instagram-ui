import React from 'react';
import './SearchResult.scss';
import Avatar from '../../common/Avatar/Avatar';
import { Link } from 'react-router-dom';

function SearchResult({ user }) {
	return (
		<div className="col-lg-4">
			<Link to={'/profile/' + user.username}>
				<div className="SearchResult d-flex">
					<div className="SearchResult__avatar">
						<Avatar size="md" image={user.avatar} />
					</div>
					<div>
						<strong>{ user.username }</strong>
						<p className="SearchResult__bio">{user.bio}</p>
					</div>
				</div>
			</Link>
		</div>
	);
}

export default SearchResult;