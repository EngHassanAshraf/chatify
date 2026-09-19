const NAME_REGEX = /^[A-Za-z]+(?:[ '-][A-Za-z]+)+$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_REGEX =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,20}$/;


export const validatefullname = (fullname) => {
    const name = fullname.trim();
    return (
        name.length >= 7 &&
        name.length <= 50 &&
        NAME_REGEX.test(name)
    );
}

export const validateEmail = (email) => {
    return EMAIL_REGEX.test(email.trim());
}

export const validatePassword = (password) => {
    return PASSWORD_REGEX.test(password);
}