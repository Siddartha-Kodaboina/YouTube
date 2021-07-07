import React,{useEffect,useState} from 'react';
import { Avatar } from '@material-ui/core';
import './SearchVideoCard.css';
import useWindowDimensions from '../customHooks/useWindowDimentions';
import indianStyle from '../functions/IndianStyle';
import GetAgo from '../functions/GetAgo';
import videosObj from '../videos.json';
import firebaseObj from '../firebaseData.json';
import Error from './Error';


const SearchVideoCard = ({video}) => {
    const vid=video.snippet;
    const [videoDetailes, setVideoDetailes] = useState(videosObj.items);
    const [avatar, setAvatar] = useState([]);
    const { height, width } = useWindowDimensions();
    const [foundError, setFoundError] = useState(false);

    const searchVideoCard__style={
        flexDirection:(width<=768)?'column':'row'
    }

    const fetchVideoDetailes=async()=>{
        const statisticsUrl=`https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${video.id.videoId}&&key=${firebaseObj.apiKey}`;
        const statisticsUrlResponse=await fetch(statisticsUrl);
        const statisticsUrlRes=await statisticsUrlResponse.json();
        setVideoDetailes(statisticsUrlRes.items);
        //console.log("dheeni detailes vochinayoch",statisticsUrlRes);

        const avatarUrl=`https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${statisticsUrlRes.items[0].snippet.channelId}&key=${firebaseObj.apiKey}`;
        const avatarUrlResponse=await fetch(avatarUrl);
        const avatarUrlRes=await avatarUrlResponse.json();
        setAvatar(avatarUrlRes.items);
        //console.log("dheeni detailes vochinayoch",avatarUrlRes);
    }


    useEffect(()=>{
        try {
            fetchVideoDetailes();
        } catch (error) {
            setFoundError(true);
        }
        
    },[video.id.videoId]);
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
        <div className='searchVideoCard' style={searchVideoCard__style}>
            <div className="thumbnail__container">
                <img src={vid.thumbnails.high.url} alt={vid.title} />
            </div>
            <div className="searchVideoCard__info">
                <div className='searchVideoCard__text'>
                    <h4>{(vid.title).length>170?(vid.title).substr(0,170)+'...':(vid.title)}</h4>
                    
                    <p>
                        {videoDetailes[0].statistics && indianStyle(videoDetailes[0].statistics.viewCount)} views 
                        {'   •   '}
                        {videoDetailes[0].statistics && GetAgo(videoDetailes[0].snippet.publishedAt)}
                    </p>
                </div>
                <div className='searchVideoCard__avatar'>
                    <Avatar src={avatar[0] && avatar[0].snippet.thumbnails.high.url}
                            alt='Theme'
                            className='avatar'
                    />
                    <p style={{fontWeight:'500'}}>
                        {vid.channelTitle}
                    </p>
                </div>
                <div>
                    <p style={{marginTop:'10px'}}>
                        {vid.description}
                    </p>
                </div>
                
            </div>
        </div>
    )
}

export default SearchVideoCard
