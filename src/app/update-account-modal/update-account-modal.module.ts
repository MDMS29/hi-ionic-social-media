import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateAccountModalPageRoutingModule } from './update-account-modal-routing.module';

import { UpdateAccountModalPage } from './update-account-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdateAccountModalPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [UpdateAccountModalPage]
})
export class UpdateAccountModalPageModule { }
