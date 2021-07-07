import React,{ useState , useEffect,useContext}  from 'react'
import './Recommended.css';
import Loader from './Loader';
import VideoCard from './VideoCard';
import { SearchContext } from '../SearchContext';
import videoObj from '../videos.json';
import MessiVideosObj from '../MessiVideos.json';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import useWindowDimensions from '../customHooks/useWindowDimentions';

const Recommended = () => {
    const [loading, setLoading] = useState(true);
    const [videos, setVideos] = useState(MessiVideosObj.items);
    const {query, setQuery,display, setDisplay}= useContext(SearchContext);
    const { height, width } = useWindowDimensions();
    // const [query, setQuery] = useContext(SearchContext);
    // const fetchVideos=async ()=>{
    //     setLoading(true);
    //     const url=`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&order=viewCount&publishedAfter=2020-01-01T00:00:00Z&q=${query}&regionCode=IN&type=video&key=AIzaSyDLpccLGXaltXXN_EIRQsKCmCm4jaGsmIg`;
    //     //console.log(url);
    //     const response=await fetch(url);
    //     const res=await response.json();
    //     setVideos(res.items);
    //     setLoading(false);
    // }

    // useEffect(() => {
    //     fetchVideos();
    // }, [query])
    // //console.log(query);
    // if(loading){
    //     return (
    //         <Loader />
    //     )
    // }
    useEffect(() => {
        setDisplay('block');
        //console.log("setted");
    }, []);
    
    const recommendStyle={
        marginLeft:(width<=768)?'10px':'20vw',
        marginRight:'10px',
        marginTop: (width<=768)?'0vh':'-90vh',
        justifyContent:'center'

    }
    return (
        <div class='recommended' style={recommendStyle}>
            <h1>Recommended</h1>
            <div className="recommended__videos">
                {
                    videos.map((video,index)=>(
                        <Link to={`/watch/${video.id.videoId}`}
                            style={{textDecoration:'none',color:'none'}}>
                            <VideoCard key={index} video={video} videoIndex={index}/>
                        </Link>
                    ))
                }
            </div>
        </div>
    )
}

export default Recommended
