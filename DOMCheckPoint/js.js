let heart = document.querySelectorAll('.fa-heart-o');

function likeclicked(event){
    if ( !event.target.classList.contains("heart_clicked")){
        event.target.setAttribute("class","fa fa-heart heart_clicked")
        console.log("heart_clicked")
    }else{
        event.target.setAttribute("class","fa fa-heart-o")
    }
}
if(heart){
    for (let i = 0; i < heart.length; i++) {
        heart[i].addEventListener('click', likeclicked)
    }
}



let addPurchase = document.getElementsByClassName('btn')
let removeItems
let quantity
for (let i = 0; i < addPurchase.length; i++) {
    addPurchase[i].addEventListener('click', addtoCartPurchase )
}


/* ajout nouvelle Carte */
function addtoCartPurchase(event){
    var button = event.target
    var cartItem = button.parentElement.parentElement
    var title = cartItem.getElementsByClassName('item-title')[0].innerHTML
    var price = cartItem.getElementsByClassName('item-price')[0].innerHTML
    var img = cartItem.getElementsByClassName('item-img')[0].src

    /* Methodes a exécuter */
    appendNewCartPurchase(title,price,img)
    removeItems = document.getElementsByClassName('fa-times')
    removeItemsFunction(removeItems)
    UpdateTotalPriceItems()

    /* Recuperation de la quantité */
    quantity = document.querySelectorAll('.item-purchase-quantity')
    for (let i = 0; i < quantity.length; i++) {
        quantity[i].addEventListener('change', quantityChanged)
    }

    function quantityChanged(event) {
        var key = event.target
        if (isNaN(key.value) || key.value <= 0){
            key.value = 1
        }
        UpdateTotalPriceItems()  //!calcul total Price on change
    }
}

//! calcul total
function UpdateTotalPriceItems() {
    var container = document.getElementsByClassName('drop')[0]
    var elements = container.getElementsByClassName('item-purchase')
    var totalP = 0
    for (let i = 0; i < elements.length; i++) {
        var elem = elements[i]
        var currentPrice = elem.getElementsByClassName('item-purchase-price')[0]
        var quantityelem = elem.getElementsByClassName('item-purchase-quantity')[0]
        var priceelem = parseFloat(currentPrice.innerHTML.replace('$',''))
        var quantity1 = quantityelem.value
        totalP = totalP + (priceelem*quantity1)

    }
    totalP = Math.round(totalP * 100)  / 100 /* arrondissement */
    document.getElementsByClassName('total')[0].innerHTML='$'+totalP
}



//! Adding New Cart
function appendNewCartPurchase(title,price,img){
    var NewElement =  document.createElement('div')
    NewElement.className = 'item-purchase'
    var NewDiv =
        `
            <i class="fa fa-times" style="color:red; font-size: 25px; margin-top: 10px;"></i>
            <img src="${img}" alt="" class="item-purchase-img"> 
            <b class="item-purchase-title">${title}</b>
            
            <div class="item-purchase-details">
            <input type="number" value="1" class="item-purchase-quantity">
            <span class="item-purchase-price">${price}</span>   
            </div>
        `

    NewElement.innerHTML= NewDiv
    document.getElementsByClassName('drop')[0].appendChild(NewElement);

}



//! Supprimer Element de la carte
function removeItemsFunction(params) {
    let  totalParsing = document.getElementsByClassName('total')[0].innerHTML
    var  total1 = parseFloat(totalParsing.replace('$',''))

    for (let i = 0; i < params.length; i++) {
        let element = params[i]

        element.addEventListener('click', (event)=>{
            (i != params.length) ?   event.target.parentElement.remove()  : event.target.parentElement.remove()
            UpdateTotalPriceItems() /* Update Total */
        })
    }

}