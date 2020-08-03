class Cookies {

    constructor() {
        this._onremovepopin = null;
    }

    static write(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }

    static read(cname) {

        var name = cname + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    static delete(cname) {
        var expires = "expires=Thu 01 Jan 1970";
        document.cookie = cname + "=;" + expires;
    }

    static showPopin() {

        if (Cookies.read('acceptCookies') !== '') {
            // Choice already set, don't ask again
            return;
        }

        // Create screenwide modal layout
        let screenLayout = document.createElement("div");
        screenLayout.id = "screen-layout";
        document.body.appendChild(screenLayout);
        let frameLayout = document.createElement("div");
        frameLayout.setAttribute("class", "frame-layout");
        frameLayout.innerHTML =
            `
    <div class="popin-box">
        <div id="banner-message">
            <p>
            Nous souhaiterions avoir un retour de votre expérience sur notre site.
            </p>
            <p>
            Acceptez-vous les cookies ?
            </p>

            <button id="acceptCookiesCta" class="popin-cta" >Accepter</button> 
            <button id="refuseCookiesCta" class="popin-cta cancel">Refuser</button>
        </div>
    
    </div>
`;
        document.body.appendChild(frameLayout);

        let acceptCta = document.querySelector("#acceptCookiesCta");
        acceptCta.onclick = function () {
            Cookies.removePopin();
            Cookies.write('acceptCookies', '1', 365);
        }
        var refuseCta = document.querySelector("#refuseCookiesCta");
        refuseCta.onclick = function (e) {
            console.log(e);
            Cookies.removePopin();
            //Cookies.write('acceptCookies', '0', 365);
        }
        refuseCta.onmouseover = function() {
            acceptCta.className = "popin-cta cancel";
            acceptCta.innerHTML = "Refuser";
            refuseCta.className = "popin-cta";
            refuseCta.innerHTML = "Accepter";
        }
        refuseCta.onmouseout = function() {
            acceptCta.className = "popin-cta";
            acceptCta.innerHTML = "Accepter";
            refuseCta.className = "popin-cta cancel";
            refuseCta.innerHTML = "Refuser";
            
        }

    }

    static removePopin() {
        let frameLayout = document.querySelector(".frame-layout");
        document.body.removeChild(frameLayout);
        let screenLayout = document.querySelector("#screen-layout");
        document.body.removeChild(screenLayout);

        Cookies.onRemovePopin();
    }

    static onRemovePopin(callback) {
        if(callback !== undefined) {
            this._onremovepopin = callback;
            return;
        }
        if(callback === undefined && 'function' == typeof this._onremovepopin) {
            this._onremovepopin.call(null);
        }
    }

}