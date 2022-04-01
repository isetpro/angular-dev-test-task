import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IQueryType, ISearchResponseData, ISettings, IForecastResponse } from './types';
import { EMPTY, Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class WeatherForecastApiService {
	private settings: ISettings = {
		apiKey: '9728493d224a47e7970175107223103',
		language: 'en',
		units: 'metric',
		aqi: 'no',
	};

	private readonly BASE_URL = 'http://api.weatherapi.com/v1/';

	constructor(private http: HttpClient) {}

	private buildURL(queryType: IQueryType, query: string, days?: number) {
		const { BASE_URL, settings } = this;

		return `${BASE_URL + queryType}.json?${query}&key=${settings.apiKey}&units=${settings.units}&lang=${
			settings.language
		}&days=${days?.toString() ?? 1}`;
	}

	public searchCity(query: string) {
		if (!query) {
			return of([]);
		}
		return this.http.get<ISearchResponseData[]>(this.buildURL('search', `q=${query}`));
	}

	public getCurrentWeather(query: string) {
		if (!query) {
			return of([]);
		}
		return this.http.get<ISearchResponseData[]>(this.buildURL('current', `q=${query}`));
	}

	public getForecast(query: string, days = 1): Observable<IForecastResponse> {
		if (!query) {
			return EMPTY;
		}
		return this.http.get<IForecastResponse>(this.buildURL('forecast', `q=${query}`, days));
	}
}
