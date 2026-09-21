const NAME_REGEX = /^[A-Za-z]+(?:[ '-][A-Za-z]+)+$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_REGEX =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,20}$/;


export const validatefullname = (fullname) => {
    if (typeof fullname === "string") {
        const name = fullname.trim();
        return (
            name.length >= 7 &&
            name.length <= 50 &&
            NAME_REGEX.test(name)
        );
    }
    return false;
}

export const validateEmail = (email) => {
    if (typeof email === "string") {
        return EMAIL_REGEX.test(email.trim());
    }
    return false;
}

export const validatePassword = (password) => {
    return typeof password === "string" && PASSWORD_REGEX.test(password);
}