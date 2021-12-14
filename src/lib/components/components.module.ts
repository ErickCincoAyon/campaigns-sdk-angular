import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistoryComponent } from './history/history.component';
import { SwiperModule } from 'swiper/angular';

@NgModule({
  declarations: [
    HistoryComponent
  ],
  exports: [
    HistoryComponent
  ],
  imports: [
    CommonModule,
    SwiperModule
  ]
})
export class ComponentsModule { }
