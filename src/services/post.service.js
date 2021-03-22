
import { UserService } from './user.service';
import environment from '../environments/index';

export class PostService {
	static comment(postId,textToSend){
		return fetch(environment.apiUrl+'/post/'+postId+'/comment',{
			headers: { 
				Authorization: UserService.getToken(),
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({content: textToSend}),
			method: 'PUT'
		})//.then(res => res.json());
	}

	static async addComment(postId, content) {
		const res = await fetch(environment.apiUrl + '/post/' + postId + '/comment', {
			method: 'PUT',
			headers: {
				Authorization: UserService.getToken(),
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ content })
		});
		return res.json();
	}

	static async getCommentData(commentId){
		const res = await fetch(environment.apiUrl+'/post/comment',{
			method: 'POST',
			headers: {
				Authorization: UserService.getToken(),
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ commentId })
		});
		return res.json()
	}
	
	static async deleteComment(commentId,CommentRecivedFrom) {
		return fetch(environment.apiUrl + '/post/comment', {
			headers: {
				Authorization: UserService.getToken(),
				'Content-Type': 'application/json',
			},
			method: 'DELETE',
			body: JSON.stringify({ commentId: commentId,CommentRecivedFrom:CommentRecivedFrom })

		})//.then(res => res.json())
	}
	
	static async getComments(postId){
		const res = await fetch(environment.apiUrl+'/post/'+postId+'/comment',{
			headers: {
				Authorization: UserService.getToken(),
			},
		});
		return res.json();
	}
	static feed() {
		return fetch(environment.apiUrl + '/post?sort=-1', {
			headers: { 
				Authorization: UserService.getToken()
			}
		}).then(res => res.json());
	}

	static like(postId,username,LoggedInUser) {
		return fetch(environment.apiUrl + '/post/givelike', {
			headers: { // מה זה Authorization, 'Content-Type', body JSON.stringify, .then(res => res.json()); 
				Authorization: UserService.getToken(),
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ postId: postId,username:username,LoggedInUser:LoggedInUser }),
			method: 'POST'
		}).then(res => res.json());
	}
	static unlike(postId,LikeRecivedFrom) {
		return fetch(environment.apiUrl + '/post/likes', {
			headers: {
				Authorization: UserService.getToken(),
				'Content-Type': 'application/json',
			},
			method: 'DELETE',
			body: JSON.stringify({ postId: postId,LikeRecivedFrom:LikeRecivedFrom })

		}).then(res => res.json())
	}
	static checkIfLiked(postId,gaveLikeTo,LikeRecivedFrom){
		return fetch(environment.apiUrl+ '/post/likes', {
		headers: { 
			Authorization: UserService.getToken(),
			'Content-Type': 'application/json',
		},
		method: 'POST',
		body: JSON.stringify({gaveLikeTo:gaveLikeTo,LikeRecivedFrom:LikeRecivedFrom,postId: postId})
		}).then(res => {
			if (res.status !== 200) {
				return null;
			}
			
			return res.status
		});
	}

	
	static async get(id) {
		const res = await fetch(environment.apiUrl + '/post/' + id, {
			headers: { 
				Authorization: UserService.getToken()
			}
		});
		return res.json();
	}

}
