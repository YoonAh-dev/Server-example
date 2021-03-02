import React, { useEffect, useState } from 'react';
import { Tooltip } from 'antd';
import Icon from '@ant-design/icons';
import Axios from 'axios';

function LikeDislikes(props) {

    const [Likes, setLikes] = useState(0)
    const [Dislikes, setDislikes] = useState(0)
    const [LikeAction, setLikeAction] = useState(null)
    const [DislikeAction, setDislikeAction] = useState(null)

    let variable = {}

    if(props.video) {
        variable = { videoId: props.videoId, userId: props.userId }
    } else {
        variable = { commentId: props.commentId, userId: props.userId }
    }

    

    useEffect(() => {
        Axios.post('/api/like/getLikes', variable)
            .then(response => {
                if(response.data.success) {
                    // 얼마나 많은 좋아요를 받았는지
                    setLikes(response.data.likes.length)
                    // 내가 이미 그 좋아요를 눌렀는지
                    response.data.likes.map(like => {
                        if(like.userId === props.userId) {
                            setLikeAction('liked')
                        }
                    })
                } else {
                    alert('Likes에 정보를 가져오지 못했습니다.')
                }
            })

        Axios.post('/api/like/getDislikes', variable)
        .then(response => {
            if(response.data.success) {
                // 얼마나 많은 싫어요를 받았는지
                setDislikes(response.data.dislikes.length)
                // 내가 이미 그 싫어요를 눌렀는지
                response.data.dislikes.map(dislike => {
                    if(dislike.userId === props.userId) {
                        setDislikeAction('disliked')
                    }
                })
            } else {
                alert('Dislikes에 정보를 가져오지 못했습니다.')
            }
        })
    }, [])

    const onLike = () => {
        if(LikeAction === null) {
            Axios.post('/api/like/upLike', variable)
                .then(response => {
                    if(response.data.success) {
                        setLikes(Likes + 1)
                        setLikeAction('liked')

                        if(DislikeAction !== null) {
                            setDislikeAction(null)
                            setDislikes(Dislikes - 1)
                        }
                    } else {
                        alert('Like를 올리지 못했습니다.')
                    }
                })
        } else {
            Axios.post('/api/like/unLike', variable)
                .then(response => {
                    if(response.data.success) {
                        setLikes(Likes - 1)
                        setLikeAction(null)
                    } else {
                        alert('Like를 내리지 못했습니다.')
                    }
                })
        }
    }

    const onDisLike = () => {
        if(DislikeAction !== null) {
            Axios.post('/api/like/unDislike', variable)
                .then(response => {
                    if(response.data.success) {
                        setDislikes(Dislikes - 1)
                        setDislikeAction(null)
                    } else {
                        alert('dislike을 지우지 못했습니다.')
                    }
                })
        } else {
            Axios.post('/api/like/upDislike', variable)
                .then(response => {
                    if(response.data.success) {
                        setDislikes(Dislikes + 1)
                        setDislikeAction('disliked')

                        if(LikeAction !== null) {
                            setLikeAction(null)
                            setLikes(Likes - 1)
                        }
                    } else {
                        alert('dislike을 올리지 못했습니다.')
                    }
                })
        }
    }

    return (
        <div>
           <span key="comment-basic-like">
                <button 
                    style={{ 
                        backgroundColor: `${LikeAction === 'liked' ? 'yellow' : 'white'}`, borderRadius: '4px',
                        color: 'white',
                        fontWeight: '500', fontSize: '1rem', textTransform: 'uppercase'
                    }}
                    onClick={onLike}
                > 👍
                </button>
                 <span style={{ paddingLeft: '8px', cursor: 'auto' }}> {Likes} </span>
           </span> &nbsp; &nbsp;

           <span key="comment-basic-dislike">
                <button 
                    style={{ 
                        backgroundColor: `${DislikeAction === 'disliked' ? 'yellow' : 'white'}`, borderRadius: '4px',
                        color: 'white',
                        fontWeight: '500', fontSize: '1rem', textTransform: 'uppercase'
                    }}
                    onClick={onDisLike}
                > 👎
                </button>
                 <span style={{ paddingLeft: '8px', cursor: 'auto' }}> {Dislikes} </span>
           </span> &nbsp; &nbsp;
        </div>
    )
}

export default LikeDislikes
