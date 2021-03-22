import React, { useState, useEffect } from 'react';
import './Search.scss';
import { UserService } from '../services/user.service';
import SearchResult from './SearchResult/SearchResult';

function Search() {

	const [query, setQuery] = useState('');
	const [users, setUsers] = useState([]);

	useEffect(() => {
		if (!query) {
			setUsers([]);
			return;
		}

		async function getUsers() {
			try {
				setUsers(await UserService.search(query));
			} catch (err) {
				console.log(err);
			}
		}

		getUsers();
	}, [query]);

	function hasNoResults() {
		return users.length === 0 && query.length > 0;
	}

	return (
		<div>
			<h1>Search</h1>
			<input value={query} onChange={(e) => setQuery(e.target.value)}/>
			<div className="row mt-4">
				{users.map(user => {
					return <SearchResult key={user._id} user={user} />
				})}
			</div>
			{hasNoResults() && 'Sorry, no user!'}
		</div>
	);
}

export default Search;