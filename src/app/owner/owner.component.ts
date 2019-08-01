import { Component, OnInit } from '@angular/core';
import { Web3Service } from "../util/web3.service";

@Component({
  selector: 'app-owner',
  templateUrl: './owner.component.html',
  styleUrls: ['./owner.component.css']
})
export class OwnerComponent implements OnInit {

  constructor(private web3Service: Web3Service) { }
  public addresses:Array<string>=[];
  newAdminAddress: any;
  circuitBreaker:any;
  marketplace: any;
  account: any;
  web3: any;
  removeAdminAddress: any;
  ngOnInit() {
    this.fillAdminArray();
  }
  public initializeMarketplace = async() => {
    this.marketplace = await this.web3Service.getMarketplace();
    this.web3 = await this.web3Service.getWeb3();
    this.account = (await this.web3.eth.getAccounts())[0];
    await this.initializeCircuitBreaker();
  }
  public initializeCircuitBreaker = async() => {
    this.circuitBreaker = await this.marketplace.methods.paused().call();
  }

  public fillAdminArray = async() => {
    await this.initializeMarketplace();
    const admins = await this.marketplace.methods.getAdmins().call();
    console.log(admins);
    this.addresses = admins;
  }
  public addAdmin = async() => {
    console.log("called for ", this.newAdminAddress)
    const success = await this.marketplace.methods
      .addAdmin(this.newAdminAddress)
      .send({from: this.account})
    console.log(success);
    this.fillAdminArray()
  }
  public removeAdmin = async() => {
    console.log("called for ", this.removeAdminAddress)
    const success = await this.marketplace.methods
      .removeAdmin(this.newAdminAddress)
      .send({from: this.account})
    console.log(success);
    this.fillAdminArray()
  }
  public toggleCircuitBreak = async() => {
    let success = "";
    if (!this.circuitBreaker) {
      success = await this.marketplace.methods
        .pause()
        .send({from: this.account})
    } else {
      success = await this.marketplace.methods
        .unpause()
        .send({from: this.account})
    }
    console.log(success);
    this.initializeCircuitBreaker()
  }
  public destruct = async() => {
    const success = await this.marketplace.methods
      .destroy()
      .send({from: this.account})
    console.log(success);
  }
  // 0x0Be00e2491641E26056d24a374c47bc2231962AE
}
