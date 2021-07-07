import React,{useEffect,useState} from 'react';
import './WatchVideoCard.css';
import { numberFormat } from '../functions/NumberFormat';
import GetAgo from '../functions/GetAgo';
import videosObj from '../videos.json';
import Error from './Error';
import firebaseObj from '../firebaseData.json';

const WatchVideoCard = ({video}) => {
    const vid=video.snippet;
    const [videoDetailes, setVideoDetailes] = useState(videosObj.items);
    const [obj, setObj] = useState(null);
    const [foundError, setFoundError] = useState(false);

    const fetchVideoDetailes=async()=>{
        const statisticsUrl=`https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${video.id.videoId}&&key=${firebaseObj.apiKey}`;
        const statisticsUrlResponse=await fetch(statisticsUrl);
        const statisticsUrlRes=await statisticsUrlResponse.json();
        if(statisticsUrlRes.hasOwnProperty('items')){
            setVideoDetailes(statisticsUrlRes.items);
        }
        else{
            setObj(statisticsUrlRes.items);
        }
        //console.log("dheeni detailes vochinayoch",statisticsUrlRes);
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
    if(obj!=null){
        //console.log('error found');
        return <Error error={obj}/>
    }

    return (
        <div className='watchVideoCard'>
            <div className='watchVideoCard__frame'>
                <img src={vid.thumbnails.high.url} alt={vid.title} />
            </div>
            <div className="watchVideoCard__info">
                <h4>
                    {
                        (vid.title).length>40?
                        (vid.title).substring(0,40)+'...':
                        (vid.title)
                    }
                </h4>
                <p>
                    {vid.channelTitle}
                </p>
                <p>
                    {videoDetailes[0].statistics && numberFormat(videoDetailes[0].statistics.viewCount)} views 
                    {'   •   '}
                    {videoDetailes[0].statistics && GetAgo(videoDetailes[0].snippet.publishedAt)}
                </p>
            </div>
        </div>
    )
}

export default WatchVideoCard
