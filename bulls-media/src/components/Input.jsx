import React from 'react';

const FormInput = ({
	value,
	onChange,
	label,
	placeholder,
	isError,
	errorMessage,
	...props
}) => {
	return (
		<div className='input-wrapper'>
			<label className='label'>{label}</label>
			<input
				className='input'
				placeholder={placeholder}
				value={value}
				onChange={onChange}
				autoComplete='off'
				{...props}
			/>
			{isError && <p className='error-message'>{errorMessage}</p>}
		</div>
	);
};

export default FormInput;
