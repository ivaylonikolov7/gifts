let buttonRemoveHobbies = Object.values(document.getElementsByClassName('remove-hobby'))    ;


buttonRemoveHobbies.forEach((btnRemoveHobby)=>{
    btnRemoveHobby.addEventListener('click',(e)=>{
        let parentOfThis = e.currentTarget.parentElement;
        removeHobby('Animals');
        parentOfThis.remove();
    })
})
function removeHobby(hobby){
    console.log(currentHobbiesText)
    for(let i=0; i<currentHobbiesText.length; i++){
        if(hobby==currentHobbiesText[i]){
            currentHobbiesText.splice(i,1)
        }
    }
    console.log(currentHobbiesText);
};
