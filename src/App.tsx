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
  const [isData, setIsData] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const [searchResult, setSearchResult] = useState<dataResponse | undefined>(undefined);
  const [searchedPhrase, setSearchedPhrase] = useState<string>('');
  const [searchedUser, setSearchedUser] = useState<string>('');
  const [searchedLanguage, setSearchedLanguage] = useState<string>('');
  const [maxPage, setMaxPage] = useState<number>(0);
  const searchParams = useRef<dataParameters>({q: ''});
  
  useEffect( () => {
    const getData = async () => {
      setIsLoading(true);
      searchParams.current = parametersCreator(searchedPhrase, searchedUser, searchedLanguage, currentPage, itemsPerPage);
      if (searchedPhrase !=='' && searchedUser !== '')
      {
        const res = await searchInApi(searchParams.current)
        if(res?.status === 200 && res.data.total_count > 0)
        {
          setIsData(true)
          setSearchResult(res);
          const maxPageValue = Math.ceil(res.data.total_count / itemsPerPage)
          if (currentPage > maxPageValue)
          {
            setCurrentPage(maxPageValue)
          }
          setMaxPage(maxPageValue)
          setIsError(false);
        }
        else if (res?.status === 200)
        {
          setIsData(false);
        }
        else{
          setIsError(true);
        }
      }
      setIsLoading(false);
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
      {isError && <h3 className='error-message'>(Check console for specific info)</h3>}
      {!isError && !isData && <h1 className='error-message'>There are no results for those parameters!</h1>}
      {!isError && isData && searchResult && !isLoading &&<ResultsTable searchResult={searchResult} />}
      {!isError && isLoading &&<h1>Loading....</h1>}
      {!isError && !isLoading && <ItemsNumberChanger 
        itemsPerPage={itemsPerPage} 
        changeNumberOfItems={({ itemsPerPage }) => {
          setItemsPerPage(itemsPerPage);
        }} />}
      {!isError && searchResult && <PaginationBar 
        maxPage={maxPage} 
        changeCurrentPage={(selectedItem: { selected: number; }) => setCurrentPage(selectedItem.selected + 1)} />}
        
    </div>
  );
}

export default App;
