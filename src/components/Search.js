import React,{ useState, useContext, useEffect} from 'react';
import { Tune } from '@material-ui/icons';
import './Search.css';
import videoObj from '../videos.json'; //local object
import SearchVideoCard from '../ui/SearchVideoCard';
import { SearchContext } from '../SearchContext';
import {Link} from 'react-router-dom';
import Loader from '../ui/Loader';
import Sidebar from '../ui/Sidebar';
import useWindowDimensions from '../customHooks/useWindowDimentions';
import Error from '../ui/Error';
import firebaseObj from '../firebaseData.json';


const Search = ({match}) => {

    const [videos, setVideos] = useState([]);//local videos
    const {query, setQuery,display, setDisplay}= useContext(SearchContext);
    const [loading, setLoading] = useState(true);
    const { height, width } = useWindowDimensions();
    // const [foundError, setFoundError] = useState(false);
    const [obj, setObj] = useState(null);
    const [foundError, setFoundError] = useState(false);
    // //console.log(firebase);
    // //console.log('in search',query,match);
    const fetchVideos = async () => {
        const url=`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&order=viewCount&publishedAfter=2020-01-01T00:00:00Z&q=${match.params.query}&regionCode=IN&type=video&key=${firebaseObj.apiKey}`;
        const response=await fetch(url);
        const res=await response.json();
        //console.log('everything is noise till now',res);
        if(res.hasOwnProperty('items')){
            setVideos(res.items);
        }
        else{
            setObj(res);
        }
        
    }
    useEffect(() => {
        setDisplay('block');
        //console.log("setted");
    }, []);

    useEffect(() => {
        setLoading(true);
        try {
            fetchVideos();
        } catch (error) {
            setFoundError(true);
        }
        setLoading(false);
    }, [match.params.query]);

    const search__style={
        width:(width<=768)?width:'inherit',
        marginLeft:(width<=768)?'10px':'20vw',
        marginRight:'10px',
        marginTop: (width<=768)?'0vh':'-90vh',
        // justifyContent:'center'
    }
    const search__videos__style={
        gridAutoRows: (width<=768)?'minmax(70vh,200px)':"minmax(18vw,180px)"
    }
    if(loading){ 
        return <Loader />
    }
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
    //console.log('object  ',obj);
    if(obj!=null){
        //console.log('error found');
        return <Error error={obj}/>
    }
    return (
        <div className='search' style={search__style}>
            <div className="search__top">
                <Tune className='search__icon'/>
                <h4>Filters</h4>
                
            </div>
            <hr className='hr'/>
            {
                videos.length!==0 &&
                <div className="search__videos" style={search__videos__style}>
                    {
                        videos.map((item,index)=>(
                            <Link to={`/watch/${item.id.videoId}`}
                                style={{textDecoration:'none'}}>
                                <SearchVideoCard key={index} video={item}/>
                            </Link>
                        ))
                    }
                </div>
            }
            {
                videos.length===0 && 
                <div style={{color:'black'}}>No Videos Found</div>
            }
        </div>
    )
}

export default Search
