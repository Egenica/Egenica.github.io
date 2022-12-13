// Get the current date and time
export const displayDate = (date: Date) => {
  const updatedDate = new Date(date);
  const currentDate = new Date();
  const difference = currentDate.getTime() - updatedDate.getTime();
  const seconds = Math.floor(difference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);

  if (seconds < 60) {
    return `${seconds} second${seconds > 1 ? '`s' : ''} ago`;
  } else if (minutes < 60) {
    return `${minutes} minute${minutes > 1 ? '`s' : ''} ago`;
  } else if (hours < 24) {
    return `${hours} hour${hours > 1 ? '`s' : ''} ago`;
  } else if (days < 30) {
    return `${days} day${days > 1 ? '`s' : ''} ago`;
  } else if (months < 12) {
    return `${months} month${months > 1 ? '`s' : ''} ago`;
  } else {
    return `${years} year${years > 1 ? '`s' : ''} ago`;
  }
};

// Hyphenate a string
export const hyphenate = (str: string) => {
  return str.replace(/\s+/g, '-').toLowerCase();
};

// Scroll into view
export const scrollIntoView = (city: string) => {
  setTimeout(() => {
    const element = document.getElementById(hyphenate(city));
    element && element.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
  }, 500);
};
