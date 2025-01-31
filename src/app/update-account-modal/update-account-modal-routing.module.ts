import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateAccountModalPage } from './update-account-modal.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateAccountModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateAccountModalPageRoutingModule {}
