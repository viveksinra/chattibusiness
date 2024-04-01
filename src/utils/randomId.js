export const  generateRandomId = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const minLength = 5; // Set your desired minimum length
    const maxLength = 15; // Set your desired maximum length
    const idLength = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;
  
    let randomId = '';
    for (let i = 0; i < idLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomId += characters.charAt(randomIndex);
    }
  
    return randomId;
  }

  export const generateRandomMessageId = () => {
    const now = new Date();
    const year = now.getFullYear().toString().slice(-2);
    const month = padZero(now.getMonth() + 1);
    const day = padZero(now.getDate());
    const hours = padZero(now.getHours());
    const minutes = padZero(now.getMinutes());
    const seconds = padZero(now.getSeconds());
    const randomNum = getRandomInt(100, 999);

    return year + month + day + hours + minutes + seconds + randomNum;
  };

  const padZero = (value) => {
    return value < 10 ? '0' + value : value;
  };

  const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };