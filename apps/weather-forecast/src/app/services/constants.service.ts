import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ConstantsService {
	readonly DAYS = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
	readonly EVERY_THREE_HOURS = ['03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00', '24:00'];
}
