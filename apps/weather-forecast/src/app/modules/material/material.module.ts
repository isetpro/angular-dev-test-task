import { NgModule } from '@angular/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import {MatTableModule} from '@angular/material/table';
import {MatSlideToggleModule} from '@angular/material/slide-toggle'

const material = [
	MatAutocompleteModule,
	MatFormFieldModule,
	MatInputModule,
	MatButtonModule,
	MatToolbarModule,
	MatIconModule,
	MatMenuModule,
	MatTableModule,
	MatSlideToggleModule
];

@NgModule({
	exports: [...material],
})
export class MaterialModule {}
