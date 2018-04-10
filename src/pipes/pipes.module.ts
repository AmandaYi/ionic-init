import { NgModule } from '@angular/core';
import { RydDatePipe } from './ryd-date/ryd-date';
import { RydNumPipe } from './ryd-num/ryd-num';
@NgModule({
	declarations: [RydDatePipe,
    RydNumPipe],
	imports: [],
	exports: [RydDatePipe,
    RydNumPipe]
})
export class PipesModule {}
