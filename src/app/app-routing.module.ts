import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OwnerComponent } from './owner/owner.component';
import { AdminComponent } from './admin/admin.component';
import { StoreownerComponent } from './storeowner/storeowner.component';
import {StoreComponent} from './store/store.component';
import { CustomerComponent } from './customer/customer.component';
import {CustomerstoreComponent} from './customerstore/customerstore.component';
import {AppComponent} from './app.component';


const routes: Routes = [
  { path: 'owner', component: OwnerComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'customer', component: CustomerComponent },
  { path: 'customer/store/:storeId', component: CustomerstoreComponent },
  { path: 'storeowner',component: StoreownerComponent},
  { path:'storeowner/store/:storeId', component: StoreComponent},
  { path: '', component: AppComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
