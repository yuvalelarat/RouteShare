export const formFields = [
    {
        name: 'firstName',
        label: 'First name',
        type: 'text',
        helperText: 'First name is required',
        validate: (value) => !value.trim()
    },
    {
        name: 'lastName',
        label: 'Last name',
        type: 'text',
        helperText: 'Last name is required',
        validate: (value) => !value.trim()
    },
    {
        name: 'email',
        label: 'Email',
        type: 'email',
        helperText: 'Please enter a valid email address',
        validate: (value) => !value.trim() || !/\S+@\S+\.\S+/.test(value)
    },
    {
        name: 'password',
        label: 'Password',
        type: 'password',
        helperText: 'Password is required',
        validate: (value) => !value.trim()
    }
];
