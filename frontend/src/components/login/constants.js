export const formFields = [
    {
        name: 'email',
        label: 'Email',
        type: 'email',
        helperText: 'Please enter a valid email address',
        validate: (value) => !/\S+@\S+\.\S+/.test(value) // Email validation
    },
    {
        name: 'password',
        label: 'Password',
        type: 'password',
        helperText: 'Password is required',
        validate: (value) => value.trim() === '' // Password validation (empty check)
    }
];
