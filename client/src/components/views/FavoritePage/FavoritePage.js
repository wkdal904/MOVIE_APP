import React, {useEffect, useState} from 'react'
import './favorite.css';
import Axios from 'axios';
import { Popover } from 'antd';
import {IMAGE_BASE_URL}  from '../../Config';


function FavoritePage() {

    const [Favorites, setFavorites] = useState([])

    useEffect(() => {
        fetchFavoredMovie()
        
    }, [])


    const fetchFavoredMovie=()=>{
        //나의 유저아이디를 가져와서 백엔드에 보내주는 문구
        Axios.post('/api/favorite/getFavoriteMovie', {userFrom:localStorage.getItem('userId')})
        .then(response =>{
            if (response.data.success){
                console.log(response.data)
                setFavorites(response.data.favorites)
                //Favorites안에 모든 영화정보들이 들어가게된다.
            }else{
                alert('영화 정보를 가져오는데 실패했습니다.')
            }
        })
    }

    const onClickDelete=(movieId, userFrom)=>{
        const variables={
            movieId,
            userFrom
        }
        //아래주소에 맞는 것을 서버쪽에서 만들어줘야한다
        Axios.post('/api/favorite/removeFromFavorite', variables)
        .then(response => {
            if(response.data.success){
                fetchFavoredMovie()
            }else{
                alert("리스트에서 지우는데 실패했습니다.")
            }
        })

    }
//정보가들어있는 Favorites에 여러가지가 있을 수 있기 때문에 map을 이용해서 접근해
                //각 영화의 정보들을 출력한다
//이때 return안에 들어있던 테이블구성요소들을 밖으로 꺼내서도 사용 가능하다.
    const renderCards = Favorites.map((favorite, index)=>{
       
       const content =(
           <div>
               {favorite.moviePost ?
               <img src={`${IMAGE_BASE_URL}w500${favorite.moviePost}`} /> : "no image"
            }
           </div>
       )


       return <tr key={index}>
       <Popover content={content} title={`${favorite.movieTitle}`}>
       <td>{favorite.movieTitle}</td>
       </Popover>

       <td>{favorite.movieRunTime} mins</td>
       <td><button onClick={() => onClickDelete(favorite.movieId, favorite.userFrom)}>Remove</button></td>
   </tr>
//여기서의 onClickDelete에서는 위조건에 맞는 정보를 지워야하기 때문에 movieId, userFrom을 가져와야한다.
//()=>이런식의 문구를 써주면 된다 

})

    return (
        <div style={{width:'85%', margin:'3rem auto'}}>
            <h2>FavoritePage</h2>
            <hr />

            <table>
                <thead>
                    <tr>
                        <th>Movie Title</th>
                        <th>Movie RunTime</th>
                        <td>Remove from favorites</td>
                    </tr>
                </thead>
                <tbody>
                
                    {renderCards}
                </tbody>
            </table>
            
        </div>
    )
}
//이렇게 파일을 만들고 app.js에서 import를 해줘야한다
export default FavoritePage
