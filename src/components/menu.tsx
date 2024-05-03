import React from 'react'
import Param from './param'
import '../menu.scss'

function Menu() {
  return (
    <div className="menu">
        <h1>poke</h1>
        <h2>arena</h2>
        <button className='button'> jouer </button><br/>
        <button className='button' onClick={parametre} > parametre </button>
    </div>
  )
}

function jouer(){
  return 
}

function parametre(){
  return(
    <Param/>
  )
}

export default Menu