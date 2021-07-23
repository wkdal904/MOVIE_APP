import React, {useEffect, useState} from 'react'
import { FaCode } from "react-icons/fa";
import {API_URL, API_KEY, IMAGE_BASE_URL} from '../../Config';
import MainImage from './Section/MainImage';
import GridCards from '../commons/GridCards';
import {Row} from 'antd';
function LandingPage() {

    const [Movies, setMovies] = useState([])
    const [MainMovieImage, setMainMovieImage] = useState(null)
    const [CurrentPage, setCurrentPage] = useState(0)
    //CurrentPage는 페이지값을 넣어준다
    useEffect(() => {
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
        fetchMovies(endpoint)
    }, [])


    //fetch부분을 하나의 함수로 만드는 과정인데 endpoint는 계속 변화하는 값이기 때문에 파라미터로 지정한다
    const fetchMovies = (endpoint) => {
        fetch(endpoint)//fetch로 endpoint에 있는 현재인기있는 영화를 가져올수 있는 것이다
        .then(response =>response.json())//response에 지금 결과값들이 떨어지는것이다
        //이때 이를 이용하기 위해서는 response.json메소들을 이용해야한다
        .then(response => {
            console.log(response)
            setMovies([...Movies, ...response.results])//이렇게 하면 20개의 최신영화
            //정보들이 moviestate에 들어가게 된다
            //...Movies를 해줘야 새로운 영화가 20개 추가되어도 전의 20개가 사라지지않고 유지된다.
            setMainMovieImage(response.results[0])
            //메인사진은 첫번째로 인기있는영화이기 때문에 0번째를 출력
            setCurrentPage(response.page)
        })
    }
    const loadMoreItems = () => {
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${CurrentPage + 1}`;
        fetchMovies(endpoint)
    }



    return (
        <div style={{width:'100%', margin: '0'}}>
            {/*Main Image*/}

            {MainMovieImage && /*이 이미지가 있다면 아래의 문장을 실행하라는 문구를 넣어주면서
            backdrop_path의 오류를 해결할 수 있다*/
            //w1280은 이미지의 크기, backdrop_path는 이미지를 나타낸다이는 사이트분석에서 알수있다
            <MainImage image={`${IMAGE_BASE_URL}w1280${MainMovieImage.backdrop_path}`}
            title={MainMovieImage.original_title}
            //제목과 설명을 추가한것
            text={MainMovieImage.overview}
            />
            //backdrop_path가 있으려면 먼저 메인무비 이미지가 있어야한다 하지만 먼저 endpoint를이용해서 무비 정보를 가져와야한다
//하지만 그전에 먼저 이부분을 렌더링해버려서 이부분에 정보를 가져오지 못한 상태여서 오류가 발생했다 이를 처리하기위해서는

}


           <div style={{width:'85%', margin: '1rem auto'}}>

                <h2>Movie by latest</h2>
                <hr />
                {/*Movie Grid Cards*/}
                <Row gutter={[16, 16]}>
                    //무비스에는 무비의 정보들이 있고 map을 이용해서 하나하나의 무비들을 사용가능시킨다.
        
                    {Movies && Movies.map((movie, index)=>(
                        <React.Fragment key={index}>
                        <GridCards 
                        landingPage
                        image={movie.poster_path ?
                        `${IMAGE_BASE_URL}w500${movie.poster_path}` : null}
                        movieId={movie.id}//무비를 클릭했을때 id가 필요해서 만듬
                        movieName={movie.original_title}
                        />
                        </React.Fragment>
                    ))}

                </Row>

           </div>

           <div style={{display: 'flex', justifyContent: 'center'}}>
               <button onClick={loadMoreItems}>Load More</button>
           </div>
        </div>
    )
}

export default LandingPage
