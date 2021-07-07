import React,{useEffect,useState} from 'react';
import { Avatar } from '@material-ui/core';
import './VideoCard.css';
import GetAgo from '../functions/GetAgo';
import indianStyle from '../functions/IndianStyle';
import videosObj from '../MessiVideos.json';
import Error from './Error';
import firebaseObj from '../firebaseData.json';

const VideoCard = ({video,videoIndex}) => {
    const vid=video.snippet;
    const [avatarSrc, setAvatarSrc] = useState('');
    const [avatarObj, setAvatarObj] = useState(null);
    const [videoDetailes, setVideoDetailes] = useState(videosObj.items);
    const [foundError, setFoundError] = useState(false);
    
    const fetchAvatar=async ()=>{
        const statisticsUrl=`https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${video.id.videoId}&&key=${firebaseObj.apiKey}`;
        const statisticsUrlResponse=await fetch(statisticsUrl);
        const statisticsUrlRes=await statisticsUrlResponse.json();
        if(statisticsUrlRes.hasOwnProperty('items')){
            setVideoDetailes(statisticsUrlRes.items);
        }
        else{
            setFoundError(true);
        }
        //console.log("dheeni detailes vochinayoch",statisticsUrlRes);

        const avatarUrl=`https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${vid.channelId}&fields=items%2Fsnippet%2Fthumbnails&key=${firebaseObj.apiKey}`;
        const response=await fetch(avatarUrl);
        const res=await response.json();
        //console.log(res);
        setAvatarObj(res);
        if(res.hasOwnProperty('items')){
            setAvatarSrc(res.items[0].snippet.thumbnails.high.url);
        }
        else{
            setFoundError(true);
        }
        
    }

    useEffect(() => {
        try {
            fetchAvatar();
        } catch (error) {
            //console.log(videoIndex);
            //console.log(avatarObj);
            setFoundError(true);
        }
    }, []);
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
        <div class='videoCard'>
            <div className="videoCard__img__container">
                <img src={vid.thumbnails.high.url} alt={vid.title} />
            </div>
            <div className="videoCard__info">
                <Avatar src={avatarSrc}
                        alt='Theme'
                        className='avatar'
                />
                <div className='videoCard__text'>
                    <h4>{(vid.title).length>45?(vid.title).substr(0,50)+'...':(vid.title)}</h4>
                    <p>
                        {vid.channelTitle}
                    </p>
                    <p>
                        {videoDetailes[0].statistics && indianStyle(videoDetailes[0].statistics.viewCount)} 
                        {' • '} 
                        {GetAgo(vid.publishedAt)}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default VideoCard;
