import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; // CLI imports router

const routes: Routes = [
	{
		path: '',
		redirectTo: 'forecast',
	},
	{
		path: 'forecast',
		loadChildren: () => import('./modules/forecast/forecast.module').then(m => m.ForecastModule),
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
