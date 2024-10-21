const  generatePasswordFromUsername = (username) => {
    if (!username || username.length < 3) {
      throw new Error("Username must be at least 3 characters long.");
    }
  
    const randomChars = Math.random().toString(36).slice(-4);
    const specialChars = "!@#$%^&*";
    const randomSpecialChar = specialChars[Math.floor(Math.random() * specialChars.length)];
  
    const basePassword = username.slice(0, 3);
    const generatedPassword = `${basePassword}${randomChars}${randomSpecialChar}`;
  
    return generatedPassword;
  }

  const username = "johnsmith";
  const password = generatePasswordFromUsername(username);

export default generatePasswordFromUsername;
  