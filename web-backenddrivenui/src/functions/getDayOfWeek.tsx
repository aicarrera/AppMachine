export const getDayOfWeek = () => {
    const dayOfWeek = new Date().getDay();
    if (dayOfWeek === 0) {
      return 6; // Sunday
    } else {
      return dayOfWeek - 1; // Monday to Saturday
    }
  }