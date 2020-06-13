import React, { useState } from "react";


const DogList = (props) => {
  const [searchValue, setSearchValue] = useState("");
  
  const handleSearchInputChanges = (e) => {
    setSearchValue(e.target.value); 
  }

  const resetInputField = () => {
    setSearchValue("")
  }

  const callSearchFunction = (e) => {
    e.preventDefault();
    if (searchValue != "") {
      props.search(searchValue);
      resetInputField();
    }
  }

  const callRandomSearchFunction = (e) => {
    e.preventDefault();
    props.randomSearch(searchValue);
    resetInputField();
  }

  return (
     <div className="search">
            <input type="text" list="data" value={searchValue} onChange={handleSearchInputChanges} />
            <datalist id="data">
            {props.list.map((item, key) =>
                <option key={key} value={item} />
            )}
            </datalist>
            <input onClick={callSearchFunction} type="submit" value="ADD" />
            <input onClick={callRandomSearchFunction} type="submit" value="RANDOM" />
     </div>
        
    );
}

export default DogList;