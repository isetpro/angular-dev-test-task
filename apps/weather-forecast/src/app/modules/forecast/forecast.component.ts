import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ISearchResponseData, IForecastResponse } from 'libs/weather-forecast/services/src/lib/types';
import {
	Observable,
	debounceTime,
	distinctUntilChanged,
	mergeMap,
	map,
	filter,
	BehaviorSubject,
	Subject,
	takeUntil,
} from 'rxjs';
import { ConstantsService } from '../../services/constants.service';
import { ForecastService } from './forecast.service';

@Component({
	selector: 'bp-forecast',
	templateUrl: './forecast.component.html',
	styleUrls: ['./forecast.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForecastComponent implements OnInit, OnDestroy {
	private readonly destroyed$ = new Subject<void>();
	form = new FormGroup({
		cityName: new FormControl(null),
		showDaily: new FormControl(false),
	});

	private readonly filteredCities = new BehaviorSubject<ISearchResponseData[]>([]);
	filteredCities$ = this.filteredCities.asObservable();
	forecast$: Observable<IForecastResponse> | undefined;

	readonly hourlyColumns = ['cityName', ...this.hours.map(h => h.text)];
	readonly dailyColumns = ['cityName', ...this.days];

	readonly tableData$ = this.weatherService.forecastForCities$.pipe(
		map(cities => (cities.length ? cities : null)),
		takeUntil(this.destroyed$)
	);

	get days(): string[] {
		const indexOfNow = new Date().getDay() - 1;
		return [...this.constants.DAYS.slice(indexOfNow), ...this.constants.DAYS.slice(0, indexOfNow)];
	}

	get hours(): { text: string; index: number }[] {
		return this.constants.EVERY_THREE_HOURS.map((text, i) => ({ text, index: i + 2 * (i + 1) }));
	}

	get cityNameControl(): FormControl {
		return this.form.get('cityName') as FormControl;
	}
	get showDailyControl(): FormControl {
		return this.form.get('showDaily') as FormControl;
	}

	constructor(private weatherService: ForecastService, private constants: ConstantsService) {}

	ngOnInit(): void {
		this.cityNameControl.valueChanges
			.pipe(
				filter(v => !!v),
				debounceTime(500),
				distinctUntilChanged(),
				mergeMap(query => this.weatherService.searchCity(query)),
				takeUntil(this.destroyed$)
			)
			.subscribe(v => this.filteredCities.next(v));
	}

	ngOnDestroy(): void {
		this.destroyed$.next();
		this.destroyed$.complete();
	}

	onAdd() {
		this.weatherService.addCityToTable(this.cityNameControl.value);
	}

	resetSearch() {
		this.cityNameControl.reset();
		this.filteredCities.next([]);
	}
}
