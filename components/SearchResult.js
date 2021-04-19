import {Segment,Select,Form,Input, Icon,Button,Popup} from 'semantic-ui-react';
import {useRef,useState,useEffect} from 'react';
import Image from 'next/image';
import ContainerResults from "../components/ContainerResults";
import Container from './Container';
function SearchResult (props) {

  return(
    <div className="search-result-content">
      <Container setItemPlay={props.setItemPlay} searchResult={props.searchResult} playlist={props.playlist} setItem={props.setItem} item={props.item} setPlaylistUpdate={props.setPlaylistUpdate} />  
    </div>
    );
}

export default SearchResult;