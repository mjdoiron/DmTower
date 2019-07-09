import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './guards/auth/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'home', loadChildren: './pages/home/home.module#HomePageModule', canActivate: [AuthGuard] },
  { path: 'session/:password', loadChildren: './pages/session/session.module#SessionPageModule', canActivate: [AuthGuard] },
  { path: 'session-start/:type', loadChildren: './pages/session-start/session-start.module#SessionStartPageModule', canActivate: [AuthGuard] },
  { path: 'modal-edit-user', loadChildren: './pages/modal-edit-user/modal-edit-user.module#ModalEditUserPageModule', canActivate: [AuthGuard] },
  { path: 'modal-add-player', loadChildren: './pages/modal-add-player/modal-add-player.module#ModalAddPlayerPageModule', canActivate: [AuthGuard] },
  { path: 'modal-avatar-picker', loadChildren: './pages/modal-avatar-picker/modal-avatar-picker.module#ModalAvatarPickerPageModule', canActivate: [AuthGuard] },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}