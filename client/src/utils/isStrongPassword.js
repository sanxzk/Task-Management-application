const isStrongPassword = (password) => {
  let hasUpperCase = /[A-Z]/.test(password);
  let hasLowerCase = /[a-z]/.test(password);
  let hasNumbers = /\d/.test(password);
  let hasSpecialChars = /[^A-Za-z0-9]/.test(password);
  let isEightChars = password.length >= 8;

  if (
    !hasUpperCase ||
    !hasLowerCase ||
    !hasNumbers ||
    !hasSpecialChars ||
    !isEightChars
  ) {
    return false;
  }
  return true;
};

export default isStrongPassword;
