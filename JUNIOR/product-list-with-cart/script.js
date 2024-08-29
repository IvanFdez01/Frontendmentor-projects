
const ADDTOCART_PASIVE = 
        `<img src = "assets/images/icon-add-to-cart.svg" alt = "">
         <h3 class = "bold">Add to Cart</h3>`;
const ADDTOCART_ACTIVE = 
        `<button id = "minus" class = "quantity-b">
            <svg class = "minus" xmlns="http://www.w3.org/2000/svg" width="10" height="2" fill="none" viewBox="0 0 10 2"><path d="M0 .375h10v1.25H0V.375Z"/></svg>
         </button>
         <h3 id = "quantity-num?" class = "lighter">quantity-numUI</h3>
         <button id = "plus" class = "quantity-b">
            <svg class = "plus" xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none" viewBox="0 0 10 10"><path d="M10 4.375H5.625V0h-1.25v4.375H0v1.25h4.375V10h1.25V5.625H10v-1.25Z"/></svg>
         </button>`;
const CART_HEADER = 
        `<h2 class = "orange">Your Cart (<span id = "items-added-to-cart">0</span>)</h2>`;
const CART_EMPTY = CART_HEADER + 
        `<div id = "cart-empty">
            <img src = "./assets/images/illustration-empty-cart.svg" alt = "cake">
            <h3 class = "grey">Your added items will appear here</h3>
         </div>`;
const CART_FILLED = CART_HEADER + 
        `<div id = "added-prods"></div>
         <div class = "order-total-cont">
            <h3 class = "medium">Order total</h3>
            <h2 class = "black bold" id = "to-pay" ></h2>
         </div>
         <div class = "carbon-ad">
            <img src = "./assets/images/icon-carbon-neutral.svg" alt = "tree">
            <h3 class = "medium">This is a <strong>carbon-neutral</strong> delivery</h3>
         </div>
         <button id = "confirm-order-b">Confirm Order</button>`;
const PRODUCT = 
        `<div class = "cart-prod">
            <div class = "cart-prod-info">
                <h3>prod_name</h3>
                <div class = "cart-prod-vals">
                    <h3 class = "orange">prod_amountx</h3>
                    <h3 class = "prod-pr lighter grey">&commat; &dollar;prod_price</h3>
                    <h3 class = "prod-tot grey-darker">&dollar;prod_total</h3>
                </div>
            </div>
            <button class = "prod-cart-cross-b">
                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none" viewBox="0 0 10 10"><path fill="#CAAFA7" d="M8.375 9.375 5 6 1.625 9.375l-1-1L4 5 .625 1.625l1-1L5 4 8.375.625l1 1L6 5l3.375 3.375-1 1Z"/></svg>            
            </button>
        </div>
        <div class = "separator"></div>`;
const CONFIRM_MODAL = 
        `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 32.121L13.5 24.6195L15.6195 22.5L21 27.879L32.3775 16.5L34.5 18.6225L21 32.121Z" fill="#1EA575"/>
            <path d="M24 3C19.8466 3 15.7865 4.23163 12.333 6.53914C8.8796 8.84665 6.18798 12.1264 4.59854 15.9636C3.0091 19.8009 2.59323 24.0233 3.40352 28.0969C4.21381 32.1705 6.21386 35.9123 9.15077 38.8492C12.0877 41.7861 15.8295 43.7862 19.9031 44.5965C23.9767 45.4068 28.1991 44.9909 32.0364 43.4015C35.8736 41.812 39.1534 39.1204 41.4609 35.667C43.7684 32.2135 45 28.1534 45 24C45 18.4305 42.7875 13.089 38.8493 9.15076C34.911 5.21249 29.5696 3 24 3ZM24 42C20.4399 42 16.9598 40.9443 13.9997 38.9665C11.0397 36.9886 8.73256 34.1774 7.37018 30.8883C6.0078 27.5992 5.65134 23.98 6.34587 20.4884C7.04041 16.9967 8.75474 13.7894 11.2721 11.2721C13.7894 8.75473 16.9967 7.0404 20.4884 6.34587C23.98 5.65133 27.5992 6.00779 30.8883 7.37017C34.1774 8.73255 36.9886 11.0397 38.9665 13.9997C40.9443 16.9598 42 20.4399 42 24C42 28.7739 40.1036 33.3523 36.7279 36.7279C33.3523 40.1036 28.7739 42 24 42Z" fill="#1EA575"/>
        </svg>
        <div>
            <h1 class = "black">Order confirmed</h1>
            <h3 class = "grey medium">We hope you enjoy your food</h3>
        </div>
        <div id = "confirmed-items-cont">
            <div id = "confirmed-items"></div>
            <div id = "confirmed-total">
                <h3 class = "black medium">Order total</h3>
                <h2 class = "black">&dollar;confirmed_price</h2>
            </div>
        </div>
        <button id = "new-order-b">Start New Order</button>
        `;

