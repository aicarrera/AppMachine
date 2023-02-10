
export const useTimeLabel = () => {
    const currentHour = new Date().getHours();
    console.log(currentHour)
    if (currentHour >= 8 && currentHour <= 13) {
      return 'T1';
    } else if (currentHour >= 14 && currentHour <= 19) {
      return 'T2';
    } else {
      return 'T2';
    }

  
}