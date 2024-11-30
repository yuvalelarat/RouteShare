export const stringToUrlFormat = (string) => {
    return string.toLowerCase().replace(' ', '-');
};

export function isValidEmail(email) {
    // Regular expression for validating email format
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // Test the email against the regex
    return emailRegex.test(email);
}


