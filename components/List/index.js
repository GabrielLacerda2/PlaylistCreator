import styled from 'styled-components';
import react from 'react';
import Item from '../Item';
export default (props) => {
    return(
       <ul>
           {!props.searchResult.undefined ? props.searchResult.data.tracks.items.map((element, index) => {
            return <Item 
              src={element.album.images[0].url} 
              itemName={element.name} 
              id={element.id} 
              setItemPlay={props.setItemPlay} 
              searchResult={props.searchResult} 
              playlist={props.playlist} 
              setItem={props.setItem} 
              item={props.item} 
              setPlaylistUpdate={props.setPlaylistUpdate}
            />
          }) : 0}
       </ul>
    );
}