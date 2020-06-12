import React, { useState } from "react";


const MyList = ( {dog, deleteDog, i} ) => {

    const callFunction = (e) => {
        e.preventDefault();
        deleteDog(e.target.name);
      }
   
    return (
      <div>
        <h2>{dog[1]}</h2>
        <div>
          <img
            width="200"
            alt={`This is a(n): ${dog[1]}`}
            src={dog[2]}
          />
        </div>
        <input name={i} type="button" value="DELETE" onClick={callFunction}/>
      </div>
    );
  };
  
  export default MyList;