import { Component } from "@angular/core";
import { Web3Service } from "./util/web3.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  title = "marketplace";
  web3: any;
  deployed: any;
  constructor(private web3Service: Web3Service, private router: Router) {}
  ngOnInit() {
    this.w3();
  }
  public w3 = async () => {
    this.web3 = await this.web3Service.getWeb3();
    const marketplace = await this.web3Service.getMarketplace();
    console.log(marketplace);
    const owner = await marketplace.methods.owner().call();
    const account = (await this.web3.eth.getAccounts())[0];
    console.log(owner, account);
    const userType = await marketplace.methods.getUserType().call({from: account});
    console.log(userType);
    if(userType == 0) {
      console.log("user is owner");
      this.router.navigate(["/owner"]);
    } else if (userType == 1) {
      console.log("user is admin");
      this.router.navigate(["/admin"]);
    } else if (userType == 2) {
      console.log("user is storeowner");
      this.router.navigate(["/storeowner"]);
    } else if (userType == 3) {
      console.log("user is customer");
      this.router.navigate(["/customer"]);
    }
  }
};
