export const validateEmail = (email) => {
    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    // Test if the email matches the regex
    return gmailRegex.test(email);
};
export const validatePassword = (password) => {
    return String(password).length >= 6;
};
