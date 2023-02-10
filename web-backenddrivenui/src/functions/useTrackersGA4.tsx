import ReactGA from 'react-ga4';

export const trackevent =  (elementid: string, category: string, label: string, value: number = 1) =>{
    ReactGA.event({ action: elementid.toLowerCase() + "_click", category: category, value: value, label: label });
}