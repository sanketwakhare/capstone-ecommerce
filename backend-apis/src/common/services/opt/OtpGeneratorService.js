const generateOTP = () => {
  const min = 100000;
  const max = 999999;
  return Math.floor(min + Math.random() * (max - min + 1));
};

module.exports = {
  generateOTP,
};
