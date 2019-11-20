let express = require('express');
let app = express();
let mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/local', { 
    useNewUrlParser: true,
    useUnifiedTopology: true  
});

const GiftSchema = mongoose.Schema({
    name: String,
    hobbies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Hobby'}],
    price: Number,
    image: String,
    timesClicked: Number
})
const HobbySchema = mongoose.Schema({
     name: String,    
     color1: String,
     color2: String,
     timesSelected: Number
})

GiftSchema.statics.filterByHobby = function(hobbiesInput){
    return Gift.find().populate({
        path: 'hobbies',
    })
    .then(giftsWithHobbies=>{
        let matchedGiftByFilter = []
        giftsWithHobbies.forEach(giftWithHobbies=>{
            let hobbiesFromDb = giftWithHobbies.hobbies;
            hobbiesFromDb.forEach(hobbyFromDb =>{
                hobbiesInput.forEach(hobbyInput=>{
                    if(hobbyFromDb.name == hobbyInput){
                        matchedGiftByFilter.push(giftWithHobbies);
                    }
                })
            })
        })
        return Promise.resolve(matchedGiftByFilter);
    })
}

const Hobby = mongoose.model('Hobby', HobbySchema);
const Gift = mongoose.model('Gift', GiftSchema);

app.get('/get-gifts', (req, res)=>{
    let hobbies = Object.values(req.query);
    Gift.filterByHobby(hobbies).then(gifts=>{
        res.send(gifts)
    });
})
app.get('/get-hobbies', (req, res)=>{
    Hobby.find().then((result)=>{    
        res.send(result)
    });
})
let server = app.listen(3000, ()=>{

})