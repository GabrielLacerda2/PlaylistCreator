import {Segment,Select,Form,Input, Icon,Button,Popup} from 'semantic-ui-react';
import {useState,useEffect} from 'react';
import Item from './Item';
import Image from 'next/image';
const ContainerResults = (props) => {
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
}

//se o contador for igual a 0, ou seja, não tiver um item igual ao que esta sendo colocado a função adiciona o item
useEffect(() =>{
  count==0 ? addItemToPlaylist(nameItem):setCount(0)
},[trigger])
  
//seleciona o item a ser inserido e guradado
const handlePlayItem = (e) => {
  props.setItemPlay(e.target.parentNode.id)
}
  return (
    <div className="container-search-result">
      <header>
        <h3>Tracks</h3>
      </header>
      <main>
        <ul>
          {!props.searchResult.undefined ? props.searchResult.data.tracks.items.map((element, index) => {
           return <li className="item-search-li" key={element.id}>
              <div className="img-title-item">
                <Image
                  src={element.album.images[0].url}
                  width={40}
                  height={40}
                  alt="Imagem Item"
                />
                <p className="item-name">
                  {element.name}
                </p>
              </div>
              <div className="div-btnadd-btnplay" id={element.id}>
                <Button onClick={handlePlayItem} id={element.id} className="btn-add-track" icon="play" circular color="green" />
                <Popup
                  trigger={<Button className="btn-add-track" id={element.id} icon="plus" onClick={handleItemClick} circular inverted />}
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
              </div>
            </li>
          }) : 0}
        </ul>
      </main>
    </div>
  );
}

export default ContainerResults;