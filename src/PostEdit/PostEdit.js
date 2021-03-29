import React,{  useState,useEffect } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { useHistory,useParams } from 'react-router-dom';
import environment from '../environments/index';
import { UserService } from '../services/user.service';
function PostEdit() {
	let {postId}=useParams()
	const history = useHistory();
	let [showImage,setShowImage]=useState(null)
	const [showPreview,setShowPreview]=useState(false)
    const [description,setDescription]=useState("")
	async function submit() {
        const user = await UserService.me();
		try {
			 await fetch(environment.apiUrl + '/postedit', {
				method: 'POST',
				body: JSON.stringify({postId: postId,description:description}),
				headers: {
					Authorization: UserService.getToken(),
                    'Content-Type': 'application/json'
				}
			});
			history.push('/profile/'+user.username);
		} catch(err) {
			console.log(err);
		}
	}


	
	return (
        <div className="d-flex row">
			<div className="col-lg-6 order-sm-0 order-lg-1 my-3">
				<h2 className="PostCreate__title">Edit Post</h2>
				<Formik
					initialValues={{  description: '' }}
					onSubmit={submit}>
					{({ setFieldValue, isSubmitting }) => (
						<Form className="PostCreate__form mt-5 col-lg-8 px-0" noValidate>
							<div className="form-group my-3">
								<label className="form-label" htmlFor="description">Description</label>
								<textarea type="text"  maxlength="50"  className="form-control" name="description" id="description" onChange={event => {setDescription(event.target.value)}}/>
								<ErrorMessage component="small" name="description" className="PostCreate__form__error" />
							</div>
							<div className="form-group text-right my-3">
								<button type="submit"
								        className="mt-3 PostCreate__submit-btn"
										disabled={isSubmitting}>
									{ isSubmitting ? 'Posting...' : 'Post' }
								</button>
							</div>
							<div>
				{showPreview && <img src={'data:; base64,' + showImage} className="Post__image" />}
							</div>
						</Form>
					)}
				</Formik>
			</div>
		</div>
    )
}

export default PostEdit;
