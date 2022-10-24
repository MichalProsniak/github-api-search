import React, { useState, useEffect } from 'react';
import './App.css';
import { Form } from './Components/Form';
import { searchInApi, parametersCreator, dataParameters, dataResponse } from './ApiComunicator/SearchInApi';
import { ResultsTable } from './Components/ResultsTable';


function App() {

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isError, setIsError] = useState<boolean>(false);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const [searchResult, setSearchResult] = useState<dataResponse | undefined>(undefined);
  const [searchedPhrase, setSearchedPhrase] = useState<string>('');
  const [searchedUser, setSearchedUser] = useState<string>('');
  const [searchedLanguage, setSearchedLanguage] = useState<string>('');
  const [maxPage, setMaxPage] = useState<number | undefined>(0);
  let searchParams: dataParameters;

  useEffect( () => {
    const getData = async () => {
      const res = await getSearchedData(searchedPhrase, searchedUser, searchedLanguage);
    }
    getData();
  }, [currentPage, searchedPhrase, searchedUser, searchedLanguage, itemsPerPage])

  

  async function getSearchedData(phrase: string, owner: string, language: string)
  {
    if (phrase !=='' && owner !== '')
    {
      searchParams = parametersCreator(phrase, owner, language, currentPage, itemsPerPage);
      const res = await searchInApi(searchParams)
      if(res?.status === 200)
      {
        setSearchResult(res);
        setMaxPage(Math.ceil(res.data.total_count / itemsPerPage))
        setIsError(false);
      }
      else{
        setSearchResult(undefined)
        console.log('error')
        setIsError(true);
        
      }
    }
  }
    
  
  return (
    <div className="App">
      <h1>Search for project</h1>
      {maxPage && <h1>{maxPage}</h1>}
      <Form onSubmit={async ({phrase, owner, language}) => {
        setSearchedLanguage(language)
        setSearchedUser(owner)
        setSearchedPhrase(phrase)
        setCurrentPage(1)
      }}/>
      {isError && <h1 className='error-message'>Something went wrong, please try again later!</h1>}
      {!isError && searchResult && <ResultsTable searchResult={searchResult} />}
      <button onClick={() => setCurrentPage((prevState) => prevState + 1)}>xxx</button>

    </div>
  );
}

export default App;
