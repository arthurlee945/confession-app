import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Confession = (props:any) => {
  const [confession, setConfession] = useState<string>("");
  const [textInput, setTextInput] = useState<string>("");
  const [submitted, setSubmitted] = useState<boolean>(false);
  let audioLink = require("../asset/goldbergAria.mp3")
  const [music, setMusic] = useState<HTMLAudioElement>( new Audio(audioLink))
  music.loop = true;
  music.preload = "auto";
  music.volume = 0.7;

  useEffect(()=>{
    getNewConfession();
  },[]);
  useEffect(()=>{
    if(submitted){
      document.querySelector(".submittedConfession")?.animate([{opacity:0}, {opacity:1, offset:0.25}, {opacity:1, offset:0.75}, {opacity: 0}], 1500);
      setTimeout(()=>{
        props.setAddConfession(false);
      }, 1500)
    }
  },[submitted])
  useEffect(()=>{
    if(!props.addConfession){
      setSubmitted(false);
      document.querySelector(".confession")?.addEventListener("click", getNewConfession);
    }
  },[props.addConfession])
  useEffect(()=>{
    if(props.musicOn){
      music.pause();
    }else{
      music.play();
    }
  },[props.musicOn])


  const getNewConfession = () =>{
    try{
      document.querySelector(".confession")?.removeEventListener("click", getNewConfession);
    }catch(err){};
    axios.get("/confession/")
    .then(confessions => {
      let random = Math.floor(Math.random() * confessions.data.length);
      let confession = confessions.data[random].confession;
      let counter = 0;
      const typewriter = setInterval(()=>{
        setConfession(confession.slice(0, counter+1));
        counter++;
        if(counter === confession.length){
          clearInterval(typewriter);
          document.querySelector(".confession")?.addEventListener("click", getNewConfession);
        }
      },50)
    })
  }
  const handleSubmit = (e:any) =>{
    e.preventDefault();
    let confession = {confession: textInput};
    axios.post("/confession/add", confession)
    .then(res => console.log(res));
    setTextInput("");
    setSubmitted(true)
  }
  return(
    <div className="confessionContainer">
      {props.addConfession?

      submitted?
      <h1 className="submittedConfession">Thank you for your confession!</h1>:
      <form onSubmit={handleSubmit} className="confessionForm">
          <input type="text" className = "textbox" required value = {textInput} onChange = {(e)=>{setTextInput(e.target.value)}} minLength={5} maxLength ={280}/>
          <input type="submit" value = "Confess" className ="submitBtn"/>
      </form>

      :
      <h1 className="confession">{confession}</h1>
      }
    </div>
  )
}

export default Confession;