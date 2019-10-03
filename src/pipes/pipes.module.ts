import { NgModule } from '@angular/core';
import { SearchPipe } from './search/search';
import { SearchwPipe } from './searchw/searchw';
import { SearchmcPipe } from './searchmc/searchmc';

@NgModule({
	declarations: [SearchPipe,
    SearchwPipe,
    SearchmcPipe],
	imports: [],
	exports: [SearchPipe,
    SearchwPipe,
    SearchmcPipe]
})

export class PipesModule {}