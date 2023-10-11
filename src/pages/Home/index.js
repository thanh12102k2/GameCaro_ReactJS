import React from 'react';
import './HomePage.css';
import { Link } from 'react-router-dom';

function Home(){
    return(
      <div className='home-page'>
      <div style={{position:"absolute",  top :"20%", left:"39.5%"}}>
          <h1 className='home-title'>
          <p style={{color:"#00BFFF"}}>X</p>
          <p style={{color:"#708090", marginLeft:"5px" , marginRight:"5px"}}>-</p>
          <p style={{color:"#F08080"}}>O</p>
          <p style={{color:"#708090", marginLeft:"18px"}}> Fighting</p>
          </h1>
          <Link to="/game" className='home-btn'>Bắt đầu </Link>
        </div>
      </div>
    );
}

export default Home;