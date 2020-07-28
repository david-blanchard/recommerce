// Function called on start
var showCookiesPopin = function() {

    // Display the promo popin after the cookies popin is closed
    Cookies.onRemovePopin(function() {
        Promo.showPopin();
    });

    // Display the cookies popin on start
    Cookies.showPopin();

    
    setTimeout(function () {
        Cart.printCount();
    }, 200)
}
