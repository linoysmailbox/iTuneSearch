import {SetStateAction, useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import SearchResults from './features/components/searchResults';
import searchApi from './features/services/searchApi';
import { Button, TextField, CircularProgress } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { useAppDispatch, useAppSelector } from "./features/app/hooks";
import { fetchAsync, selectData } from "./features/services/searchSlice";


 function App() {

  const [resultsPresent, setResultsPresent] = useState<boolean>(false);
  const [value, setValue] = useState("");
  const dispatch = useAppDispatch();
  const resData = useAppSelector(selectData);  
 
  const onChange = (event: { target: { value: SetStateAction<string>; }; }) => {
    setValue(event.target.value);
  };

  const onSearch = async () => {
    dispatch(fetchAsync(value))
  };


  return (
    <div className="App">
      <h1>iTunes Search</h1>
      <div className="search-container">   
           <div className="search-inner">         
            <TextField label="" id="outlined-size-small" value={value} size="small" placeholder="Search..." onChange={onChange}/>
            &nbsp; &nbsp; &nbsp; 
            <Button variant="contained" color="error" onClick={() => onSearch()}> Search </Button>
        </div>      
      </div>     
      <div>
          {resultsPresent && <p>No records found</p>}
          {(resData?.length > 0) && <SearchResults />}         
          </div>
    </div>

  );
}

export default App;
