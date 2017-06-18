import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';

import { FilterTextboxModule } from './filter-textbox/filter-textbox.module';
import { PaginationModule } from './pagination/pagination.module';

import { CapitalizePipe } from './pipes/capitalize.pipe';
import { TrimPipe } from './pipes/trim.pipe';
import { SortByDirective } from './directives/sortby.directive';

import { ToastComponent } from './toast/toast.component';
import { LoadingComponent } from './loading/loading.component';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    FilterTextboxModule,
    PaginationModule
  ],
  exports: [
    // Shared Modules
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    CommonModule,
    FilterTextboxModule,
    PaginationModule,
    // Shared Components
    ToastComponent,
    LoadingComponent,
    //SharedPipe
    CapitalizePipe,
    TrimPipe,
    SortByDirective
  ],
  declarations: [
    ToastComponent,
    LoadingComponent,
    CapitalizePipe,
    TrimPipe,
    SortByDirective
  ],
  providers: [
    ToastComponent
  ]
})
export class SharedModule { }
