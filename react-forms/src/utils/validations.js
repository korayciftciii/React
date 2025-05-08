export function validateEmail(email) {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
}
export function isNotEmpty(value) {

    return value.trim() !== '';
}
export function hasMinLength(value, minLength) {

    return value.length >= minLength;
}
export function isEquals(value, valueToCompare) {
    return value === valueToCompare;
}