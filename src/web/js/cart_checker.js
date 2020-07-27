class CartChecker {
    static CART_ID = 'cpascher_cart';

    constructor() {
        this._resourceURL;
    }

    get resourceURL() {
        return this._resourceURL;
    }

    computeDiscount(total, callback) {
        let isbnArray = [];
        let cart = Cart.readCart();

        cart.forEach(element => {
            isbnArray.push(element.isbn);
        });

        this._resourceURL = "http://henri-potier.xebia.fr/books/" + isbnArray.join(',') + "/commercialOffers";

        fetch(this._resourceURL)
            .then(response => response.json())
            .then(data => {

                if (data === undefined || data === "") {
                    return;
                }

                let discountSum = 0;

                let totalPct = total;
                let totalMinus = total;
                let totalSlice = total;

                data.offers.forEach(element => {
                    if (element.type === "percentage") {
                        totalPct = total * (1 - element.value / 100);
                    } else if (element.type === "minus") {
                        totalMinus = total - element.value;
                    } else if (element.type === "slice") {
                        totalSlice = (total > element.sliceValue) ? total - Math.floor(total / element.sliceValue) * element.value : total;
                    }
                });

                let minTotal = Math.min(totalPct, totalMinus, totalSlice);

                discountSum = Math.round(total - minTotal, 2);

                if ('function' == typeof callback) {
                    // Trigger callback function on resource found
                    callback.call(this, discountSum);
                }
            });
    }

    displayCart() {

        let cart = Cart.readCart();
        let total = 0;
        let html = '';
        let i = 1;

        cart.forEach(element => {
            html = this.makeArticleLine(element, i);
            total += parseFloat(element.price);

            this.appendHTML(html);
            i++;
        });


        html = this.makeSubTotalLine(total);
        this.appendHTML(html);

        this.computeDiscount(total, function (discountSum) {
            html = this.makeDiscountLine(discountSum);
            this.appendHTML(html);

            total -= discountSum;

            html = this.makeTotalLine(total);
            this.appendHTML(html);
        });

    }

    appendHTML(html) {
        let tableLines = document.querySelector("#table-lines");

        let text = tableLines.innerHTML;
        text += html;

        tableLines.innerHTML = text;

    }

    static clearLines() {
        let tableLines = document.querySelector("#table-lines");
        tableLines.innerHTML = "";
    }

    makeArticleLine(json, index) {

        let cover = "https://dummyimage.com/50x50/55595c/fff";
        let price = json.price;
        let title = json.title;
        let isbn = json.isbn;

        let html = `
        <tr>
            <td><img src="${cover}" /> </td>
            <td>${title}</td>
            <td>En stock</td>
            <td><input class="form-control" type="text" value="1" /></td>
            <td class="text-right">${price}</td>
            <td class="text-right">
                <a href="#" data-index="${index}" class="remove-from-cart-cta btn btn-sm btn-danger">
                    <i data-index="${index}" class="fa fa-trash"></i> 
                </a>
            </td>
        </tr>
        `;

        return html;
    }

    makeSubTotalLine(sum) {
        let html =
            `
        <tr>
            <td></td>
            <td></td>
            <td></td>
            <td>Sous-total</td>
            <td class="text-right">${sum} €</td>
            <td></td>
        </tr>
        `

        return html;

    }

    makeDiscountLine(discountSum) {
        let html =
            `
        <tr>
            <td></td>
            <td></td>
            <td></td>
            <td>Meilleure remise</td>
            <td class="text-right">${discountSum} €</td>
            <td></td>
        </tr>
        `
        return html;

    }

    makeTotalLine(total) {
        let html =
            `
        <tr>
            <td></td>
            <td></td>
            <td></td>
            <td><strong>Total TTC</strong></td>
            <td class="text-right"><strong>${total} €</strong></td>
            <td></td>
        </tr>
        `
        return html;

    }

    static removeFromCart(parent) {
        if (parent === undefined || parent === null) {
            return;
        }

        let button = parent.target;
        let index = parseInt(button.dataset['index']) - 1;

        Cart.removeFromCart(index);

        CartChecker.clearLines();

        let checker = new CartChecker();

        checker.displayCart();
        
        setTimeout(function() {}, 1000);

        checker.attachEvents();
    }


    attachEvents() {
        document.querySelectorAll(".remove-from-cart-cta").forEach(item => {
            item.onclick = function (e) {
                console.log(e.target);

                CartChecker.removeFromCart(e);
            }
        });
    }


}

var checkCart = function () {
    Phink.DOM.ready(function () {
        Cart.printCount();

        let checker = new CartChecker();

        checker.displayCart();
        
        setTimeout(function() {}, 1000);

        checker.attachEvents();

    })


}