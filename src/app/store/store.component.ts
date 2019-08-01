import { Component, OnInit } from '@angular/core';
import { Web3Service } from "../util/web3.service";
import { ActivatedRoute } from "@angular/router";
@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {

  constructor(private route: ActivatedRoute, private web3Service: Web3Service) { }

  public products:Array<string>=[];
  public auctions:Array<string>=[];
  marketplace: any;
  account: any;
  web3: any;
  storeId: any;
  productId: any;
  name: any;
  quantity: any;
  value: any;
  

  ngOnInit() {
    this.storeId = this.route.snapshot.paramMap.get("storeId")
    console.log(this.storeId)
    this.fillProductsArray();
    this.fillAuctionProductsArray();
  }

  public initializeMarketplace = async() => {
    this.marketplace = await this.web3Service.getMarketplace();
    this.web3 = await this.web3Service.getWeb3();
    this.account = (await this.web3.eth.getAccounts())[0];
    this.storeId = this.web3.utils.fromUtf8(this.storeId);
  }
  public fillProductsArray = async() => {
    await this.initializeMarketplace();
    const products = await this.marketplace.methods.getProductsOfStore(this.storeId).call();
    console.log(products);
    this.products = products.map(p => this.web3.utils.toUtf8(p));
  }
  public fillAuctionProductsArray = async() => {
    await this.initializeMarketplace();
    const auctions = await this.marketplace.methods.getAuctionProductsOfStore(this.storeId).call();
    console.log(auctions);
    this.auctions = auctions;
  }
  addNewProduct = async() => {
    const success = await this.marketplace.methods
      .addProduct(
        this.web3.utils.toUtf8(this.storeId),
        this.productId,
        this.name,
        this.quantity,
        this.value
        )
      .send({from: this.account})
    console.log(success);
    this.fillProductsArray()
  
  }






}
