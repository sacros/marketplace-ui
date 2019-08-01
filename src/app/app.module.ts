import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OwnerComponent } from './owner/owner.component';
import { AdminComponent } from './admin/admin.component';
import { StoreownerComponent } from './storeowner/storeowner.component';
import { StoreComponent } from './store/store.component';
import { CustomerComponent } from './customer/customer.component';
import { CustomerstoreComponent } from './customerstore/customerstore.component';
import { Web3Service } from './util/web3.service';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    OwnerComponent,
    AdminComponent,
    StoreownerComponent,
    StoreComponent,
    CustomerComponent,
    CustomerstoreComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [Web3Service],
  bootstrap: [AppComponent]
})
export class AppModule { }
