import React, { useEffect, useState } from 'react';
import './App.scss';
import Confession from "./component/Confession";

const App = () => {
  const[titleScreen, setTitleScreen] = useState<boolean>(true);
  const[addConfession, setAddConfession] =  useState<boolean>(false);
  const[musicOn, setMusicOn] = useState<boolean>(false);
  useEffect(()=>{
    if(addConfession){
      (document.querySelector(".addConfessionBtn") as HTMLElement).innerHTML = "Cancel"
    }else{
      (document.querySelector(".addConfessionBtn") as HTMLElement).innerHTML = "Add a confession"
    }
  },[addConfession])
  const handleTitleClick = () => {
    document.querySelector(".titlePage")?.animate([{opacity:1}, {opacity:0}], 500);
    setTimeout(()=>{
      setTitleScreen(false);
    },500)
  }
  return (
    <div className="container">
      <div className="navBar">
        {musicOn?
        <i onClick = {()=>setMusicOn(false)} className="fa-solid fa-volume-xmark"></i>:
        <i onClick = {()=>setMusicOn(true)} className="fa-solid fa-music"></i>
        }
        <button onClick = {()=>setAddConfession(!addConfession)} className="addConfessionBtn">Add a confession</button>
      </div>
      {titleScreen?
      <div className ="titlePage">
        <h1 onClick = {handleTitleClick} className="title">Confessions</h1>
      </div>:
      <Confession musicOn = {musicOn} addConfession = {addConfession} setAddConfession = {setAddConfession}/>}
    </div>
  );
}

export default App;
