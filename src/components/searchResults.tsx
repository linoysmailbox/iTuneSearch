import PropTypes from "../app/propType";
// import "../App.css";
import "./searchResults.css"
import InfiniteScroll from "react-infinite-scroll-component";
import { SetStateAction, useEffect, useMemo, useState } from "react";
import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table';
import { constants } from "buffer";



const SearchResults = ({resData}:PropTypes) => {
    const [renderCount,setRenderCount]=useState(0);
    useEffect(()=>{
      setRenderCount(10);
    },[resData])
    const fetchData=()=>{
      setRenderCount(renderCount+10);
    }   

    console.log(resData);
    
    const myStyle = {
      color: "white",
      backgroundColor: "Grey",
      padding: "10px",
      fontFamily: "Sans-Serif"
    };

    const openInNewTab = (url:any|URL) => {
      window.open(url, '_blank', 'noreferrer');
    };
    
    return (      
        <InfiniteScroll
        dataLength={renderCount}
        next={fetchData}
        hasMore={renderCount<resData.length}
        loader={<h4>Loading...</h4>}
      >
        { <table>
          <tbody>
            <tr >
              <th></th>
              <th>Type</th>
              <th>Artist</th>
              <th></th>
              
            </tr >
              {resData.slice(0,renderCount-1).map((item,id) =>  (
              <tr key={id} style={myStyle}>
                <td><img src={item.artworkUrl100}/></td>
                <td>{item.wrapperType}</td>
                <td>{item.artistName}</td>
                <td> <button role="link" onClick={() => openInNewTab(item.previewUrl)}>Preview</button> </td>               
              </tr> ))} 
          </tbody>
        </table> }   
        </InfiniteScroll>

       

      );
    };


    export default SearchResults;


