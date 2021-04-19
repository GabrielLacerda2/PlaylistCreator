import { Button } from 'semantic-ui-react';
import { useEffect, useState } from 'react';


function PlaylistDetails(props) {
  console.log(props.playlist)
  const [deletedItem, setDeletedItem] = useState('');
  const [trigger, setTrigger] = useState(true);

  useEffect(() => {
    props.playlist.map((element, index) => {
      if (element.name == props.playlistSelected.name) {
        const position = index;
        element.items.map((item, index) => {
          if (item[0].id == deletedItem) {
            props.playlist[position].items.splice(index, 1)
            alterarItems();
          }
        })
      }
    })
    localStorage.setItem("playlist",JSON.stringify(props.playlist))
    setTrigger(true)
  }, [trigger])


  const alterarItems = async () => {
    await fetch('http://localhost:3000/api/playlist', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ name: props.playlistSelected.name, items: props.playlistSelected.items })
    })
  }


  const deleteDb = async (id) => {
    await fetch("http://localhost:3000/api/playlist", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({ id: id })
    })
  }


  const handlePlayItem = (e) => {
    props.setItemPlay(e.target.parentNode.id)
  }

  const handleDeleteItem = (e) => {
    setDeletedItem(e.target.parentNode.id)
    setTrigger(!trigger);
  }
console.log(props.playlistSelected,"aaaaa")
  return (
    <div className="playlist-content">
      <header>
        <div className="playlist-name-title">
          <h4>PLAYLIST</h4>
          <div className="playlist-title-desc">
            <h1 className="name-playlist">{props.playlistSelected.name}</h1>
            <h3 className="desc-playlist">{props.playlistSelected.descrição}</h3>
          </div>
        </div>
        <h4 className="num-music-playlist">{ }</h4>
      </header>
      <main>
        <div className="container-search-result">
          <ul>
            {props.playlistSelected.items.map((element, index) => {
              return <li className="item-search-li" key={index}>
                {element[0].name}
                <div className="div-btnadd-btnplay" id={element[0].id}>
                  <Button className="btn-add-track" id={element[0].id} icon="play" circular color="green" onClick={handlePlayItem} />
                  <Button inverted icon="trash alternate" id={element[0].id} circular onClick={handleDeleteItem} />
                </div>
              </li>
            })}
          </ul>
        </div>
      </main>
    </div>
  );
}

export default PlaylistDetails;