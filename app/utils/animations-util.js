const animationsUtil = {
  counter,
};

function counter(number) {
  const speed = 200;
  let count = 0;

  // console.log("number", number);

  const increment = number / speed;

  const interval = setInterval(() => {
    if (count < number) {
      // console.log("count", count);
      count += increment;
    } else {
      clearInterval(interval);
      return number;
    }
  }, 10);
}

export default animationsUtil;
