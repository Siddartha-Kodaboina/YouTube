import React,{useState, useContext, useEffect} from 'react';
import './Watch.css';
import videosObj from '../videos.json';
import WatchVideoCard from '../ui/WatchVideoCard';
import { SearchContext } from '../SearchContext';
import Loader from '../ui/Loader';
import { ThumbUpAlt, ThumbDownAlt } from '@material-ui/icons';
import { MoreHorizSharp } from '@material-ui/icons';
import { PlaylistAdd } from '@material-ui/icons';
import { Reply } from '@material-ui/icons';
import { Avatar } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { numberFormat } from '../functions/NumberFormat';
import CommentCard from '../ui/CommentCard';
import { getDate } from '../functions/GetDate';
import useWindowDimensions from '../customHooks/useWindowDimentions';
import indianStyle from '../functions/IndianStyle';
import Error from '../ui/Error';
import firebaseObj from '../firebaseData.json';



const Watch = ({match}) => {
    const [videos, setVideos] = useState(videosObj.items);
    const {query, setQuery,display, setDisplay}=useContext(SearchContext);
    const [videoDetailes, setVideoDetailes] = useState(videosObj.items);
    const [loading, setLoading] = useState(true);
    const [comments,setComments]=useState([]);
    const [avatar, setAvatar] = useState([]);
    const { height, width } = useWindowDimensions();
    const [obj, setObj] = useState(null);
    const [foundError, setFoundError] = useState(false);
    


    
    // setDisplay('none');
    const fetchVideoDetailes=async()=>{
        const statisticsUrl=`https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${match.params.id}&&key=${firebaseObj.apiKey}`;
        const statisticsUrlResponse=await fetch(statisticsUrl);
        const statisticsUrlRes=await statisticsUrlResponse.json();
        
        if(statisticsUrlRes.hasOwnProperty('items')){
            setVideoDetailes(statisticsUrlRes.items);
            //console.log("dheeni detailes vochinayoch",statisticsUrlRes);
            
            const commentsUrl=`https://www.googleapis.com/youtube/v3/commentThreads?key=${firebaseObj.apiKey}&textFormat=plainText&part=snippet&videoId=${match.params.id}&maxResults=5`;
            const commentsUrlResponse=await fetch(commentsUrl);
            const commentsUrlRes=await commentsUrlResponse.json();
            setComments(commentsUrlRes.items);
            //console.log("dheeni(comments) detailes vochinayoch",commentsUrlRes);

            const avatarUrl=`https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${statisticsUrlRes.items[0].snippet.channelId}&key=${firebaseObj.apiKey}`;
            const avatarUrlResponse=await fetch(avatarUrl);
            const avatarUrlRes=await avatarUrlResponse.json();
            setAvatar(avatarUrlRes.items);
            //console.log("dheeni detailes vochinayoch",avatarUrlRes);
            //console.log(statisticsUrlRes.items[0].snippet.channelTitle);
            const videosUrl=`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&order=viewCount&publishedAfter=2020-01-01T00:00:00Z&q=${statisticsUrlRes.items[0].snippet.channelTitle}&regionCode=IN&type=video&key=${firebaseObj.apiKey}`;
            const videosUrlResponse=await fetch(videosUrl);
            const videosUrlRes=await videosUrlResponse.json();
            if(videosUrlRes.items!=[]) {
                //console.log('Empty',videosUrlRes.items);
                setVideos(videosUrlRes.items);
            }
            //console.log("dheeni(Videos) detailes vochinayoch",videosUrlRes);
        }
        else{
            setObj(statisticsUrlRes);
        }
        
    }

    useEffect(()=>{
        setLoading(true);
        setDisplay('none');
        //console.log("setted");
        try {
            fetchVideoDetailes();
        } catch (error) {
            setFoundError(true);
        }
        
        //console.log('videoDetailes emaindhi',videoDetailes);
        setLoading(false);
    },[match.params.id]);
    // //console.log('videoDetailes emaindhi',videoDetailes);
    if(loading){
        return <Loader />
    }
    //console.log('videoDetailes emaindhi',videoDetailes);
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
    // const watch__style={
    //     width:(width<=768)?width:width,
    //     display:(width<=768)?'block':'flex',
    // }
        
    
    // const left__style={
    //     // flex:(width<=768)?1:0.7
    // }


    // const suggestions__style={
    //     // flex:(width<=768)?1:0.3
    // }
    return (
        <div className='watch' >
            <div className="left" >
                <div className="watch_box">
                    <div className="watch__frame">
                        <iframe 
                            // width="420" height="315"
                            className='watch__frame__iframe'
                            sandbox='allow-same-origin allow-forms allow-popups allow-scripts allow-presentation'
                            src={`https://www.youtube.com/embed/${match.params.id}?autoplay=1&mute=0`} 
                            allow='autoplay; encrypted-media'
                            allowfullscreen="allowfullscreen"
                        />
                    </div>
                    <div className="watch__box__detailes">
                        <h3>
                            {videoDetailes[0].snippet.title}
                        </h3>
                    </div>
                    <div className="watch__box__texts__icons">
                        <div className="watch__box__texts">
                            <p>
                                {videoDetailes[0].statistics && indianStyle(videoDetailes[0].statistics.viewCount)} views 
                                {'   •   '}
                                {videoDetailes[0].statistics && getDate(videoDetailes[0].snippet.publishedAt)}
                            </p>
                        </div>
                        <div className="watch__box__icons">
                            <div className="watch__box__icons__icon">
                                <ThumbUpAlt className='icon'/>
                                <p>
                                    {videoDetailes[0].statistics && numberFormat(videoDetailes[0].statistics.likeCount)}
                                </p>
                            </div>
                            <div className="watch__box__icons__icon">
                                <ThumbDownAlt className='icon'/>
                                <p>
                                    {videoDetailes[0].statistics && numberFormat(videoDetailes[0].statistics.dislikeCount)}
                                </p>
                            </div>
                            <div className="watch__box__icons__icon">
                                <Reply className='icon'/>
                                <p>
                                    SHARE
                                </p>
                            </div>
                            <div className="watch__box__icons__icon">
                                <PlaylistAdd className='icon'/>
                                <p>
                                    SAVE
                                </p>
                            </div>
                            <div className="watch__box__icons__icon">
                                <MoreHorizSharp className='icon'/>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className="channel">
                        <div className='channel__avatar'>
                            <Avatar src={avatar[0] && avatar[0].snippet.thumbnails.high.url}
                                    alt='Theme'
                                    className='avatar'
                            />
                            <div className="channel__avatar__detailes">
                                <h4>
                                    {avatar[0] &&avatar[0].snippet.title}
                                </h4>
                                <p>
                                    {avatar[0] && numberFormat(avatar[0].statistics.subscriberCount)}
                                    { ' Subscribers'}
                                </p>
                            </div>
                        </div>
                        
                        <div className='channel__button'>
                            <button> SUBSCRIBE </button>
                        </div>
                        
                    </div>
                    <hr />
                </div>
                
                <div className="comments">
                    {   comments[0] &&
                        comments.map((comment,idx)=>(
                            <CommentCard key={idx} comment={comment}></CommentCard>
                        ))
                    }
                </div>
            </div>
            <div className="suggestions" >

                {
                    videos && 
                    videos.map((video,index)=>(
                        <Link to={`/watch/${video.id.videoId}`} style={{textDecoration:'none'}} >
                            <WatchVideoCard video={video} key={index} />
                        </Link>
                    ))
                    
                }
            </div>
        </div>
    )
}

export default Watch;
