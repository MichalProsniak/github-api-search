import React from 'react';
import './App.css';
import { Form } from './Components/Form';
import { searchInApi } from './ApiComunicator/SearchInApi';

function App() {
  
  var currentPage = 1;
  var itemsPerPage = 10;

  return (
    <div className="App">
      <h1>Search for project</h1>
      <Form onSubmit={({phrase, owner, language}) => {
        searchInApi(phrase, owner, language, currentPage, itemsPerPage)
      }}/>
      
    </div>
  );
}

export default App;
