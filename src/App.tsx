import React, {useState} from 'react';
import './App.css';
import { Form } from './Components/Form';
import { searchInApi, parametersCreator, dataParameters, dataResponse } from './ApiComunicator/SearchInApi';
import { ResultsTable } from './Components/ResultsTable';


function App() {

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const [searchResult, setSearchResult] = useState<dataResponse | undefined>(undefined);
  let searchParams: dataParameters;
  
  return (
    <div className="App">
      <h1>Search for project</h1>
      <Form onSubmit={async ({phrase, owner, language}) => {
        searchParams = parametersCreator(phrase, owner, language, currentPage, itemsPerPage);
        setSearchResult(await searchInApi(searchParams));
        console.log(searchResult);
      }}/>
      {searchResult && <ResultsTable searchResult={searchResult} />}

      
      
    </div>
  );
}

export default App;
