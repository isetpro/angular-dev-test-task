import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForecastComponent } from './forecast.component';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { ForecastRoutingModule } from './forecast.routing';

@NgModule({
	declarations: [ForecastComponent],
	imports: [CommonModule, MaterialModule, SharedModule, ForecastRoutingModule],
})
export class ForecastModule {}
