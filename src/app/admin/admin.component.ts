import { Component, OnInit } from '@angular/core';
import { Web3Service } from "../util/web3.service";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private web3Service: Web3Service) { }
  public addresses:Array<string>=[];
  marketplace: any;
  account: any;
  web3: any;
  newStoreOwnerAddress: any;
  removeStoreOwnerAddress: any;
  ngOnInit() {
    this.fillStoreOwnersArray();
  }

  public initializeMarketplace = async() => {
    this.marketplace = await this.web3Service.getMarketplace();
    this.web3 = await this.web3Service.getWeb3();
    this.account = (await this.web3.eth.getAccounts())[0];
  }

  public fillStoreOwnersArray = async() => {
    await this.initializeMarketplace();
    const storeowners = await this.marketplace.methods.getStoreOwners().call();
    console.log(storeowners);
    this.addresses = storeowners;
  }

  public addStoreOwner = async() => {
    console.log("called for ", this.newStoreOwnerAddress)
    const success = await this.marketplace.methods
      .addStoreOwner(this.newStoreOwnerAddress)
      .send({from: this.account})
    console.log(success);
    this.fillStoreOwnersArray()
  }

  public removeStoreOwner = async() => {
    console.log("called for ", this.removeStoreOwnerAddress)
    const success = await this.marketplace.methods
      .removeStoreOwner(this.removeStoreOwnerAddress)
      .send({from: this.account})
    console.log(success);
    this.fillStoreOwnersArray()
  }
}
