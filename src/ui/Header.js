import React,{useState,useContext} from 'react';
import { Menu, Search, VideoCall, Apps, Notifications } from '@material-ui/icons';
import { Avatar } from '@material-ui/core';
import Logo from '../images/Logo.svg';
// import { SearchContext } from '../SearchContext';
import { Link,useHistory } from 'react-router-dom';
import './Header.css';
import useWindowDimensions from '../customHooks/useWindowDimentions';


const Header = ({}) => {
    // const [query, setQuery] = useContext(SearchContext);
    const history=useHistory();
    const [searchText, setSearchText] = useState('');
    const { height, width } = useWindowDimensions();
    //console.log('in heading',searchText);
    const header__input__style={
        width:(width<=468)?'30%':'50%'
    }

    const searchIcon__style={
        width:(width<=468)?'25px':'50px'
    }

    

    const handleClick=()=>{
        if(searchText!=''){
            history.push(`/results/${searchText}`);
        }
    }
    const handleKeyPress=(target)=>{
        // const { value } = this.state;
        if(target.charCode==13){
            handleClick();
        }
    }
    return (
        <div className='header'>
            <div>
                <Menu className='header__icon'/>
                <Link to='/'><img src={Logo} alt="YouTube" className='header__logo'/></Link>
            </div>
            <div className='header__input' style={header__input__style}>
                <input type="text" 
                    value={searchText}
                    onChange={(e)=>setSearchText(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder='Search'
                    autoCorrect='false'
                    spellCheck='false'
                />
                {/* <Link 
                    to={`/results/${searchText}`} className='Header__search__icon_link'>
                    <Search className='searchIcon' style={searchIcon__style}/>
                </Link> */}
                <button className='Header__search__icon_link' type="text" onClick={handleClick}>
                    <Search className='searchIcon' style={searchIcon__style}/>
                </button>
            </div>
            <div>
                {width>768 && <VideoCall className='header__icon'/>}
                {width>768 && <Apps className='header__icon'/>}
                {width>768 && <Notifications className='header__icon'/>}
                {width>768 &&<Avatar src='https://yt3.ggpht.com/yti/APfAmoF98l6DkPjzepjqO7uw5EBaobYAH7l_rhNZUoCY=s88-c-k-c0x00ffffff-no-rj-mo' 
                    alt='Theme'
                    className='avatar'
                />}
            </div>
        </div>
    )
}   

export default Header
