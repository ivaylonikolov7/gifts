    let buttonRemoveHobbies = Object.values(document.getElementsByClassName('remove-hobby'))    ;


buttonRemoveHobbies.forEach((btnRemoveHobby)=>{
    btnRemoveHobby.addEventListener('click',removeHobbyDom())
})
function removeHobbyDom() {
    return (e) => {
        let parentOfThis = e.currentTarget.parentElement;
        let hobbyNameFromDom = e.currentTarget.parentElement.innerText;
        hobbyNameFromDom = hobbyNameFromDom.substring(0, hobbyNameFromDom.length-2);
        console.log(hobbyNameFromDom);
        removeHobbyFromArray(hobbyNameFromDom);
        parentOfThis.remove();
    };
}

function removeHobbyFromArray(hobby){
    for(let i=0; i<currentHobbiesText.length; i++){
        if(hobby==currentHobbiesText[i]){
            currentHobbiesText.splice(i,1)
        }
    }
};
