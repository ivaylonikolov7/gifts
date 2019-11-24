let clearUp = 0;
let selectedHobbies = 0;
let currentHobbiesText = []

hobbyInput.addEventListener('keydown', (event)=>{
    if(event.code=='Space'){
        let addedHobbiesToDom = document.querySelector('#added-hobbies');
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
                ">
                    ${hobbyJSONDb.name}
                    <div class="remove-hobby">x</div>
                </div>`;
        }
        else {
            template = `
                <div class="hobby" id="beekeeping">
                    No Such Hobby<div class="remove-hobby">x</div>
                </div>`;
        }
        addedHobbies.innerHTML += template;
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