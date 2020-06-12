import React, { useState, useEffect } from "react";
import "../App.css";
import DogList from "./DogList";
import MyList from "./MyList";

const App = () => {
    const [loading, setLoading] = useState(true);
    const [searchList, setSearchList] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);
    const [myDogs, setMyDogs] = useState([])

    useEffect(() => {
    fetch("https://dog.ceo/api/breeds/list/all")
      .then(response => response.json())
      .then(jsonResponse => {
        setSearchList(Object.keys(jsonResponse.message));
        setLoading(false);
      });
  }, []);

    const search = searchValue => {
    setLoading(true);
    setErrorMessage(null);

    fetch(`https://dog.ceo/api/breed/${searchValue}/images/random`)
      .then(response => response.json())
      .then(jsonResponse => {
        if (jsonResponse.status === "success") {
          setMyDogs([...myDogs, [myDogs.length, searchValue , jsonResponse.message]]);
          setLoading(false);
          let array = [...searchList];
          let index = array.indexOf(searchValue);
          array.splice(index, 1);
          setSearchList(array);
        } else {
          setErrorMessage(jsonResponse.status);
          setLoading(false);
        }
      });
    };

    const randomSearch = searchValue => {
      setLoading(true);
      setErrorMessage(null);
      let randomDog = [...searchList];
      randomDog = randomDog[Math.floor(Math.random() * randomDog.length)];

      fetch(`https://dog.ceo/api/breed/${randomDog}/images/random`)
      .then(response => response.json())
      .then(jsonResponse => {
        if (jsonResponse.status === "success") {        
          setMyDogs([...myDogs, [myDogs.length, randomDog , jsonResponse.message]]);
          setLoading(false);
          let array = [...searchList];
          let index = array.indexOf(searchValue);
            array.splice(index, 1);
            setSearchList(array);
        } else {
          setErrorMessage(jsonResponse.status);
          setLoading(false);
        }
      });
    };

    const deleteDog = deleteValue => {
      let list = [...searchList];
      let dogInfo = [...myDogs[deleteValue]];
      let dog = dogInfo[1];
      list.push(dog)
      setSearchList(list);
      let array = [...myDogs];
      array.splice(deleteValue, 1);
      setMyDogs(array);
    };
    
    return (
     <div className="App">
       <DogList list={searchList} randomSearch={randomSearch} search={search} />
      <div>
        {loading && !errorMessage ? (
         <span>loading...</span>
         ) : errorMessage ? (
          <div className="errorMessage">{errorMessage}</div>
        ) : (
          myDogs.map((dog, index) => (
            <MyList key={`${index}-${dog[0]}`} i={index} dog={dog} deleteDog={deleteDog} />
          ))
        )}
      </div>
    </div>
  );
};

export default App;