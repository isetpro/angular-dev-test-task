import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from './modules/material/material.module';
import { SharedModule } from './modules/shared/shared.module';
import { AppRoutingModule } from './app.routing';
import { WeatherForecastServicesModule } from '@bp/weather-forecast/services';

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		SharedModule,
		BrowserAnimationsModule,
		MaterialModule,
		AppRoutingModule,
		WeatherForecastServicesModule,
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
