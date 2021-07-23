
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const favoriteSchema = mongoose.Schema({
    userFrom: {
        //ref로 지정한 User의 정보들을 ObjectId만 알고서 가져올수 있게 해준것
        type: Schema.Types.ObjectId,
        refL: 'User'
    },
    movieId: {
        type: String
    },
    movieTitle:{
        type: String
    },
    moviePost:{
        type:String
    },
    movieRunTime:{
        type:String
    }

}, {timestamps: true})

const Favorite = mongoose.model('Favorite', favoriteSchema);
module.exports = { Favorite }