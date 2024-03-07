const getGreeting = () => {
  var date = new Date();
  const hour = date.getHours();
  if (hour < 12) {
    return "Good Morning!";
  } else if (hour < 17) {
    return "Good Afternoon!";
  } else {
    return "Good Evening!";
  }
};

export default getGreeting;
