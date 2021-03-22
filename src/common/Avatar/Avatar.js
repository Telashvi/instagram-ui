import React from 'react';
import PropTypes from 'prop-types';
import avatarDefault from './avatar.jpg';
import './Avatar.scss';

function Avatar(props) {
	let editedAvatar=avatarDefault.replace("data:image/jpeg;base64,","");
	const image = props.image || editedAvatar;
	const size = props.size || 'md';
	const className = 'Avatar--' + size;
	return (
		<img src={'data:; base64,' + image} alt="avatar" className={'Avatar ' + className} />
	);
}

Avatar.propTypes = {
	size: PropTypes.oneOf(['sm', 'md', 'lg'])
};

export default Avatar;