/* products added to the cart. 
 Array format: 
 let n = cart.size, For all 0 <= i < n : 
                      pi = {key=name,value={price, quantity} : 
                      map{p0,p1,...,pn-1}
*/
let cart = new Map();
let data; 
let name_pos = new Map(); // name of dessert -- pos in data

async function fetchData() {
    try {
        let response = await fetch('data.json');
        data = await response.json();
        createdesktopUI();
        custom_buttons();
    } catch (error) {
        console.error('Error:', error);
    }
}
// main call
fetchData();

function createdesktopUI() {
    const desk_bp = window.matchMedia("(min-width: 700px)"); // below
    // desserts grid initialization
    let htmldesserts = "";
    for (let i in data) {
        name_pos.set(`${data[i].name}`, i);
        htmldesserts += 
        `<div class = "product">
            <div class = "img-plus-button"> 
                <img src = "${
                    desk_bp.matches ? data[i].image.desktop : data[i].image.mobile
                }" class = "pr-img">
                <button id = "add-b${i}" class = "addtocart-b addtocart-pasive">
                    ${ADDTOCART_PASIVE}
                </button>
            </div>
            <div class = "product-info">
                <h3 class = "grey lighter">${data[i].category}</h3>
                <h3>${data[i].name}</h3>
                <h3 class = "price">$${data[i].price.toFixed(2)}</h3>
            </div>
        </div>`;
    }
    document.getElementById('main-grid').innerHTML = htmldesserts;
    desk_bp.addEventListener('change', (e) => updateIMGS(e, data)); 

    // cart element
    document.getElementById('cart').innerHTML = CART_EMPTY;
}

// update imgs depending on the device width, 
// choosing between dektop an mobile resolutions
function updateIMGS(e) {
    const imgs = document.querySelectorAll('.pr-img');
    for (let i in imgs) {
        if (e.matches) {
            imgs[i].src = data[i].image.desktop;
        } else {
            imgs[i].src = data[i].image.mobile;
        }
    }
}


/* ==================================================== */ 
/* ========== MAKE CART-BUTTONS INTERACTABLE ==========*/
/* ==================================================== */

// action of clicking an add to cart button (changes to selector)
function custom_buttons() {
    let clicked = undefined;
    const buttons = document.querySelectorAll('.addtocart-b');
    for (let i = 0; i < buttons.length; i++) {
        const l = buttons[i].classList;
        const quantityUI = document.getElementById('quantity_num' + i);
        buttons[i].addEventListener('click', () => {
            // only blurring if another button selected
            if (clicked !== undefined) {
                clicked.classList.remove('addtocart-active');
                clicked.classList.add('addtocart-pasive');
                clicked.innerHTML = ADDTOCART_PASIVE;
            }
            l.remove('addtocart-pasive');
            l.add('addtocart-active');
            // find value for number in addtocart-b-active
            let val = cart.get(data[i].name);
            buttons[i].innerHTML = ADDTOCART_ACTIVE.replace('?', i)
                                            .replace('quantity-numUI', val === undefined ? 0 : val.amount);
            clicked = buttons[i];
            active_amount_selectors(data[i]);
        });
    }
}

function active_amount_selectors(prod) {
    const minus = document.getElementById('minus');
    const plus = document.getElementById('plus');
    minus.addEventListener('click', () => {
        rm_prod_fromcart(prod);
        update_cartUI();
    });
    plus.addEventListener('click', () => {
        add_prod_tocart(prod);
        update_cartUI();
    });
}

