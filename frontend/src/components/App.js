import React, {useState, useEffect} from 'react';
import './App.css';
import Header from "./Header";
import DoctorsList from "./DoctorsList";


import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import api from "../api/doctors";
 
function App() {

  const [doctors, setDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  //Retreive Contact from json-server apis
  const retreiveDorctors = async () => {
    const response = await api.get("/doctors");
    return response.data;
  };
  
  useEffect(() => {
    const getAllDoctors = async () =>{
      const allDoctors = await retreiveDorctors();
      if (allDoctors) setDoctors(allDoctors);
    };
    getAllDoctors();
   
  }, []);

  //This props fucntion is used for searching the doctors' records inside the DoctorsList
  const searchHandler = (searchTerm) => {
    
    setSearchTerm(searchTerm);
   
    if (!Object.values(searchTerm).every(x => x === null || x === ''))
    {
      const newRecordList = doctors.filter((person) =>
      {
        //Each of our person is javascript's object | to check it inspect -> network -> 
        //click on person and preview tab then see it is object 
        return Object.keys(searchTerm).every((term) => {
          return searchTerm[term].toLowerCase() === person[term].toLowerCase()
        });
    
      });
      
      //Return the searched result
      setSearchResults(newRecordList); 
      
    }
    else
    {
      //In case of the input fields in search form is eampty the we are fetching all records as default is.
      setSearchResults(doctors);
    }
  };
  return (
    <div className='ui container'>
      <Header />
      <Router>
      
        <Routes>
          <Route 
            path="/" 
            element={
              <DoctorsList 
                doctors = {searchTerm.length < 1 ? doctors: searchResults} 
                term={searchTerm}
                searchKeyword={searchHandler}
                />
            }
          />
         
         
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
