addRemoveHobbyOnClick();


function addRemoveHobbyOnClick() {
    let buttonRemoveHobbies = Object.values(document.getElementsByClassName('remove-hobby'));
    buttonRemoveHobbies.forEach((btnRemoveHobby) => {
        btnRemoveHobby.addEventListener('click', removeHobby);
    });
}

function removeHobby(e){
    let hobbyNameFromDom = e.currentTarget.parentElement.innerText;
    hobbyNameFromDom = hobbyNameFromDom.substring(0, hobbyNameFromDom.length-2);
    removeHobbyDom(e)
    removeHobbyFromArray(hobbyNameFromDom);
    updateGifts(currentHobbiesText)
}
function removeHobbyDom(e) {
    let parentOfThis = e.currentTarget.parentElement;
    parentOfThis.remove();        
}

function removeHobbyFromArray(hobby){
    for(let i=0; i<currentHobbiesText.length; i++){
        if(hobby==currentHobbiesText[i]){
            currentHobbiesText.splice(i,1)
        }
    }
};
