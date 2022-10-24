import { useState, useEffect, useRef } from 'react';
import './App.css';
import { Form } from './Components/Form';
import { searchInApi, parametersCreator, dataParameters, dataResponse } from './ApiComunicator/SearchInApi';
import { ResultsTable } from './Components/ResultsTable';
import {PaginationBar} from './Components/PaginationBar'
import {ItemsNumberChanger} from './Components/ItemsNumberChanger'

function App() {

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isError, setIsError] = useState<boolean>(false);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const [searchResult, setSearchResult] = useState<dataResponse | undefined>(undefined);
  const [searchedPhrase, setSearchedPhrase] = useState<string>('');
  const [searchedUser, setSearchedUser] = useState<string>('');
  const [searchedLanguage, setSearchedLanguage] = useState<string>('');
  const [maxPage, setMaxPage] = useState<number>(0);
  const searchParams = useRef<dataParameters>({q: ''});
  
  useEffect( () => {
    const getData = async () => {
      searchParams.current = parametersCreator(searchedPhrase, searchedUser, searchedLanguage, currentPage, itemsPerPage);
      if (searchedPhrase !=='' && searchedUser !== '')
      {
        const res = await searchInApi(searchParams.current)
        if(res?.status === 200)
        {
          setSearchResult(res);
          const maxPageValue = Math.ceil(res.data.total_count / itemsPerPage)
          if (currentPage > maxPageValue)
          {
            setCurrentPage(maxPageValue)
          }
          setMaxPage(maxPageValue)
          setIsError(false);
        }
        else{
          console.log(searchResult)
          setSearchResult(undefined)
          console.log('error')
          setIsError(true);
        }
      }
    }
    getData();
  }, [currentPage, searchedPhrase, searchedUser, searchedLanguage, itemsPerPage])

  return (
    <div className="App">
      <h1>Search for project</h1>
      <Form onSubmit={({phrase, owner, language}) => {
        setSearchedLanguage(language);
        setSearchedUser(owner);
        setSearchedPhrase(phrase);
        setCurrentPage(1);
      }}/>
      {isError && <h1 className='error-message'>Something went wrong, please try again later!</h1>}
      {!isError && searchResult && <ResultsTable searchResult={searchResult} />}
      {!isError && <ItemsNumberChanger 
        itemsPerPage={itemsPerPage} 
        changeNumberOfItems={({ itemsPerPage }) => {
          setItemsPerPage(itemsPerPage);
        }} />}
      {!isError && searchResult &&<PaginationBar 
        maxPage={maxPage} 
        changeCurrentPage={(selectedItem: { selected: number; }) => setCurrentPage(selectedItem.selected + 1)} />}
        
    </div>
  );
}

export default App;
