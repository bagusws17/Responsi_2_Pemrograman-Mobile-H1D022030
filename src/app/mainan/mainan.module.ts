import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MainanPageRoutingModule } from './mainan-routing.module';

import { MainanPage } from './mainan.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MainanPageRoutingModule
  ],
  declarations: [MainanPage]
})
export class MainanPageModule {}
