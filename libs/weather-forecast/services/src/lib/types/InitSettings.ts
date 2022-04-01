import { Language } from './Language';

export interface ISettings {
	units?: 'imperial' | 'metric' | 'standard';
	language?: Language;
	apiKey: string;
	aqi: 'yes' | 'no';
}
