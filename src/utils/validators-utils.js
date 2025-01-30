export function isValidEmail(email) {
  const reg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return reg.test(email);
}

export function isSecurePassword(password) {
  const reg =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&^#\(\)_=\-\+])[a-zA-Z\d@$!%*?&^#\(\)_=\-\+]{8,}/;
  return reg.test(password);
}

export function isValidName(name) {
  const reg = /^[a-zA-Z]{2,}$/;
  return reg.test(name);
}

export function isValidPhoneNumber(phoneNumber) {
  const reg = /^\d{8,15}$/;
  return reg.test(phoneNumber);
}
