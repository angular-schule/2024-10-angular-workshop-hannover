import { Routes } from '@angular/router';

import { OverviewComponent } from './overview/overview.component';
import { FromeventComponent } from './fromevent/fromevent.component';
import { TypeaheadComponent } from './typeahead/typeahead.component';
import { MulticastComponent } from './multicast/multicast.component';
import { HigherorderComponent } from './higherorder/higherorder.component';
import { GamescoreComponent } from './gamescore/gamescore.component';
import { ChatComponent } from './chat/chat.component';
import { ErrorhandlingComponent } from './errorhandling/errorhandling.component';
import { UnsubscribeComponent } from './unsubscribe/unsubscribe.component';
import { DragdropComponent } from './dragdrop/dragdrop.component';
import { CreatingComponent } from './creating/creating.component';
import { RatelimitingComponent } from './ratelimiting/ratelimiting.component';
import { AsyncpipeComponent } from './asyncpipe/asyncpipe.component';
import { StockComponent } from './stock/stock.component';

export const exercisesRoutes: Routes = [
  { path: 'exercises', children: [
    { path: '', component: OverviewComponent },
    { path: 'creating', component: CreatingComponent },
    { path: 'fromevent', component: FromeventComponent },
    { path: 'gamescore', component: GamescoreComponent },
    { path: 'multicast', component: MulticastComponent },
    { path: 'errorhandling', component: ErrorhandlingComponent },
    { path: 'unsubscribe', component: UnsubscribeComponent },
    { path: 'chat', component: ChatComponent },
    { path: 'higherorder', component: HigherorderComponent },
    { path: 'typeahead', component: TypeaheadComponent },
    { path: 'dragdrop', component: DragdropComponent },
    { path: 'ratelimiting', component: RatelimitingComponent },
    { path: 'asyncpipe', component: AsyncpipeComponent },
    { path: 'stock', component: StockComponent }
  ] }
];
