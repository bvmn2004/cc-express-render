export class Product {
    constructor(
        public id: number | null,
        public name: string,
        public price: number,
        public description: string
    ) { }

    // validate() {
    //     if (!this.name || this.name.length < 3) {
    //         throw new Error("Product name must be at least 3 characters.");
    //     }
    //     if (this.price <= 0) {
    //         throw new Error("Product price must be greater than 0.");
    //     }
    // }
}