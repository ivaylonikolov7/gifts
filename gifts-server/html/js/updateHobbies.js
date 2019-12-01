let clearUp = 0;
let selectedHobbies = 0;
let currentHobbiesText = ['Insert your favourite hobby here'];
let addedHobbiesToDom = document.querySelector('#added-hobbies');

hobbyInput.addEventListener('keydown', (event)=>{
    console.log(event);
    if(event.key==' '){
        let newHobby = (hobbyInput.value).trim();        
        hobbyInput.value = '';        
        initialHobbiesClearUp(addedHobbiesToDom);
        addOrResetHobbies(addedHobbiesToDom, newHobby);
        insertHobbiesInDom(newHobby, addedHobbiesToDom);
        updateGifts(currentHobbiesText);
        selectedHobbies++;
    }

})

function initialHobbiesClearUp(addedHobbies) {
    if (clearUp == 0) {
        addedHobbies.innerHTML = '';
        clearUp++;
        currentHobbiesText=[];
    }
}

function insertHobbiesInDom(newHobby, addedHobbies) {
    ajax.get('http://localhost:3000/hobbies', { hobby: newHobby}, (result) => {
        let template = '';
        if (result != '') {
            let hobbyJSONDb = JSON.parse(result);
            template = `
                <div class="hobby" style = "
                    background-color:${hobbyJSONDb.color1};
                    border: 1px solid ${hobbyJSONDb.color2};
                    color: ${hobbyJSONDb.color2};
                ">
                    ${hobbyJSONDb.name}
                    <div class="remove-hobby" style = "color: ${hobbyJSONDb.color2};">x</div>
                </div>`;
        }
        else {
            template = `
                <div class="hobby" id="beekeeping">
                    No Such Hobby<div class="remove-hobby">x</div>
                </div>`;
        }    
        addedHobbies.innerHTML += template;
        addRemoveHobbyOnClick();
    });
}

function addOrResetHobbies(addedHobbies, inputHobby) {
    if (selectedHobbies >= 2) {
        addedHobbies.innerHTML = '';
        selectedHobbies = 0;
        currentHobbiesText = []
    }
    currentHobbiesText.push(inputHobby)
}