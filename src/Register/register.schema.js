import * as yup from 'yup';
import environment from '../environments/index';
import { UserService } from '../services/user.service';
export const registerSchema = yup.object().shape({
	username: yup.string()
		.min(2, 'Username is too short')
		.max(16, 'Username is too long')
		.required('Username is required')
		.test('isUnique', 'Username is already taken', (value) => isUsernameUnique(value)),
	email: yup.string()
		.email('Email is invalid')
		.required('Email is required')
		.test('isUnique', 'Email is in use', (value) => isEmailUnique(value)),
	password: yup.string()
		.min(6, 'Password is too short')
		.max(16, 'Password is too long')
		.required('Password is required'),
	agreeToTerms: yup.mixed().oneOf([true], 'You must agree to terms')
});

// const memo = {
// 	email: {},
// 	username: {}
// };

// function isUnique(field, value) {
// 	console.log(memo[field][value])
// 	// if (memo[field].hasOwnProperty(value)) {
// 	// 	return memo[field][value];
// 	// }
// 	fetch(environment.apiUrl+`/user/check?${field}=${value}`)
// 		.then(res => res.json())
// 		.then(res => {
// 			memo[field][value] = !res;
// 			return memo[field][value];
// 		})
// }
async function isUsernameUnique(value){
	const result = await UserService.checkUsername(value)
	return result
}

async function isEmailUnique(value){
	const result = await UserService.checkEmail(value)
	return result
}
