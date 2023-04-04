import PropTypes from "../app/propType";
import "./searchResults.css"
import InfiniteScroll from "react-infinite-scroll-component";
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Avatar from '@mui/material/Avatar';
import { Button, IconButton } from "@mui/material";
import LaunchIcon from '@mui/icons-material/Launch';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import Paper from '@mui/material/Paper';
import { searchNext, selectCurrentData, selectData } from "../services/searchSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";


const SearchResults = () => {
  const currentData = useAppSelector(selectCurrentData);
  const dispatch = useAppDispatch();
  const allData = useAppSelector(selectData);
  const fetchData = () => {
    dispatch(searchNext())
  }
  const hasMore = () => {
    return currentData.length < allData.length;
  }

    const openInNewTab = (url:any|URL) => {
      window.open(url, '_blank', 'noreferrer');
    };

    const SearchRow = ({ item }: any) => {
      return (<TableRow>
        <TableCell align="left"><Avatar src={item.artworkUrl100} sx={{ width: 70, height: 70 }}/></TableCell>
        <TableCell align="left">{item.collectionName || item.trackName}</TableCell>
        <TableCell align="left">{item.artistName}</TableCell>       
        <TableCell align="left"><Button variant="contained" color="success"  onClick={() => openInNewTab(item.previewUrl)}>Preview</Button></TableCell>
      </TableRow>)
    }
    
    return (      
        <InfiniteScroll
        dataLength={currentData.length}
        next={fetchData}
        hasMore={hasMore()}
        loader={<h4>Loading more 10 items...</h4>}    
        >
        {
          <TableContainer component={Paper}>
          <Table data-testid="searchResultsTable" size="small" aria-label="a dense table">
            <TableHead sx={{ backgroundColor: "grey", height: 50 }}>
              <TableRow>
                <TableCell style={{ width: 100 }} align="left">Image</TableCell>
                <TableCell style={{ width: 500 }} align="left">Collection</TableCell>
                <TableCell style={{ width: 300 }} align="left">Artist</TableCell>
                <TableCell style={{ width: 200 }} align="left">Preview</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentData?.map((item: any, id: number) => (
                <SearchRow item={item} key={id} />))}
            </TableBody>
          </Table>
        </TableContainer>}   
       </InfiniteScroll>       

      );
    };


    export default SearchResults;


