import React from 'react';


function MainImage(props) {
    return(
        <div style={{ background: `linear-gradient(to bottom, rgba(0, 0, 0, 0)
        39%, rgba(0, 0, 0, 0)
        41%, rgba(0, 0, 0, 0.65)
        100%),
        url('${props.image}'), #1c1c1c`,
            height: '500px',
            backgroundSize: '100%, cover',
            backgroundPosition: 'center, center',
            width: '100%',
            position: 'relative'
        }}>
            <div>
                <div style={{position: 'absolute', maxWidth: '500px', bottom: '2rem', marginLeft: '2rem'}}>
                    
                    <h2 style={{color: 'white'}}> {props.title}</h2>

                    <p style={{color: 'white', fontsize: '1rem'}}>{props.text}</p>
                </div>
            </div>
        </div>

                    //h2의 props.title은 랜딩페이지에서 만든 title을 가져온것이다


    )
}

export default MainImage