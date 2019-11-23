let express = require('express');
let app = express();
let mongoose = require('mongoose');
let path = require('path');

mongoose.connect('mongodb://localhost:27017/local', { 
    useNewUrlParser: true,
    useUnifiedTopology: true  
});

app.use(express.static(__dirname + '/html'))

const GiftSchema = mongoose.Schema({
    name: String,
    hobbies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Hobby'}],
    price: Number,
    image: String,
    timesClicked: Number,
    url: String
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

app.get('/gifts', (req, res)=>{
    if(req.query.hobbies){
        let hobbies = req.query.hobbies.split(',')
        Gift.filterByHobby(hobbies).then(gifts=>{
            res.send(gifts)
        })
    }
    else{
        Gift.find().populate({
            path: 'hobbies',
        }).then(gifts=>{
            res.send(gifts)
        });
    }
})
app.get('/hobbies', (req, res)=>{
    if(req.query.hobby==null){
        Hobby.findOne({name: req.query.hobby}).then((result)=>{
            res.send(result)
        });    
    }
    
})
app.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname + '/html/index.html'));
})
let server = app.listen(3000, ()=>{

})
