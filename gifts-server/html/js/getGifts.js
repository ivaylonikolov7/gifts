let giftsDom = document.querySelector('#recommendations')

let hobbyInput = document.querySelector("input[type='text']")

initiateFirstGifts();

function initiateFirstGifts() {
    ajax.get('http://localhost:3000/gifts', {}, (results) => {
        results = JSON.parse(results);
        for (let i = 0; i < results.length; i++) {
            let gift = results[i];            
            let parentGift = document.createElement('div');
            let productImage = document.createElement('img'); // add src
            let productDescription = document.createElement('div');
            let ratingDiv = document.createElement('div');
            let hexagonDiv = document.createElement('div');
            let giftMatchRating = document.createElement('div');
            let productName = document.createElement('div');
            let productPrice = document.createElement('div');
            let descriptionDiv = document.createElement('div');
            var styleSheet = document.createElement("style");

            updateClasesToNewDivs(productDescription, parentGift, ratingDiv, hexagonDiv, gift, descriptionDiv, giftMatchRating, productName, productPrice, productImage,styleSheet);
            addEGiftsToDom(styleSheet, descriptionDiv, productName, productPrice, hexagonDiv, giftMatchRating, ratingDiv, productDescription, parentGift, productImage);
        }   
    });

    function addEGiftsToDom(styleSheet, descriptionDiv, productName, productPrice, hexagonDiv, giftMatchRating, ratingDiv, productDescription, parentGift, productImage) {
        document.head.appendChild(styleSheet);
        descriptionDiv.append(productName);
        descriptionDiv.append(productPrice);
        hexagonDiv.append(giftMatchRating);
        ratingDiv.append(hexagonDiv);
        productDescription.append(ratingDiv);
        productDescription.append(descriptionDiv);
        parentGift.append(productImage);
        parentGift.append(productDescription);
        giftsDom.append(parentGift);
    }

    function updateClasesToNewDivs(productDescription, parentGift, ratingDiv, hexagonDiv, gift, descriptionDiv, giftMatchRating, 
        productName, productPrice, productImage,styleSheet) {
        let { hexagonTemplate1, hexagonTemplate2, hexagonTemplate3 } = hexagonTemplatesGet(gift);
        let customCss = hexagonTemplate1 + hexagonTemplate2 + hexagonTemplate3;
        productDescription.setAttribute('class', 'product-description');
        parentGift.setAttribute('class', 'recommended-gift');
        ratingDiv.setAttribute('class', 'rating side');
        hexagonDiv.setAttribute('class', 'hexagon');
        hexagonDiv.setAttribute('id', `s${gift._id}`);
        descriptionDiv.setAttribute('class', 'side description');
        giftMatchRating.setAttribute('class', 'gift-match-rating');
        productName.setAttribute('class', 'product-name');
        productPrice.setAttribute('class', 'price');
        productImage.setAttribute('src', gift.image);
        productImage.setAttribute('width', '75px');
        productName.innerHTML = gift.name;
        productPrice.innerHTML = gift.price;
        giftMatchRating.innerHTML = '10%';
        styleSheet.type = "text/css";
        styleSheet.innerText = customCss;
    }
}

function hexagonTemplatesGet(gift) {
    let hexagonTemplate1 = `#s${gift._id}{
            position: relative;
            width: 35px; 
            height: 20.21px;
            background: ${gift.hobbies[0].color1};
            background: linear-gradient(90deg, ${gift.hobbies[0].color2} 0%, ${gift.hobbies[0].color1} 100%);
            margin: 10.10px 0;
        ;}`;
    let hexagonTemplate2 = `#s${gift._id}:before{
            content: "";            
            position: absolute;
            width: 0;
            border-left: 17.5px solid transparent;
            border-right: 17.5px solid transparent;
            bottom: 100%;
            border-bottom: 10.10px solid ${gift.hobbies[0].color2};
        }`;
    let hexagonTemplate3 = `#s${gift._id}:after
        {
            border-top: 10.10px solid ${gift.hobbies[0].color2};
            top: 100%;
            width: 0;
            content: "";
            position: absolute;
            width: 0;
            border-left: 17.5px solid transparent;
            border-right: 17.5px solid transparent;
        }
        .gift-match-rating{
            color:#000;
        }`;
    return { hexagonTemplate1, hexagonTemplate2, hexagonTemplate3 };
}

function updateGifts(hobbiesDb){
    ajax.get('http://localhost:3000/gifts', {hobbies: hobbiesDb}, (giftsDb) => {
        
        giftsDb = JSON.parse(giftsDb);
        console.log(giftsDb);
        giftsDom.innerHTML = ''
        giftsDb.forEach(gift=>{
            let template = `
            <div class="recommended-gift">
                <img src="${gift.image}" width="70px">
                <div class="product-description">
                    <div class="side" id="rating">
                        <div class="hexagon" id="s${gift._id}">
                            <div class="gift-match-rating">85%</div>
                        </div>
                    </div>
                    <div class="side" id="description">
                        <div class="product-name">${gift.name}</div>
                        <div class="price">${gift.price}</div>
                    </div>
                </div>
                <div class="clear"></div>
                <input type="button" value="Buy">
            </div>`;

            let hexagonTemplate1 = `#s${gift._id}{
                position: relative;
                width: 35px; 
                height: 20.21px;
                background: ${gift.hobbies[0].color1};
                background: linear-gradient(90deg, ${gift.hobbies[0].color2} 0%, ${gift.hobbies[0].color1} 100%);
                margin: 10.10px 0;
            ;}`;
            let hexagonTemplate2 = `#s${gift._id}:before{
                    content: "";            
                    position: absolute;
                    width: 0;
                    border-left: 17.5px solid transparent;
                    border-right: 17.5px solid transparent;
                    bottom: 100%;
                    border-bottom: 10.10px solid ${gift.hobbies[0].color2};
                }`;
            let hexagonTemplate3 = `#s${gift._id}:after
                {
                    border-top: 10.10px solid ${gift.hobbies[0].color2};
                    top: 100%;
                    width: 0;
                    content: "";
                    position: absolute;
                    width: 0;
                    border-left: 17.5px solid transparent;
                    border-right: 17.5px solid transparent;
                }
                .gift-match-rating{
                    color:#000;
                }`;
                let css = hexagonTemplate1 + hexagonTemplate2 + hexagonTemplate3;
                document.head.append(`<style>${css}</style>`);
                giftsDom.innerHTML+=template;
            })    
        })


}

function getHobbies() {
    let hobbies = (Object.values(document.querySelectorAll('.hobby')));

    hobbies = hobbies.map(hobby => {
        hobby = hobby.innerText.substring(0, hobby.innerText.length - 1).trim();
        if(hobby!='No Such Hobby'){                 
            return hobby;
        }    
    });
    return hobbies;
}