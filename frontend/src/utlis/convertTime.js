const convertTime = (time) => {
  // timeparts will return array
  const timeParts = time.split(":");
  let hours = parseInt(timeParts[0]);
  const minutes = parseInt(timeParts[1]);

  let meridiem = "am";

  if (hours >= 12) {
    meridiem = "pm";
  }

  if (hours > 12) {
    hours -= 12;
  }
  if (hours === 0) {
    hours = 12; // Midnight case
  }

  return `${hours}:${minutes < 10 ? "0" + minutes : minutes} ${meridiem}`;
};
export default convertTime;
