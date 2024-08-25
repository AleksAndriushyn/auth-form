export const baseUrl =
	process.env.NODE_ENV === 'production'
		? 'https://auth-form-ten.vercel.app/'
		: 'http://localhost:3000';
