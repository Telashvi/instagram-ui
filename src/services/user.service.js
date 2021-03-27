
import Cookies from 'js-cookie';
import environment from '../environments/index';

export class UserService {

	static getToken() {
		return Cookies.get('instagram-user');
	}

	static me() {
		return fetch(environment.apiUrl + '/user/me', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: UserService.getToken()
			}
		}).then(res => {
			if (res.status !== 200) {
				return null;
			}
			return res.json();
		});
	}

	static create(data) {
		return fetch(environment.apiUrl + '/user', {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		});
	}
	static async follow(followingUserId,followedUserId){
		return fetch(environment.apiUrl + '/user/'+followingUserId+'/follow', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: UserService.getToken()
			},
			body: JSON.stringify({followingUserId:followingUserId,followedUserId:followedUserId})
		})
	}
	static async unfollow(followingUserId,followedUserId){
		return fetch(environment.apiUrl + '/user/'+followingUserId+'/unfollow', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({followingUserId:followingUserId,followedUserId:followedUserId})
		})
	}
	static async checkIfFollow(followingUserId,followedUserId){
		const res = await fetch(environment.apiUrl + '/user/'+followingUserId+'/check', {
			method: 'POST',
			headers: {
				Authorization: UserService.getToken(),
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({followingUserId:followingUserId,followedUserId:followedUserId})
		});
		return res.status
	}
	static login(credentials) {
		return fetch(environment.apiUrl + '/user/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(credentials)
		})
		
	}
	
	static async getPosts(username) {
		const res = await fetch(environment.apiUrl + '/user/' + username + '/posts', {
			headers: {
				Authorization: UserService.getToken()
			}
		});
		// console.log("resShow",res.json())	
		return res.json();
	}

	static async getFollowers(username){
		const res = await fetch(environment.apiUrl + '/user/'+username+'/followers', {
		headers:{
			Authorization: UserService.getToken()
		}
	});
		return res.json()
	}

	static async getLikes(username) {
		const res = await fetch(environment.apiUrl + '/user/' + username + '/likes', {
			headers: {
				Authorization: UserService.getToken()
			}
		});
		// console.log("resShow",res.json())	
		return res.json();
	}

	static async getLikesLength(postId){
		const res = await fetch(environment.apiUrl + '/post/likeslength',{
			headers: {
				Authorization: UserService.getToken(),
				'Content-Type': 'application/json',
			},
			method: 'POST',
			body: JSON.stringify({postId: postId})
		})
		return res.json();
	}
	
	static async get(username) {
		const res = await fetch(environment.apiUrl + '/user/' + username, {
			headers: {
				Authorization: UserService.getToken()
			}
		});
		return res.json();
	}

	static async search(username) {
		const res = await fetch(environment.apiUrl + '/user?username=' + username, {
			headers: {
				Authorization: UserService.getToken()
			}
		});
		return res.json();
	}
	
	static async edit(data){
		return fetch(environment.apiUrl + '/user', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		});
		
	}
	static async getUserData(username,userId){
		const res= await fetch(environment.apiUrl + '/user/getuserdata', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({username: username,userId:userId})
		})
		return res.json();
		
	}
	static async getUserDataById(userId){
		const res= await fetch(environment.apiUrl + '/user/getuserdatabyid', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({userId:userId})
		})
		return res.json();
		
	}
}


