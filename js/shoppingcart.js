//Show Cart
const cartSlide = () => {
    const cartOpen = document.querySelector(".show-cart");
    const toggleBtn = document.querySelector(".cart");
    const toggleClose = document.querySelector(".closebtn");
    const container = document.querySelector(".full-container");

    toggleBtn.addEventListener('click', () => {
        cartOpen.style.width = "24%";
        document.body.style.overflow = "hidden";
    });

    toggleClose.addEventListener('click', () => {
        cartOpen.style.width = "0%";
        document.body.style.overflow = "scroll";
    });
}

//add Cart
const addItems = () => {
    const buyBtn = document.querySelectorAll(".buynow");
    var counter = 0;

    buyBtn.forEach(function(btn){
          btn.addEventListener('click', function(event){

          if(event.target.parentElement.classList.contains("catalog-info")){
            let imgFullPath = event.target.parentElement.previousElementSibling.src; //full path of img
            let position = imgFullPath.indexOf('img') + 3; // to get only the /tee1.jpg not img/tee1.jpg
            let partFullPath = imgFullPath.slice(position);

            const item = {};
            item.img = `img-cart${partFullPath}`;

            let itemName = event.target.parentElement.children[0].textContent; // grab the item name
            item.name = itemName;

            let itemPrice = event.target.parentElement.children[2].textContent; // grab the item price
            item.price = itemPrice;

            const cartItem = document.createElement("div");
            cartItem.classList.add("item-cart-container");

            cartItem.innerHTML=
            `
              <img src="${item.img}" alt="">
              <div class="item-text">
                  <p class="item-cart-title">${item.name}</p>
                  <span class="cart-currency">$</span>
                  <span class="item-cart-price">${item.price}</span>
              </div>
              <div class="quantity-container">
                <div class="quantity-cart">
                    <span class="cart-quantity-left">+</span>
                    <span class="cart-quan-no">1</span>
                    <span class="cart-quantity-right">-</span>
                </div>
                <span class="remove-quantity">Remove</span>
              </div>
            `
            //select cart and total
            const cart = document.querySelector(".show-cart");
            const total = document.querySelector(".cart-footer");

            cart.insertBefore(cartItem, total);
            alert("Items Added to Cart !");
            showTotal();

            //remove cart function
            removeCart(item);
          }
      });
    });
}

//Show total
function showTotal(){
    const total = [];
    const items = document.querySelectorAll(".item-cart-price");

    items.forEach(function(item){
        total.push(parseFloat(item.textContent));
    });

    const orderTotal = total.reduce(function(total,item){
        total += item;

        return total;
    }, 0);

    const finalTotal = orderTotal.toFixed(2);

    document.querySelector(".order-total").textContent = finalTotal;
}

//remove cart
function removeCart(item){
    const remove = document.querySelectorAll(".remove-quantity");
    var itemCart = {};
    itemCart = item;

    remove.forEach(function(rmv){
        rmv.addEventListener('click', function(event){
            if(event.target.classList.contains("remove-quantity")){
              const parent = event.target.parentElement.parentElement;
              parent.remove();
              delete itemCart;
              showTotal();
            }
        });
    });
}

cartSlide();
addItems();
