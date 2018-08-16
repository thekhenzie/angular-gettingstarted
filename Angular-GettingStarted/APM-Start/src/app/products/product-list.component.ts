import { Component, OnInit } from '@angular/core'
import { IProduct } from './product'
import { ProductService } from './product.service';
@Component({
    // selector: 'pm-products',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

    pageTitle: string = 'Product List';
    imageWidth: number = 50;
    imageMargin: number = 2;
    showImage: boolean = false;
    errorMessage: string;
    _listFilter: string;
    get listFilter(): string {
        return this._listFilter;
    }
    set listFilter(value: string) {
        this._listFilter = value;

        this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products;
    }

    filteredProducts: IProduct[];
    products: IProduct[] = [];

    constructor(private productService: ProductService) {
        // this.listFilter = 'cart';
    }
    ngOnInit(): void {
        this.productService.getProduct().subscribe(
            products => {
                this.products = products;
                this.filteredProducts = this.products;
            },
            error => this.errorMessage = <any>error
        );

        console.log('In OnInit');
    }
    toggleImage(): void {
        this.showImage = !this.showImage;
    }

    performFilter(listFilter: string): IProduct[] {
        listFilter = listFilter.toLocaleLowerCase();
        return this.products.filter((product: IProduct) =>
            product.productName.toLocaleLowerCase().indexOf(listFilter) !== -1
        )
    }

    onRatingClicked(event: string): void {
        this.pageTitle = 'Product List: ' + event;
    }

}