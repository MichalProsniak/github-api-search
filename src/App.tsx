import React from 'react';
import './App.css';
import { Form } from './Components/Form';

function App() {

  return (
    <div className="App">
      <h1>Search for project</h1>
      <Form onSubmit={({name, owner, language}) => {
        console.log(name, owner, language);
      }}/>
      
    </div>
  );
}

export default App;
