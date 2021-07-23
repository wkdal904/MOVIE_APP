import React, {useEffect, useState} from 'react'
import Axios from 'axios';
import responsiveObserve from 'antd/lib/_util/responsiveObserve';
import {Button} from 'antd';

function Favorite(props) {

    const movieId=props.movieId
    const userFrom=props.userFrom
    const movieTitle = props.movieInfo.title
    const moviePost = props.movieInfo.backdrop_path
    const movieRunTime = props.movieInfo.runtime

    const [FavoriteNumber, setFavoriteNumber] = useState(0)
    const [Favorited, setFavorited] = useState(false)

    let variables ={
        userFrom:userFrom ,
        movieId:movieId,
        movieTitle:movieTitle,
        moviePost:moviePost,
        movieRunTime:movieRunTime

    }
    useEffect(() => {

    
        //여기서의 이 엔드포인트는 내가 임의로정할수있다
       Axios.post('/api/favorite/favoriteNumber', variables)
       //서버에 요청해서 db에있는 좋아요 수를 가져오는 방식이다.
       //variables의 값은 누가 좋아요를 눌렀는지, 어떤 영화를 좋아했는지의 정보를 받는다.
       .then(response => {
        console.log(response.data)
        setFavoriteNumber(response.data.favoriteNumber)
           if(response.data.success){
//정보를 성공적으로 가져왔다면
           }else{//정보를 가져오지 못했다면
               alert('숫자 정보를 가져오는데 실패했습니다.')
           }
       })

       //여기서의 이 엔드포인트는 내가 임의로정할수있다
       Axios.post('/api/favorite/favorited', variables)
       //서버에 요청해서 db에있는 좋아요 수를 가져오는 방식이다.
       //variables의 값은 누가 좋아요를 눌렀는지, 어떤 영화를 좋아했는지의 정보를 받는다.
       .then(response => {
           if(response.data.success){
            setFavorited(response.data.favorited)
//정보를 성공적으로 가져왔다면
           }else{//정보를 가져오지 못했다면
               alert('정보를 가져오는데 실패했습니다.')
           }
       })



    }, [])
const onClickFavorite=() =>{

    if(Favorited){
        Axios.post('/api/favorite/removeFromFavorite', variables)
        .then(response => {
            if(response.data.success){
                setFavoriteNumber(FavoriteNumber-1)
                setFavorited(!Favorited)
                //favorite이 되어있을때와 안되어있을때의 문구가 다르기 때문에 !로 토글해주느것
            }else{
                alert('Favorite 리스트에서 지우는것을 실패했습니다.')
            }
        })
//각 상황마다 다른 request를 줘야하기 때문에 Axios를 사용한다
    }else{
        Axios.post('/api/favorite/addToFavorite', variables)
        .then(response => {
            if(response.data.success){
                setFavoriteNumber(FavoriteNumber+1)
                setFavorited(!Favorited)
            }else{
                alert('Favorite 리스트에서 추가하는 것을 실패했습니다.')
            }
        })
//이 이후에 route폴더의 favorite파일에서 api를 추가해줘야한다.
    }
}



    return (
        <div>
            
            <Button onClick={onClickFavorite}>{Favorited ? "Not Favorite" : "Add To Favorite"} {FavoriteNumber}</Button>
        </div>
    )
}
//버튼에 Favorited가 0이라면 Add To Favorite이라고 버튼에 출력된다
export default Favorite
