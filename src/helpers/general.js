const capitalize = (str) => {
    const words = str.split(" ");

    const capitalizedWords = words.map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    });

    return capitalizedWords.join(" ");
};

const formatDate = (timestamp, time = true) => {
  const date = new Date(timestamp);
  const options = time ? { month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', year: 'numeric', hour12: true } : {month: 'long', day: 'numeric', year: 'numeric'};
  return date.toLocaleDateString('en-US', options);
};


export { capitalize, formatDate };
