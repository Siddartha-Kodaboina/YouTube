import React from 'react'
import { createContext,useState } from 'react'

export const SearchContext=createContext();

export const SearchProvider = (props) => {
    const [query, setQuery] = useState('');
    const [display, setDisplay] = useState('block');
    return (
        <SearchContext.Provider value={{query, setQuery,display, setDisplay}}>
            {props.children}
        </SearchContext.Provider>
    )
}


