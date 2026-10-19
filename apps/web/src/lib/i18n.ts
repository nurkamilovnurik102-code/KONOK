import i18n from 'i18next';import {initReactI18next} from 'react-i18next';import ru from '../locales/ru.json';import kg from '../locales/kg.json';import en from '../locales/en.json';
i18n.use(initReactI18next).init({resources:{ru:{translation:ru},kg:{translation:kg},en:{translation:en}},lng:localStorage.getItem('konok_lang')||'ru',fallbackLng:'ru',interpolation:{escapeValue:false}});export default i18n;
export function tr(v:any,lang:string){if(typeof v==='string')return v;return v?.[lang]||v?.ru||v?.en||''}
