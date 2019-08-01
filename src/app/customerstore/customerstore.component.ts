import { Component, OnInit } from '@angular/core';
import { Web3Service } from "../util/web3.service";
import { ActivatedRoute } from "@angular/router";


@Component({
  selector: 'app-customerstore',
  templateUrl: './customerstore.component.html',
  styleUrls: ['./customerstore.component.css']
})
export class CustomerstoreComponent implements OnInit {

  constructor(private web3Service: Web3Service, private route: ActivatedRoute) { }
  products: any = [];
  productsObjects: any = [];
  auctionProductsObjects: any = [];
  ngOnInit() {
    this.fillProductsObject();
  }
  public initializeMarketplace = async() => {
    this.marketplace = await this.web3Service.getMarketplace();
    this.web3 = await this.web3Service.getWeb3();
    this.account = (await this.web3.eth.getAccounts())[0];
    this.storeId = this.web3.utils.fromUtf8(this.route.snapshot.paramMap.get("storeId"))
    console.log(this.storeId);
  }
  public fillProductsObject = async() => {
    await this.initializeMarketplace();
    this.products = await this.marketplace.methods.getProductsOfStore(this.storeId).call();
    console.log(this.products);
    let arr = [];
    for (const product of this.products) {
    let ar = await this.marketplace.methods.product(product).call();
      arr.push({
        "name": ar.name,
        "quantity": ar.quantity,
        "id": this.web3.utils.toUtf8(product),
        "storeId": this.web3.utils.toUtf8(ar.storeId),
        "value": ar.value
      })
    }
    console.log(this.web3)
    this.productsObjects = arr
    console.log("this.productsObjects:", this.productsObjects);
  }
  public buy = async(productId, value) => {
    console.log("buy productId:", productId)
    const success = await this.marketplace.methods.buyProduct(
        this.web3.utils.fromUtf8(productId),
        1)
        .send({from: this.account, value: value})
    console.log(success) 
    this.fillProductsObject()   
  }
}
