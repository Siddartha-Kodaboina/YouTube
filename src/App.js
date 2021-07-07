import './App.css';
import Header from './ui/Header';
import {  SearchProvider } from './SearchContext';
import {BrowserRouter as Router , Switch, Route} from 'react-router-dom';
import Home from './components/Home';
import Search from './components/Search';
import Sidebar from './ui/Sidebar';
import Watch from './components/Watch';
import useWindowDimensions from './customHooks/useWindowDimentions';
function App() {
    const { height, width } = useWindowDimensions();
    return (
        <div className="app">
            <SearchProvider >
                <Router>
                    <Header />
                    {width>768 && <Sidebar />}
                    <Switch>
                        <Route path='/' exact component={Home} /> 
                        <Route path='/results/:query'  component={Search} /> {/*:search_query*/}
                        <Route path='/watch/:id'  component={Watch} />
                        <Route path='/'  render={()=><h1>404</h1>} /> 
                    </Switch>
                </Router>
            </SearchProvider>
        </div>
        
    );
}

export default App;
