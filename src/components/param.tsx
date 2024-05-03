import React from 'react'

function Param() {
  
  return (
    <div>
      <h1>parametre</h1>
      <div className="volume w-1 h-1">
        <input type="range" min="0" max="100" value="50" className="volume-range"></input>
        <div className="icon">
          <i className="fa fa-volume-up icon-size" aria-hidden="true"></i>
        </div>
      </div>
    </div>
  )
  
}


export default Param