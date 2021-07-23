import React from 'react'
import {Col } from 'antd';
//화면이 줄어들때 화면에 나오는 영화의 개수가 줄어드는것을 표혀하기 위한 것



function GridCards(props) {

    if(props.landingPage) {
        return (
            <Col lg={6} md={8} xs={24}>
            <div style={{position: 'relative'}}>
                <a href={`/movie/${props.movieId}`}>
                    <img style={{width:'100%', height:'320px'}} src={props.image} alt={props.movieName}/>
                </a>
            </div>
                        
            </Col>
        )
    }else{
        return(
            <Col lg={6} md={8} xs={24}>
            <div style={{position: 'relative'}}>
          
                    <img style={{width:'100%', height:'320px'}} src={props.image} alt={props.characterName}/>

            </div>
                        
            </Col>
        )
        
    }
    
}

export default GridCards
