import { Injectable } from '@angular/core';
import { WeatherForecastApiService } from '@bp/weather-forecast/services';
import { IForecastResponse } from 'libs/weather-forecast/services/src/lib/types';
import { BehaviorSubject } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class ForecastService {
	private readonly forecastForCities = new BehaviorSubject<IForecastResponse[]>([]);
	public readonly forecastForCities$ = this.forecastForCities.asObservable();

	constructor(public weatherForecastService: WeatherForecastApiService) {}

	public addCityToTable(cityName: string) {
		const current = this.forecastForCities.getValue();
		this.weatherForecastService.getForecast(cityName, 7).subscribe(cityData => {
			this.forecastForCities.next([...current, cityData]);
		});
	}

	public searchCity(query: string) {
		return this.weatherForecastService.searchCity(query);
	}
}
