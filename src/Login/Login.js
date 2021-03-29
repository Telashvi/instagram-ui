
import { useState, useContext } from 'react';
import { Form, Formik, Field, ErrorMessage } from 'formik';
import Cookies from 'js-cookie';
import { Link, useHistory } from 'react-router-dom';
import { loginSchema } from './login.schema';
import './Login.scss';
import intro from './intro.png';
import { UserService } from '../services/user.service';
import { UserContext } from '../user-context';

function Login() {
	const history = useHistory();
	const { setUser } = useContext(UserContext);
	const [showError, setShowError] = useState(false);

	async function submit(values) {
		setShowError(false);
		
		const res = await UserService.login(values);
		if (res.status !== 200) {
			setShowError(true);
			return;
		}
		const json = await res.json();
		Cookies.set('instagram-user', json.token, { expires: 30 });

		const user = await UserService.me();
		setUser(user.username);
		history.push('/');
	}

	return (
		<div className="Login d-flex row justify-content-center">
			<div className="col-lg-6 order-sm-0 order-lg-1 my-lg-5">
				<h2 className="Login__title">Login</h2>
				<Formik
					initialValues={{username: '', password: ''}}
					validationSchema={loginSchema}
					onSubmit={submit}>
					{({ isSubmitting }) => (
						<Form className="Login__form mt-5 col-lg-8 px-0" noValidate>
							{ showError && <div className="alert alert-danger">
								Invalid username or password
							</div> }
							<div className="form-group my-3">
								<label htmlFor="username">Username</label>
								<Field className="form-control" id="username" name="username" />
								<ErrorMessage component="small" name="username" className="Login__form__error" />
							</div>
							<div className="form-group my-3">
								<label htmlFor="password">Password</label>
								<Field type="password" className="form-control" name="password" id="password" />
								<ErrorMessage component="small" name="password" className="Login__form__error" />
							</div>
							<div className="form-group my-2 text-right">
								<button type="submit" className="mt-3 Login__submit-btn" disabled={isSubmitting}>Login</button>
							</div>
							<hr className="mt-4" />
							<div className="text-center">
								Don't have an account? <Link to="/register" className="Login__register-link">Register</Link>
							</div>
						</Form>
					)}
				</Formik>
			</div>
			<div className="col-lg-6 order-sm-1 order-lg-0 my-4 my-lg-0 text-end">
				<img src={intro} className="Login__intro-image my-2 mx-3" alt="Instagram" />
			</div>
		</div>
	);
}

export default Login;
