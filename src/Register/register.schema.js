import * as yup from 'yup';

export const registerSchema = yup.object().shape({
	username: yup.string()
		.min(2, 'Username is too short')
		.max(16, 'Username is too long')
		.required('Username is required')
		.test('isUnique', 'Username is already taken', (value) => isUnique('username', value)),
	email: yup.string()
		.email('Email is invalid')
		.required('Email is required')
		.test('isUnique', 'Email is in use', (value) => isUnique('email', value)),
	password: yup.string()
		.min(6, 'Password is too short')
		.max(16, 'Password is too long')
		.required('Password is required'),
	agreeToTerms: yup.mixed().oneOf([true], 'You must agree to terms')
});

const memo = {
	email: {},
	username: {}
};

function isUnique(field, value) {
	if (memo[field].hasOwnProperty(value)) {
		return memo[field][value];
	}
	fetch(environment.apiUrl+`/user/check?${field}=${value}`)
		.then(res => res.json())
		.then(res => {
			memo[field][value] = !res;
			return memo[field][value];
		})
}
