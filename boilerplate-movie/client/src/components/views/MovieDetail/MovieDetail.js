import React, { useEffect } from 'react'
import { API_URL, API_KEY } from '../../Config';

function MovieDetail(props) {
    let movieId = props.match.params.movieId

    useEffect(() => {
        const endPointCrew = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`
        const endPointInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}`

        fetch(endPointInfo)
            .then(response => response.json())
            .then(response => {
                console.log(response)
            })
    }, [])

    return (
        <div>
            
        </div>
    )
}

export default MovieDetail
