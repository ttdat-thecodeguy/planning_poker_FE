import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GameTableComponent } from './pages/game-table/game-table.component';
import { NewGameComponent } from './pages/new-game/new-game.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

export const routes: Routes = [
  {path : 'dashboard', component: DashboardComponent},
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {path: 'new-game', component: NewGameComponent},
  {path: 'table/:id', component: GameTableComponent},
  {path: '404', component: NotFoundComponent}
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),

  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
