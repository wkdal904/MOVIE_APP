const express = require('express');
const router = express.Router();
const { Favorite }= require('../models/Favorite');

//Favorite에서 Axos.post로 요청한것을 여기서도 post로 받는것이다.
router.post('/favoriteNumber', (req, res)=>
{//아래의 문장은 post를 보낸 클라쪽 Favorite에서의 movieId, userFrom
//정보를 가져오기 위한 콜백함수(req, res)=>이다

//body를 이용하기 위해서는 index.js에 있는 bodyparser가 필요하다
Favorite.find({"movieId": req.body.movieId})
//몽고에있는 movieId와 요청받은 movieId가 같은것을 찾아달라는 것이다.
    .exec((err, info)=>{//쿼리를 돌려 에러라면 err, 찾은 정본는 info에 들어간다
        if(err) return res.status(400).send(err)//클라에 정볼ㄹ 다시 보내주는것이다

        //200은 성공했다는 의미
        res.status(200).json({success:true, favoriteNumber:info.length })
                //[1, 2, 34] 이런식으로 들어오기 땜누에 길이를 리턴해주는것이다
                //3명이 좋아요를 눌렀다는 의미
        })
//mongoDB에서 favorite숫자를 가져오기
//그다음에 프론트에 다시 숫자 정보를 보내주기

    })

router.post('/favorited', (req, res)=>{
//내가 이영화를 favorte리스트에 넣었는지 정보를 db에서 가져오기

Favorite.find({"movieId": req.body.movieId, "userFrom": req.body.userFrom})
    .exec((err, info)=>{
        if(err) return res.status(400).send(err)
        //favorite리스트에 넣지 않았다면 리스트는 []
        let result=false;
        if(info.length !==0){
            result=true
        }
        res.status(200).json({success:true, favorited:result})
        })
})

router.post('/removeFromFavorite', (req, res)=>{
    Favorite.findOneAndDelete({movieId:req.body.movieId, userFrom: req.body.userFrom})
    .exec((err, doc)=>{
        if(err) return res.status(400).send(err)
        res.status(200).json({success: true, doc})
    })
    })

    router.post('/addToFavorite', (req, res)=>{
        const favorite = new Favorite(req.body)
        favorite.save((err, doc)=>{//이렇게 되면 favorite다큐먼트에 req.body의 모든 정보가 들어가게 된다
            if(err) return res.status(400).send(err)
            return res.status(200).json({success:true})
        })
        
    
    })

    router.post('/getFavoriteMovie', (req, res)=>{
        
        Favorite.find({'userFrom':req.body.userFrom})
        .exec((err, favorites)=>{
            if(err) return res.status(400).send(err)
            return res.status(200).json({success:true, favorites})
            //favorites에서는 내가 좋아요를 누른 영화들의 정보들이 담겨있다
        })
    
    })
    router.post('/removeFromFavorite', (req, res)=>{
        
        Favorite.findOneAndDelete({movieId: req.body.movieId, userFrom: req.body.userFrom})
        .exec((err, result)=>{
            if(err) return res.status(400).send(err)
            return res.status(200).json({success:true})
        })
    
    })
   
        
module.exports = router;
