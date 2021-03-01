import React, { useState, useEffect } from 'react';
import SingleComment from './SingleComment';

function ReplyComment(props) {

    const [ChildCommentNumber, setChildCommentNumber] = useState(0)
    const [OpenReplyComments, setOpenReplyComments] = useState(false)

    useEffect(() => {
        let commentNumber = 0;

        props.commentLists.map((comment) => {
            if(comment.responseTo === props.parentCommentId) {
                commentNumber++
            }
        })

        setChildCommentNumber(commentNumber)
    }, [props.commentLists])
    // commentList부분이 바뀔때마다 이걸 한 번 더 실행하라 
 
    const  renderReplyComment = (parentCommentId) =>
        props.commentLists.map((comment, index) => ( 
            <React.Fragment>
            {
                // 첫번째 depth은 렌더링이 안되도록
                    comment.responseTo === parentCommentId &&
                    <div style={{ width: '80%', marginLeft: '40px' }}>
                        <SingleComment refreshFunction={props.refreshFunction} comment={comment} postId={props.videoId} />
                        <ReplyComment refreshFunction={props.refreshFunction} commentLists={props.commentLists} postId={props.videoId} parentCommentId={comment._id} />
                    </div>
            }   
            </React.Fragment>
        ))

    const onHandleChange = () => {
        setOpenReplyComments(!OpenReplyComments)
    }


    return (
        <div>
            {ChildCommentNumber > 0 &&
                <p style={{ fontSize: '14px', margin: 0, color: 'gray'}} onClick={onHandleChange}>
                View {ChildCommentNumber} more comment(s)
            </p>
            }

            {OpenReplyComments &&
                renderReplyComment(props.parentCommentId)
            }
        </div>
    )
}

export default ReplyComment
