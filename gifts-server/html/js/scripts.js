/*
<div class="recommended-gift">
    <img src="images/phone 2.jpg" width="70px">
    <div class="product-description">
    <div class="side" id="rating">
        <div class="hexagon">
            <div class="gift-match-rating">85%</div>
        </div>
    </div>
    <div class="side" id="description">
        <div class="product-name">iPhone</div>
        <div class="price">1499$</div>
    </div>
</div>
<div class="clear"></div>
<input type="button" value="Buy">
*/
let gifts = document.querySelector('#recommendations')
let parentGift = document.createElement('div');
let side1 = document.createElement('div')
let productImage = document.createElement('img'); // add src
let ratingDiv = document.createElement('div')
let hexagonDiv = document.createElement('div')
let giftMatchRating = document.createElement('div')
let side2 = document.createElement('div')
let productName = document.createElement('div')
let productPrice = document.createElement('div')

parentGift.setAttribute('class','recommended-gift');
side1.setAttribute('class', 'side');
ratingDiv.setAttribute('class','rating');
hexagonDiv.setAttribute('class', 'hexagon');
giftMatchRating.setAttribute('class','match-rating');
side2.setAttribute('class', 'side');
productName.setAttribute('class','product-name');
productPrice.setAttribute('class', 'price')


side1.append(parentGift);
side1.append(productImage);
hexagonDiv.append(giftMatchRating)
ratingDiv.append(hexagonDiv)
side1.append(ratingDiv);
side2.append(productName);
side2.append(productPrice);
side2.append(parentGift);
gifts.append(parentGift);
ajax.get('http://localhost:3000/gifts', {hobby: 'Beekeeping'}, (results)=>{

})