class Cart 
{
    static CART_ID = 'cpascher_cart';

    constructor() {

    }

    static get count() {
        let result = 0;

        let json = Cart.readCart();

        result = (json !== '') ? json.length : 0;

        return result;
    }

    static readCart() {
        let cart = Cookies.read(Cart.CART_ID);
        let json = (cart !== '') ? JSON.parse(cart) : [];
        
        return json;

    }

    static addToCart(parent) {
        if (parent === undefined || parent === null) 
        {
            return;
        }
        
        let button = parent.target;
        let data = button.dataset['json'];
        let json = decodeURIComponent(data)

        let o = JSON.parse(json);

        let array = Cart.readCart();

        array.push(o);
        json = JSON.stringify(array);

        Cookies.write(Cart.CART_ID, json, 1);
        
        Cart.printCount();
    }

    static removeFromCart(index) {
        let cart = Cart.readCart();

        if(cart.length > index) {
            cart.splice(index,1);  
        }

        let json = JSON.stringify(cart);

        Cookies.write(Cart.CART_ID, json, 1);
        
        Cart.printCount();

    }

    static printCount() {
        let cartSum = document.querySelector("#cartSum");
        if(cartSum !== undefined) {
            let count = Cart.count;
            cartSum.innerHTML = count;
        }
    }

    static attachEvents () {
        document.querySelectorAll(".add-to-cart-cta").forEach(item => {
            item.onclick = function(e) {
                Cart.addToCart(e);
            }
        });
    }

}