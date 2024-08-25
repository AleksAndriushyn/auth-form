import { useState } from 'react';
import './App.css';
import { sendLogin, sendRegistration, sendUpdate } from './services/api';
import FormInput from './components/Input';

function App() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [isLogin, setIsLogin] = useState(false);
	const [passwordError, setPasswordError] = useState(false);
	const [error, setError] = useState('');
	const [emailError, setEmailError] = useState(false);
	const [newEmail, setNewEmail] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [newEmailError, setNewEmailError] = useState(false);
	const [newPasswordError, setNewPasswordError] = useState(false);
	const [success, setSuccess] = useState('');
	const [user, setUser] = useState(null);

	const handleLogin = async () => {
		try {
			const data = { email, password };
			const response = await sendLogin(data);
			setSuccess(response.message);
			setUser(response.user);
		} catch (err) {
			setError(err.message);
		}
	};

	const handleRegistration = async () => {
		try {
			const data = { email, password };
			const response = await sendRegistration(data);
			setSuccess(response.message);
			setUser(response.user);
		} catch (err) {
			setError(err.message);
		}
	};

	const handleUpdate = async () => {
		try {
			const data = {
				email,
				password,
				new_email: newEmail,
				new_password: newPassword,
			};
			const response = await sendUpdate(data);
			setSuccess(response.message);
			setUser(response.user);
		} catch (err) {
			setError(err.message);
		}
	};

	const onSubmit = (e) => {
		e.preventDefault();

		setError('');
		setSuccess('');

		if (!emailError && !passwordError) {
			if (isLogin) {
				handleLogin();
			} else if (user && !newEmailError && !newPasswordError) {
				handleUpdate();
			} else {
				handleRegistration();
			}
		}
	};

	const validateEmail = (email) => {
		const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailPattern.test(email);
	};

	const validatePassword = (password) => {
		const passwordPattern =
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,20}$/;
		return (
			passwordPattern.test(password) &&
			!/^[!@#$%^&*]/.test(password) &&
			!/[!@#$%^&*]$/.test(password)
		);
	};

	const handleEmailChange = (e) => {
		const email = e.target.value;
		setEmail(email);
		setEmailError(!validateEmail(email));
	};

	const handlePasswordChange = (e) => {
		const password = e.target.value;
		setPassword(password);
		setPasswordError(!validatePassword(password));
	};

	const handleNewEmailChange = (e) => {
		const newEmail = e.target.value;
		setNewEmail(newEmail);
		setNewEmailError(!validateEmail(newEmail));
	};

	const handleNewPasswordChange = (e) => {
		const newPassword = e.target.value;
		setNewPassword(newPassword);
		setNewPasswordError(!validatePassword(newPassword));
	};

	const goToForm = () => {
		setError('');
		setEmailError(false);
		setPasswordError(false);
		setEmail('');
		setPassword('');
		setIsLogin(!isLogin);
	};

	return (
		<div className='user-form'>
			<h1>
				{user ? 'Admin Panel' : isLogin ? 'Login' : 'Registration' + ' Form'}
			</h1>
			{user && <h3>Email: {user.email}</h3>}
			<form className='form' onSubmit={onSubmit}>
				{!user && (
					<FormInput
						label='Email'
						placeholder='Email'
						value={email}
						onChange={handleEmailChange}
						type='email'
						id='email'
						required
						isError={emailError}
						errorMessage='Please enter a valid email address'
					/>
				)}
				<FormInput
					label='Password'
					placeholder={(user ? 'Old ' : '') + 'Password'}
					value={password}
					onChange={handlePasswordChange}
					type='password'
					id='password'
					required
					minLength={6}
					maxLength={20}
					isError={passwordError}
					errorMessage='At least 1 small letter, 1 capital letter, 1 number, 1 special
							character. A special character cannot be at the beginning and at the
							end'
				/>
				{user && (
					<>
						<FormInput
							label='New Email'
							placeholder='New Email'
							value={newEmail}
							onChange={handleNewEmailChange}
							type='email'
							id='new-email'
							required
							isError={newEmailError}
							errorMessage='Please enter a valid email address'
						/>
						<FormInput
							label='New Password'
							placeholder='New Password'
							value={newPassword}
							onChange={handleNewPasswordChange}
							type='password'
							id='new-password'
							required
							minLength={6}
							maxLength={20}
							isError={newPasswordError}
							errorMessage='At least 1 small letter, 1 capital letter, 1 number, 1 special
							character. A special character cannot be at the beginning and at the
							end'
						/>
					</>
				)}
				<div className='btn-wrapper'>
					{!user && (
						<button className='go-btn' type='button' onClick={goToForm}>
							Go To {isLogin ? 'Register' : 'Login'}
						</button>
					)}
					<div className='submit-wrapper'>
						{success && <p className='success-message tac'>{success}</p>}
						{error && <p className='error-message tac'>{error}</p>}
						<button type='submit'>Submit</button>
					</div>
				</div>
			</form>
		</div>
	);
}

export default App;


