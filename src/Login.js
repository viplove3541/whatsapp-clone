import React from 'react';
import './Login.css';
import { Button } from '@mui/material';
import { auth, provider } from "./firebase";
import { useStateValue } from "./StateProvider";
import { actionTypes } from "./reducer";

function Login() {

    const [,dispatch] = useStateValue();

	const signIn = () => {
		auth.signInWithPopup(provider)
			.then((result) => {
				dispatch({
					type: actionTypes.SET_USER,
					user: result.user,
				});
			})
			.catch((err) => {
				alert(err);
				console.log(err);
			});
	};

    return (
        <div className="login">
            <div className="login__container">
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/800px-WhatsApp.svg.png"
                    alt="whatsapp img"
                />
                <div className="login__text">
                    <h1>Sign in to whatsapp</h1>
                </div>
                <Button type='submit' onClick={signIn}>
                    Sign In With Gmail
                </Button>
            </div>
        </div>
    );
}

export default Login;