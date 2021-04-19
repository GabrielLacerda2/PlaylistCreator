import {
  Checkbox,
  Grid,
  Header,
  Image,
  Menu,
  Ref,
  Segment,
  Sidebar,
  Button,
  Icon
} from 'semantic-ui-react';

import {useEffect,useState} from 'react';


function SideBar(props) {
  const [playlistsLocalStorage,setPlaylistsLocalStorage] = useState(true);
  useEffect(() =>{
    if(playlistsLocalStorage){
      if(localStorage.playlist){
        props.setPlaylist(JSON.parse(localStorage.getItem("playlist")))
        setPlaylistsLocalStorage(false);
      }else{
        props.setPlaylist([])
      }
    }
  })

  const handleNewPlaylist = () => {
    props.setNewPlaylistVisible(true);

  }

  const handleShowPlaylistDetails = (e) => {
    props.setPlaylistSelected(props.playlist[e.target.id]);
    props.setShowResult(false);
    props.setShowPlaylistDetails(true);
  }
 
  
  return (

    <Sidebar
      as={Menu}
      animation='overlay'
      icon='labeled'
      inverted
      vertical
      visible={true}
      width="thin"
    >

      <Menu text vertical fluid>
        <Menu.Item ><Button className="btn-new-playlist" circular color="green" onClick={handleNewPlaylist}>Nova playlist +</Button></Menu.Item>
        <h4 className="my-playlist">Minhas Playlists</h4>
        {props.playlist.map((element, index) => {
          return <Menu.Item as='a' className="name-playlist-a" id={index} onClick={handleShowPlaylistDetails}>{element.name}</Menu.Item>
        })
        }

      </Menu>
    </Sidebar>


  );
}

export default SideBar;