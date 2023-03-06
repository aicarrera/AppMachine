import ReactGA from 'react-ga4';

export const trackevent =  async (elementid: string, category: string, label: string, value: number = 1) =>{
   await ReactGA.event({ action: elementid.toLowerCase() + "_click", category: category, value: value, label: label });
}