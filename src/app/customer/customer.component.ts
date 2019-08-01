import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Web3Service } from "../util/web3.service";

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  constructor(private web3Service: Web3Service, private router: Router) { }
  stores: any;
  storesObjects: [];
  ngOnInit() {
    this.fillStoresObject();
  }
  public initializeMarketplace = async() => {
    this.marketplace = await this.web3Service.getMarketplace();
    this.web3 = await this.web3Service.getWeb3();
    this.account = (await this.web3.eth.getAccounts())[0];
  }
  public fillStoresObject = async() => {
    await this.initializeMarketplace();
    this.stores = await this.marketplace.methods.getStores().call();
    console.log(this.stores);
    let arr = [];
    for (const store of this.stores) {
      let ar = await this.marketplace.methods.store(store).call();
      arr.push({"name": ar.name, "owner": ar.owner, "id": this.web3.utils.toUtf8(store)})
    }
    console.log(this.web3)
    this.storesObjects = arr
    console.log("this.storesObjects:", this.storesObjects);
  }
  public products = async(data) => {
    console.log("clicked", data);
    this.router.navigate(["/customer/store", data]);
  }
}
