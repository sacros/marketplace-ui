import { Injectable } from "@angular/core";
import contract from "truffle-contract";
import { async } from 'q';
declare let require: any;
const Web3 = require("web3");
const marketplace_artifacts = require('../../assets/Marketplace.json');

declare let window: any;

@Injectable()
export class Web3Service {
  public web3: any;
  public marketplace: any;

  constructor () {
    window.addEventListener("load", event => {
      this.bootstrapWeb3();
    });
  }

  public bootstrapWeb3 = async() => {
      if (window.ethereum) {
        this.web3 = new Web3(window.ethereum);
        try {
          await window.ethereum.enable();
        } catch (error) {
          console.error(error);
        }
      }
      else if (window.web3) {
        this.web3 = new Web3(window.web3.currentProvider);
      }
      else {
        alert("Non-Ethereum browser detected. You should consider trying MetaMask!");
        console.log(
          "Non-Ethereum browser detected. You should consider trying MetaMask!"
        );
      }
  }

  public getWeb3 = async() => {
    if(typeof this.web3 == "undefined") {
      await this.bootstrapWeb3();
    }
    return this.web3;
  }

  public getMarketplace = async() => {
    if(typeof this.marketplace == "undefined") {
      const web3 = this.getWeb3();
      this.marketplace = new this.web3.eth.Contract(
        marketplace_artifacts.abi,
        marketplace_artifacts.networks["4"]["address"]
      )
    }
    return this.marketplace
  }

  // public async artifactsToContract(artifacts) {
  //   if (!this.web3) {
  //     const delay = new Promise(resolve => setTimeout(resolve, 100));
  //     await delay;
  //     return await this.artifactsToContract(artifacts);
  //   }

  //   const contractAbstraction = contract(artifacts);
  //   contractAbstraction.setProvider(this.web3.currentProvider);
  //   return contractAbstraction;
  // }

  // private refreshAccounts() {
  //   this.web3.eth.getAccounts((err, accs) => {
  //     console.log("Refreshing accounts");
  //     if (err != null) {
  //       console.warn("There was an error fetching your accounts.");
  //       return;
  //     }

  //     // Get the initial account balance so it can be displayed.
  //     if (accs.length === 0) {
  //       console.warn(
  //         "Couldn't get any accounts! Make sure your Ethereum client is configured correctly."
  //       );
  //       return;
  //     }

  //     if (
  //       !this.accounts ||
  //       this.accounts.length !== accs.length ||
  //       this.accounts[0] !== accs[0]
  //     ) {
  //       console.log("Observed new accounts");

  //       this.accountsObservable.next(accs);
  //       this.accounts = accs;
  //     }

  //     this.ready = true;
  //   });
  // }
}
