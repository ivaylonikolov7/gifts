let giftsDom = document.querySelector('#recommendations')

let hobbyInput = document.querySelector("input[type='text']")

initiateFirstGifts();

function initiateFirstGifts(){
    updateGifts([]);
}
function updateGifts(hobbiesDb){
    ajax.get('http://localhost:3000/gifts', {hobbies: hobbiesDb}, (giftsDb) => {
        console.log(giftsDb);
        giftsDb = JSON.parse(giftsDb);    
        giftsDom.innerHTML = ''
        giftsDb.forEach(gift=>{
            let template = `
            <div class="recommended-gift">
                <img src="${gift.image}" width="70px">
                <div class="product-description">            
                    <div class="description">
                        <div class="product-name">${gift.name}</div>
                        <div class="price">Price: ${gift.price}0 $</div>
                    </div>
                    <div class="mini-hobbies">
                        <div id="mini-beekeeping" class="mini-hobby">Beekeeping</div>
                        <div id="mini-animal" class="mini-hobby">Animal</div>
                    </div>
                </div>                
                <div class="clear"></div>
                <button>Buy</button>
            </div>`;
            let templateCss = `<style>
                .product-description:before{
                    top:-8px;
                    position:relative;
                    width:100%;
                    height:2px;
                    display:block;
                    content: '';
                    background: rgb(2,0,36);
                    background: linear-gradient(90deg, ${gift.hobbies[0].color1} 0%, ${gift.hobbies[0].color1} 35%, ${gift.hobbies[0].color2} 100%);
                }
            </style>`;
            document.head.innerHTML += templateCss;
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