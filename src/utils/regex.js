const userIdRegex = new RegExp("^[a-zA-Z0-9]{4,12}$");
const pwRegex = new RegExp(
  "^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[@$!%*#?&])[A-Za-z0-9@$!%*#?&]{8,16}$"
);
const tenantCodeRegex = new RegExp("^[A-Z0-9]{5}$");
// check alphanumeric chracters of 24 bytes : ^[a-z0-9]{24}$
const checkRegex = {
  userId: (text) => {
    console.log(userIdRegex);
    const isMatched = userIdRegex.test(text);
    return isMatched;
  },
  password: (password) => {
    console.log(pwRegex);
    const isMatched = pwRegex.test(password);
    return isMatched;
  },
  tenantCode: (code) => {
    console.log(tenantCodeRegex);
    const isMatched = tenantCodeRegex.test(code);
    return isMatched;
  },
  userName: (userName) => {
    if (userName.length >= 2 && userName.length <= 20) {
      return true;
    } else {
      return false;
    }
  },
  tenantName: (tenantName) => {
    if (tenantName.length >= 2 && tenantName.length <= 20) {
      return true;
    } else {
      return false;
    }
  },
};

export default checkRegex;
