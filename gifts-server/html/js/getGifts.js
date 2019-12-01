let giftsDom = document.querySelector('#recommendations')

let hobbyInput = document.querySelector("input[type='text']")

initiateFirstGifts();

function initiateFirstGifts(){
    updateGifts([]);
}
function updateGifts(hobbiesDb){
    ajax.get('http://localhost:3000/gifts', {hobbies: hobbiesDb}, (giftsDb) => {    
        giftsDb = JSON.parse(giftsDb);
        giftsDom.innerHTML = '';
        giftsDb.forEach(gift=>{
            let templateCss = `
                position:relative;
                top:10px;
                width:60%;
                height:2px;
                display:block;
                content: '';
                margin: 0 auto;
                background: rgb(2,0,36);
                background: linear-gradient(90deg, ${gift.hobbies[0].color1} 0%, ${gift.hobbies[0].color2} 100%);
            </style>`;
            let template = `
            <div class="recommended-gift">
                <img src="${gift.image}" width="70px">
                
                <div id=s${gift._id} class="product-description">            
                    <div class="description">
                        <div class="product-name">${gift.name}</div>
                        <div class="price">${gift.price}0 $</div>
                    </div>
                    <div class="mini-hobbies">                    
                        <div style="
                        background-color: ${gift.hobbies[0].color1};" 
                        class="mini-hobby">${gift.hobbies[0].name}</div>
                        <div style="
                        background-color: ${gift.hobbies[0].color1};"
                        class="mini-hobby">Animal</div>
                    </div>
                </div>                
                <div class="clear"></div>
                <button id="s${gift._id}" 
                    onmouseover="this.style.border = '1px solid ${gift.hobbies[0].color2}'"
                    onmouseout="this.style.border = '0px solid ${gift.hobbies[0].color2}'">
                    Buy
                </button>        
            </div>`;            
            //document.head.innerHTML += templateCss;
            giftsDom.innerHTML+=template;
        })    
    })
}
