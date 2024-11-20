import React, { createContext, useContext, useState } from 'react';

// Create the context
const MyListContext = createContext();

// Create a provider component
export const MyListProvider = ({ children }) => {
  const [toWatch, setToWatch] = useState([]);
  const [watched, setWatched] = useState([]);

  const addToWatch = (movie) => {
    setToWatch((prevList) => [...prevList, movie]);
  };

  const addWatched = (movie) => {
    setWatched((prevList) => [...prevList, movie]);
  };

  return (
    <MyListContext.Provider value={{ toWatch, watched, addToWatch, addWatched }}>
      {children}
    </MyListContext.Provider>
  );
};

// Custom hook to access the context
export const useMyList = () => useContext(MyListContext);
 