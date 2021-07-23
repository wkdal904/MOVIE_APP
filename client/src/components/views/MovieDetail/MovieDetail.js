import React,{useEffect, useState} from 'react'
import {API_URL, API_KEY, IMAGE_BASE_URL} from '../../Config';
import MainImage from '../LandingPage/Section/MainImage';
import MovieInfo from './Sections/MovieInfo';
import GridCards from '../commons/GridCards';
import {Row} from 'antd';
import Favorite from './Sections/Favorite';





function MovieDetail(props) {
    let movieId = props.match.params.movieId
    const [Movie, setMovie] =useState([])
    const [Casts, setCasts] = useState([])
    const [ActorToggle, setActorToggle] = useState(false)
    //이니셜 스테이트는 어레이로 줄 때 []이런식으로 
    useEffect(() => {
        let endpointCrew = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`

        let endpointInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}`
        
        //이부분은 항상 로드되었을때의 동작을 넣어주면 된다
        fetch(endpointInfo)
        .then(response => response.json()) 
        .then(response => {
            console.log(response)

            setMovie(response)
        })

        fetch(endpointCrew)
        .then(response => response.json()) 
        .then(response => {
            setCasts(response.cast)
            //우리는 crew는 필요없기 때문에 cast만 지정한다
        })
    }, [])

    const toggleActorView =() =>{
        setActorToggle(!ActorToggle)
    }
    return (
        <div>
             {/*Header*/}
        <MainImage 
        image={`${IMAGE_BASE_URL}w1280${Movie.backdrop_path}`}
        title={Movie.original_title}
        //제목과 설명을 추가한것
        text={Movie.overview}

        />
             {/*Body*/}
             <div style={{width:'85%', margin: '1rem auto'}}>
                    <div style={{display:'flex', justifyContent:'flex-end'}}>
                        <Favorite  movieInfo={Movie} movieId={movieId} userFrom={localStorage.getItem('userId')}/>
                    </div>
                    //favorir에서 필요한 정보들을 movieId={movieId}이런식으로 보내주는것이다.
                    //userFrom은 로그인시 Id가 저장되어있는 로컬저장소에서 가져오는것이다.
                    //이런식으로 보내준다면 favorite에서 props로 사용가능하다

                    {/*Movie Info*/}
                <MovieInfo 
                    movie={Movie}
                
                />

                    <br />
                    {/*Action Grid*/}

                    <div style={{display:'flex', justifyContent: 'center', margin: '2rem'}}>
                        <button onClick={toggleActorView}> Toggle Actor View</button>
                    </div>
                {ActorToggle &&//false상태인 actortoggle이 true일때에만 아래의 문장이 실행되는 의미
                <Row gutter={[16, 16]}>
                //무비스에는 무비의 정보들이 있고 map을 이용해서 하나하나의 무비들을 사용가능시킨다.
    
                {Casts && Casts.map((cast, index)=>(
                    <React.Fragment key={index}>
                    <GridCards 
                    image={cast.profile_path ?
                    `${IMAGE_BASE_URL}w500${cast.profile_path}` : null}
                    
                    characterName={cast.name}//배우의 이름
                    />
                    </React.Fragment>
                ))}

            </Row>
                }

             </div>
        </div>
    )
}

export default MovieDetail
