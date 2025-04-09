
import { useState } from 'react';
import {sculptureList} from './data.js'
function App() {
const[index,setIndex]= useState(0);
const[showMore,setShowMore]= useState(false);
  let sculpture = sculptureList[index];
function handleNextClick() {
  if(index<sculptureList.length-1){ 
    setIndex(index +1);
   }
   else{
    setIndex(0);
   }
  }
function handlePreviousClick() {
 if(index>0){
    setIndex(index -1);
  }
  else{
    setIndex(sculptureList.length-1);
  }
}
function handleMoreClick() {
  setShowMore(!showMore);
}
  return (
    <>
      <button onClick={handlePreviousClick}>Previous</button>
      <button onClick={handleNextClick}>Next</button>
      <h2>
        {sculpture.name} by {sculpture.artist}
      </h2>
      <h3>
        ({index + 1} of {sculptureList.length})
      </h3>
      <img src={sculpture.url} alt={sculpture.alt} />
      <br />
      <button onClick={handleMoreClick}>{showMore ? "Hide" :"Show"} Details</button>
     {showMore && <p>{sculpture.description}</p>} 
    </>
  )
}

export default App
