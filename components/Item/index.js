import styled from 'styled-components';
import Image from 'next/image';
import {Button,Popup} from 'semantic-ui-react';
import {useState,useEffect} from 'react';

const Item = styled.li`
    border-top:1px solid rgba(255,255,255,0.1);
    display:flex;
    padding: 5px 0 5px 10px;
    flex-direction:row;
    align-items: center;
    width:100%;
    justify-content:space-between;
    word-break: break-word;
`;

const ImageTitleItem = styled.div`
    display:flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

const ItemName = styled.p`
    margin-left: 10px;
    width:32vw;
`;

const BotoesItem = styled.div`
    outline:none;
`;


export default (props) => {
  const [trackId,setTrackId] = useState('');
  const [nameItem,setNameItem] = useState();
  const [count,setCount] = useState();
  const [trigger,setTrigger] = useState(true);

  const handleItemClick = (e) => {
    setTrackId(e.target.parentNode.id)
}
console.log(trackId)

//adiciona o item selecionado à playlist selecionada
const addItemToPlaylist=(nameItem) =>{
  props.playlist.map((element,index) => {
    if(element.name == nameItem){
      props.setPlaylistUpdate(element);
      element.items.push(props.searchResult.data.tracks.items.filter((element,index)=>{
        if(element.id == trackId){
          props.setItem([...props.item,{data:element}]);
          return element;
        }else{
          return null;
        }
      }))
    }
  })
    localStorage.setItem("playlist",JSON.stringify(props.playlist))
    setCount(0);
}

//adiciona o item selecionado à playlist selecionada
const handleAddItemToPlaylist =  (e) => {
  setNameItem(e.target.innerHTML);
  props.playlist.map((element, index) =>{
    if(element.name == e.target.innerHTML){
      props.setPlaylistUpdate(element);
      if(!element.items[0]){
        element.items.push(props.searchResult.data.tracks.items.filter((element,index)=>{
          if(element.id == trackId){
            props.setItem([...props.item,{data:element}]);
            return element;
          }else{
            return null;
          }
        }))
      }else{
        element.items.map((element,index) =>{ //mapeia os items
          if (element[0].id == trackId){   //se o item for diferente do id
            setCount(1)
          }
          setTrigger(!trigger);
        })
      }
    } 
  
  })
  localStorage.setItem("playlist",JSON.stringify(props.playlist))
}
console.log("oq ocorre com a playlist?",props.playlist)
//se o contador for igual a 0, ou seja, não tiver um item igual ao que esta sendo colocado a função adiciona o item
useEffect(() =>{
  count==0 ? addItemToPlaylist(nameItem):setCount(0)
},[trigger])

  
//seleciona o item a ser inserido e guradado
const handlePlayItem = (e) => {
  props.setItemPlay(e.target.parentNode.id)
}
    return(
        <Item>
            <ImageTitleItem>
                <Image
                  src={props.src}
                  width={40}
                  height={40}
                  alt="Imagem Item"
                />
                <ItemName>{props.itemName}</ItemName>
            </ImageTitleItem>
            <BotoesItem id={props.id}>
            <Button onClick={handlePlayItem} id={props.id} className="btn-add-track" icon="play" circular color="green" />
            <Popup
            trigger={<Button className="btn-add-track" id={props.id} icon="plus" onClick={handleItemClick} circular inverted />}
            position='right center'
            on='click'
            inverted
            >
            <ul>
                <h3>Adicionar na playlist:</h3>
                {
                props.playlist.map((element, index) => {
                    return <li className="playlist-add-track" name={index} value={index} key={index} onClick={handleAddItemToPlaylist}>{element.name}</li>
                })
                }
            </ul>
            </Popup>
        </BotoesItem>
        </Item>
    );
}