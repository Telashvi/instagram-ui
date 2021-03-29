import { Formik, Form, Field, ErrorMessage } from 'formik';
import { profileedit } from './profileedit.schema';
import React, { useEffect, useState,useContext } from 'react';
import { UserService } from '../../services/user.service';
import avatarDefault from '../../common/Avatar/avatar.jpg';
import './ProfileEdit.scss';
import { UserContext } from '../../user-context';
import Cookies from 'js-cookie';
function ProfileEdit() {
	const { setUser, user } = useContext(UserContext);
      const [showSuccess, setSuccess] = useState(false);
	  const [currentUser,setCurrentUser] = useState("")
      async function getUser(){
            const user = await UserService.me();
            const userData = await UserService.getUserData(user.username)
            setUserData(userData);
			console.log(userData)
			setCurrentUser(user.username)
      }
      const [userData,setUserData]=useState({})
      useEffect(() => {
            getUser();
      }, []);
      
      const [editIt,setEditIt] = useState(false)
      const[username ,setUsername] = useState("");
      const[password ,setPassword] = useState("");
      const[bio ,setBio] = useState("");
      const [email,setEmail]=useState("")
      const [showImage,setShowImage]=useState("")
      let [values,setValues]=useState({})
      useEffect(() => {
            setUsername(userData.username)
            setEmail(userData.email)
            setBio(userData.bio)
            setPassword("Same as current")
			setShowImage(userData.avatar)
      },[userData])
      useEffect(() => {
		let avatar=""
		if (avatarDefault.includes("jpeg")) {
			avatar=avatarDefault.replace("data:image/jpeg;base64,","");
			setShowImage(avatar)}
	},[userData])
		
    	 function submit(){
            if (password==="Same as current"){
                  setValues({
						currentUser:currentUser,
                        username : username,
                        password : userData.password,
                        bio:bio,
                        email:email,
						avatar: showImage
                  })
				  
                  setEditIt(true)
				  setEditIt(false)
            } if (password!=="Same as current") {
                  setValues({
						currentUser:currentUser,
                        username : username,
                        password : password,
                        bio:bio,
                        email:email
                  })
				  setEditIt(true)
				  setEditIt(false)
            }  
      }
      
	  useEffect(() => {
		UserService.edit(values)
		console.log(username)
		setUser(username)
		let toSend={username:username,password:userData.password}
		if (password!=="Same as current"){
			 toSend={username:username,password:password}
		}
		async function reCred(toSend) {
			console.log("toSend:",toSend)
			const res = await UserService.editLogin(toSend);
			// if (res.status !== 200) {
			// 	setShowError(true);
			// 	return;
			// }
			const json = await res.json();
			Cookies.remove('instagram-user');
			Cookies.set('instagram-user', json.token, { expires: 30 });
			
			// const user = await UserService.me();
			// setUser(user.username);
			// history.push('/');
		}
		reCred(toSend)
		console.log("setUser is now:",user)
	  },[editIt])

	  useEffect(() => {
		console.log(username)
		// setUser(username)
		console.log("setUser is now:",user)
	  },[username])
      function encodeImageFileAsURL(element) {
		return new Promise((res, rej) => { 
			var file = element.target.files[0];
			var reader = new FileReader();
			reader.onloadend = () => {
				console.log(reader)
				res(reader.result)
			}
			reader.readAsDataURL(file);

		})
	  }
     
	return (
	// 	<div>
      //       Edit username:<input type="text" value={username} onChange={event => setUsername(event.target.value)} />
      //      {changePassword &&<div> Edit password:<input type="text" value={password}  onChange={event => setPassword(event.target.value)} /></div>}
      //      <div> Edit email:<input type="text" value={email} onChange={event => setEmail(event.target.value)} /></div>
      //      <div> Edit bio: <input type="text" maxLength="1000" value={bio} onChange={event => setBio(event.target.value)} /></div>
      //      <div> Edit avatar:</div>
      //      <button onClick={submit}>submit</button>
      //      <button onClick={togglePassword}>Change password?</button>
      //   </div>
        <div className="Register d-flex justify-content-center">
			<div className="col col-lg-4 my-5">
				<div className="text-center">
					<h2 className="Register__title">Edit</h2>
					<h3 className="Register__subtitle">It's quick and easy</h3>
				</div>
				<Formik
                              enableReinitialize={true}
					initialValues={{username: username, password: password, email: email, Bio:bio }}
					validationSchema={profileedit}
					validateOnChange={true}
					onSubmit={submit}>
					{({ setFieldValue,isSubmitting }) => (
						<Form className="Register__form mt-5 px-0" noValidate>
							<div className="form-group my-3">
								<label htmlFor="username">Username</label>
								<Field type="username" className="form-control" id="username" name="username" onChange={event => {setUsername(event.target.value) }}  />
								<ErrorMessage component="small" name="username" className="Register__form__error" />
							</div>
							<div className="form-group my-3">
								<label htmlFor="email">Email</label>
								<Field type="email" className="form-control" id="email" name="email" onChange={event => setEmail(event.target.value)} />
								<ErrorMessage component="small" name="email" className="Register__form__error" />
							</div>
							 <div className="form-group my-3">
								<label htmlFor="password">Password</label>
								 <Field  className="form-control" name="password" id="password" onChange={event => setPassword(event.target.value)} />
								<ErrorMessage component="small" name="password" className="Register__form__error" />
							</div>
                                          <div className="form-group my-3">
								<label htmlFor="Bio">Bio</label>
								<Field type="Bio" className="form-control" name="Bio" id="Bio"  onChange={event => setBio(event.target.value)}  />
								<ErrorMessage component="small" name="Bio" className="Register__form__error" />
							</div>
                                          <div className="form-group my-3">Avatar
								<input type="file"
								       id="image"
								       name="image"
								       className="form-control"
								       onChange={async (e) =>{ setFieldValue('image', e.target.files[0])
									   let imageString=await encodeImageFileAsURL(e)
									   if (imageString.includes("png")) imageString = imageString.replace("data:image/png;base64,","");
									   if (imageString.includes("jpeg")) imageString=imageString.replace("data:image/jpeg;base64,","");
									   setShowImage(imageString)
									   }}/>
								<ErrorMessage component="small" name="image" className="PostCreate__form__error" />
							</div>
							Small:
                                          <img src={'data:; base64,' + showImage} className="Avatar Avatar--md"  />
										  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
										  Large:
										  <img src={'data:; base64,' + showImage} className="Avatar Avatar--lg"  />
							{/* <button className="mt-3 Register__submit-btn" onClick={togglePassword}>Change password?</button> */}
							{/* <div className="form-group my-3">
								{ showSuccess
									? <div className="alert alert-success Register__success"><b>Success!</b> Wait for transfer...</div>
									: <button type="submit" className="mt-3 Register__submit-btn" disabled={isSubmitting}>Submit</button>
								}
							</div> */}
                                          <div className="form-group my-3">
                                          <button  type="submit" className="mt-3 Register__submit-btn" >Submit</button>
							</div>
						</Form>
					)}
				</Formik>
			</div>
		</div>
	);
}

export default ProfileEdit;