// prod = {name,price}
function add_prod_tocart(prod) {
    if (cart.has(prod.name)) {
        cart.get(prod.name).amount++;
    } else {
        cart.set(prod.name, {price: prod.price, amount: 1});
    }
}

function rm_prod_fromcart(prod) {
    if (cart.has(prod.name)) {
        cart.get(prod.name).amount--;
        if (cart.get(prod.name).amount === 0) {
            cart.delete(prod.name);
        }
    } 
}

// only UI
function update_cartUI() {
    const cartUI = document.getElementById('cart');
    const total_vals = calculate_total();
    if (total_vals.am > 0) {
        cartUI.innerHTML = CART_FILLED;
        const prod_list = document.getElementById('added-prods');
        for (const prod of cart) {
            prod_list.innerHTML += PRODUCT.replace('prod_name', prod[0])
                                        .replace('prod_amount', prod[1].amount)
                                        .replace('prod_price', prod[1].price)
                                        .replace('prod_total', prod[1].amount * prod[1].price);
        }
        // total val
        document.getElementById('to-pay').innerHTML = `&dollar;${total_vals.pr}`;
        active_confirm_button(total_vals.pr);
    } else {
        cartUI.innerHTML = CART_EMPTY;
    }
    document.getElementById('items-added-to-cart').innerHTML = total_vals.am;
}

function calculate_total() {
    let total_price = 0, total_amount = 0;
    for (const prod of cart) {
        total_price += (prod[1].amount * prod[1].price);
        total_amount += prod[1].amount;
    }
    return {pr: total_price, am: total_amount};
}

/* ========== CONFIRM ORDER BUTTON ==========*/ 
function active_confirm_button(total) {
    const b = document.getElementById('confirm-order-b');
    b.addEventListener('click', () => {
        const modal = document.getElementById('order-confirmed-modal');
        const overlay = document.getElementById('dark-overlay');
        modal_visible(modal, overlay, total);
        const itemsUI = document.getElementById('confirmed-items'); // in DOM since last line
        for (const prod of cart) {
            itemsUI.innerHTML += 
                `<div class = "conf-prod">
                    <img class = "conf-prod-thumb" src = "${data[name_pos.get(prod[0])].image.thumbnail}" alt = "prod img">
                    <div class = "conf-info">
                        <h3 class = "black">${prod[0]}</h3>
                        <div class = "conf-vals">
                            <h3 class = "orange">${prod[1].amount}x</h3>
                            <h3 class = "grey medium">&commat; &dollar;${(prod[1].price).toFixed(2)}</h3>
                        </div>
                    </div>
                    <h3 class = "conf-right">&dollar;${(prod[1].price * prod[1].amount).toFixed(2)}</h3>
                </div>
                <div class = "separator"></div>
                `;
        }
        const start_order_b = document.getElementById('new-order-b');
        start_order_b.addEventListener('click', () => {
            reset();
            modal_invisible(modal, overlay);
        })
    }); 
}

function modal_visible(modal, overlay, total) {
    modal.innerHTML = CONFIRM_MODAL.replace('confirmed_price', total);
    modal.style.padding = '2rem';
    modal.style.opacity = '1';
    modal.style.zIndex = '20';
    overlay.style.opacity = '1';
    overlay.style.zIndex = '10';
}

function modal_invisible(modal, overlay) {
    modal.innerHTML = '';
    modal.style.padding = '0rem';
    modal.style.opacity = '0';
    modal.style.zIndex = '-1';
    overlay.style.opacity = '0';
    overlay.style.zIndex = '-2';
}

/* ========== RESET (cart and buttons) ==========*/ 
function reset() {
    reset_cart();
    reset_buttons();
}

function reset_cart() {
    cart.clear();
    update_cartUI();
}

function reset_buttons() {
    const buttons = document.querySelectorAll('.addtocart-b');
    for (const button of buttons) {
        let l = button.classList;
        l.remove('addtocart-active');
        l.add('addtocart-pasive');
        button.innerHTML = ADDTOCART_PASIVE;
    }
}