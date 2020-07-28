class Cart 
{
    static CART_ID = 'cpascher_cart';

    constructor() {

    }

    /**
     *  Return the number of articles in the cart cookie, otherwise 0
     */
    static get count() {
        let result = 0;

        let json = Cart.readCart();

        result = (json !== '') ? json.length : 0;

        return result;
    }

    /**
     * Read the content of the cart cookie and return a ready-made JS object
     */
    static readCart() {
        let cart = Cookies.read(Cart.CART_ID);
        let json = (cart !== '') ? JSON.parse(cart) : [];
        
        return json;

    }

    /**
     * Add an article to the cart cookie by retrieving the data through the Button object
     * 
     * @param {DOM ELement} parent 
     */
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

    /**
     * Remove an article from the cart by its position in the cart
     * 
     * @param {int} index 
     */
    static removeFromCart(index) {
        let cart = Cart.readCart();

        if(cart.length > index) {
            cart.splice(index,1);  
        }

        let json = JSON.stringify(cart);

        Cookies.write(Cart.CART_ID, json, 1);
        
        Cart.printCount();

    }

    /**
     * Display the number of articles in the cart on cart button
     */
    static printCount() {
        let cartSum = document.querySelector("#cartSum");
        if(cartSum !== undefined) {
            let count = Cart.count;
            cartSum.innerHTML = count;
        }
    }

    /**
     * Bind click events on every "Add to cart" button on the search page
     */
    static attachEvents () {
        document.querySelectorAll(".add-to-cart-cta").forEach(item => {
            item.onclick = function(e) {
                Cart.addToCart(e);
            }
        });
    }

}