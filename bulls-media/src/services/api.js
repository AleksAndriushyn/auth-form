import { baseUrl } from './utils.js';

export const sendLogin = async (data) => {
	try {
		const response = await fetch(`${baseUrl}/login.php`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		});
		if (!response.ok) {
			const errorData = await response.json();
			throw new Error(errorData.message || 'Server Error');
		}
		return await response.json();
	} catch (err) {
		throw new Error(err.message || 'Server Error');
	}
};

export const sendRegistration = async (data) => {
	try {
		const response = await fetch(`${baseUrl}/register.php`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		});
		if (!response.ok) {
			const errorData = await response.json();
			throw new Error(errorData.message || 'Server Error');
		}
		return await response.json();
	} catch (err) {
		throw new Error(err.message || 'Server Error');
	}
};

export const sendUpdate = async (data) => {
	try {
		const response = await fetch(`${baseUrl}/update.php`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		});
		if (!response.ok) {
			const errorData = await response.json();
			throw new Error(errorData.message || 'Server Error');
		}
		return await response.json();
	} catch (err) {
		throw new Error(err.message || 'Server Error');
	}
};
