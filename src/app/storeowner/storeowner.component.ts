import { Component, OnInit } from '@angular/core';
import { Web3Service } from "../util/web3.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-storeowner',
  templateUrl: './storeowner.component.html',
  styleUrls: ['./storeowner.component.css']
})
export class StoreownerComponent implements OnInit {

  constructor(private web3Service: Web3Service, private router: Router) { }
  public availableBalance:number = 0;
  public stores:Array<string>=[];
  marketplace: any;
  account: any;
  web3: any;
  newStoreName: any;
  newStoreId: any;
  ngOnInit() {
    this.fillStoresOfOwners();    
  }
  public initializeMarketplace = async() => {
    this.marketplace = await this.web3Service.getMarketplace();
    this.web3 = await this.web3Service.getWeb3();
    this.account = (await this.web3.eth.getAccounts())[0];
    await this.getBalance()
  }
  public fillStoresOfOwners = async() => {
    await this.initializeMarketplace();
    const stores = await this.marketplace.methods.getStoresOfOwners(this.account).call();
    console.log(stores);
    this.stores = stores.map(store => this.web3.utils.toUtf8(store));
  }
  public addStore = async() => {
    console.log("called for ", this.newStoreId, this.newStoreName)
    const success = await this.marketplace.methods
      .addStore(this.newStoreId, this.newStoreName)
      .send({from: this.account})
    console.log(success);
    this.fillStoresOfOwners()
  }
  public yo(data) {
    console.log("clicked", data);
    this.router.navigate(["/storeowner/store", data]);
  }
  public getBalance = async() => {
    this.availableBalance = await this.marketplace.methods.balances(this.account).call()
  }

}
