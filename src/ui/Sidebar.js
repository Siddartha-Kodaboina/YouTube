import React,{useContext,useEffect,useState} from 'react';
import './Sidebar.css';
import { Home } from '@material-ui/icons';
import { Subscriptions } from '@material-ui/icons';
import { Whatshot } from '@material-ui/icons';
import { VideoLibrary } from '@material-ui/icons';
import { History } from '@material-ui/icons';
import { OndemandVideo } from '@material-ui/icons';
import { WatchLater } from '@material-ui/icons';
import { ThumbUpAltOutlined } from '@material-ui/icons';
import { ExpandMoreOutlined } from '@material-ui/icons';
import SidebarRow from './SidebarRow';
import { SearchContext } from '../SearchContext';

const Sidebar = () => {
    const {query, setQuery,display, setDisplay}=useContext(SearchContext);
    const [modeChanger, setModeChanger] = useState('');
    useEffect(() => {
        setModeChanger(display);
        //console.log("in sidebar");
    }, [modeChanger]);
    //console.log("ini sidebar",display);
    const sidebar__style={
        display:display
    }
    return (
        <div className='sidebar' style={sidebar__style}>
            <div className="sidebar__inner">
                <SidebarRow Icon={Home} title='Home' selected/>
                <SidebarRow Icon={Whatshot} title='Trending' />
                <SidebarRow Icon={Subscriptions} title='Subscriptions' />
                <hr />
                <SidebarRow Icon={VideoLibrary} title='Library' />
                <SidebarRow Icon={History} title='History' />
                <SidebarRow Icon={OndemandVideo} title='Your videos' />
                <SidebarRow Icon={WatchLater} title='Watch Later' />
                <SidebarRow Icon={ThumbUpAltOutlined} title='Liked videos' />
                <SidebarRow Icon={ExpandMoreOutlined} title='Show more' />
                <hr />
            </div>
        </div>
    )
}

export default Sidebar
