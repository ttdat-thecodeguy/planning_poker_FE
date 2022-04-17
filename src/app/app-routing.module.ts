import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GameTableComponent } from './components/game-table/game-table.component';
import { NewGameComponent } from './components/new-game/new-game.component';
import { DashboardComponent } from './components/templates/dashboard/dashboard.component';

export const routes: Routes = [
  {path : 'dashboard', component: DashboardComponent},
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {path: 'new-game', component: NewGameComponent},
  {path: ':id', component: GameTableComponent}
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),

  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
