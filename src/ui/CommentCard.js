import React,{useState,useEffect} from 'react';
import { Avatar } from '@material-ui/core';
import { ThumbUpAlt,ThumbDownAlt,Reply } from '@material-ui/icons';
import {getDate} from '../functions/GetDate.js';
import GetAgo from '../functions/GetAgo.js';
import './CommentCard.css';
import firebaseObj from '../firebaseData.json';
import Error from './Error';

const CommentCard = ({comment}) => {
    const [commentAuthor, setCommentAuthor] = useState([]);
    const [foundError, setFoundError] = useState(false);

    const fetchCommentData=async ()=>{
        const url=`https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${comment.snippet.topLevelComment.snippet.authorChannelId.value}&&key=${firebaseObj.apiKey}`;
        const response=await fetch(url);
        const res=await response.json();
        setCommentAuthor(res.items);
        //console.log('******commenst channel id tho data load ayindi',res);
    }
    useEffect(() => {
        try {
            fetchCommentData();
        } catch (error) {
            setFoundError(true);
        }
        
    }, [comment.snippet.topLevelComment.snippet.authorChannelId.value]);
    //console.log(comment);
    if(foundError){
        return  <Error error={
            {
                "error":
                {
                    "message":"Check your Internet Connection",
                    "errors":[
                        {
                            "reason":"Internet Problem"
                        }
                    ]
                }
            }
        }/>
    }
    return (
        <div className='comment'>
            <Avatar src={commentAuthor[0] && commentAuthor[0].snippet.thumbnails.high.url}
                    alt='Theme'
                    className='comment__avatar'
            />
            <div className="comment_right">
                <div className='comment__info'>
                    <div className='comment__info__title'>
                        <h4>
                            {commentAuthor[0] && commentAuthor[0].snippet.title}
                        </h4>
                        <p>
                            {GetAgo(comment.snippet.topLevelComment.snippet.publishedAt)}
                        </p>
                    </div>
                    <div className='comment__info__description'>
                        <p>
                            {
                                (comment.snippet.topLevelComment.snippet.textDisplay).length>150?
                                (comment.snippet.topLevelComment.snippet.textDisplay).substring(0,150)+'...':
                                (comment.snippet.topLevelComment.snippet.textDisplay)
                            }
                        </p>
                    </div>
                    <div className='comment__info__icons'>
                        <div className='comment__info__icons__div'>
                            <ThumbUpAlt className='comment__info__icons__div__icon'/>
                            <p>
                                {comment.snippet.topLevelComment.snippet.likeCount}
                            </p>
                        </div>
                        <div className='comment__info__icons__div'>
                            <ThumbDownAlt className='comment__info__icons__div__icon'/>
                            <p>
                                0
                            </p>
                        </div>
                        <div className='comment__info__icons__div'>
                            <Reply className='comment__info__icons__div__icon'/>
                            <p>
                                {comment.snippet.totalReplyCount}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CommentCard
