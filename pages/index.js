import Head from 'next/head'
import {Input, Icon} from 'semantic-ui-react';
import {useEffect,useState,useRef} from 'react';
import Sidebar from '../components/Sidebar';
import NewPlaylist from '../components/NewPlaylist';
import SearchResult from '../components/SearchResult';
import PlaylistDetails from '../components/PlaylistDetails';
import styled from 'styled-components';

const Content = styled.div`
  height: 100vh;
  background-color:#1E1E1E;
  position: absolute;
  width: 100vw;
`;

const BoxInput = styled.div`
  width:20vw;
  margin:15px 0 0 160px;
`;

const PlayTrack = styled.div`
  width:90vw;
  position: fixed;
  float:left;
  top:90vh;
  margin-left: 160px;
`;

export default function Home(props) {
   
    const [playlist,setPlaylist] = useState([]);
    const [searchContent,setSearchContent] = useState('');
    const [searchResult,setSearchResult] = useState({undefined:true});
    const [newPlaylistVisible,setNewPlaylistVisible] = useState(false);
    const [showResult,setShowResult] = useState(false);
    const [item,setItem] = useState([]);
    const [showPlaylistDetails,setShowPlaylistDetails] = useState(false);
    const [playlistSelected,setPlaylistSelected] = useState({name:"",descrição:"",items:[]});
    const [playlistUpdate,setPlaylistUpdate] = useState([]);
    const [id,setId] = useState(0);
    const [itemPlay,setItemPlay] = useState('');
    const [urlPlay,setUrlPlay] = useState();
    const [inputIsSelected,setInputIsSelected] = useState(false);
    const {slk,setSlk} = useState(true);
    const inputEl = useRef(null);
    const handleSearchContent = (e) => {
      setSearchContent(e.target.value,"a");
    }
    

    console.log(playlist)
    useEffect(() =>{
      setUrlPlay(`https://open.spotify.com/embed/track/${itemPlay}`)
    },[itemPlay])
    const handleSearch = async (searchContent) => {
      console.log(inputEl.current)
        const res = await fetch(`https://api.spotify.com/v1/search?q=${searchContent}&type=artist%2Cplaylist%2Ctrack%2Cshow%2Cepisode%2Calbum&market=BR&limit=20`,{
          method:'GET',
          headers:{
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": "Bearer " + props.token
          }
        });
        const data = await res.json();
        if(searchContent != ''){
          setSearchResult({undefined:false , data:data});
          setShowResult(true);
          setShowPlaylistDetails(false);
        }else{
          setShowResult(false);
        }
        
       
    }
    
    const handleInputSelecet = (e) =>{
      setInputIsSelected(true);
    }
    
    

    /*useEffect( async ()=>{
        console.log("aa",item,playlistUpdate)
        console.log("ab",item,playlistSelected)
        await fetch('http://localhost:3000/api/playlist',{
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({name:playlistUpdate.name,items:playlistUpdate.items})
        })
    },[item])
    
    useEffect(()=>{
      setPlaylist(props.playlists.map((element)=>{
        return {name:element.name,description:element.description,id:element._id,items:element.items}
      }))
    },[props.playlists])*/
  
  const handleInputEnter = (e) => {
    if(e.key == "Enter"){
      handleSearch(searchContent);
    }
  }

  return (
    <Content>
    
      <Head>
        <title>Playlists</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <Sidebar 
        newPlaylistVisible={newPlaylistVisible} 
        setNewPlaylistVisible={setNewPlaylistVisible} 
        playlist={playlist}
        setPlaylist={setPlaylist}
        setShowResult={setShowResult}
        showPlaylistDetails={showPlaylistDetails}
        setShowPlaylistDetails={setShowPlaylistDetails}
        playlistSelected={playlistSelected}
        setPlaylistSelected={setPlaylistSelected}
        playlistsSave={props.playlists}
      />
      
      {newPlaylistVisible ?
        <NewPlaylist 
        newPlaylistVisible={newPlaylistVisible} 
        setNewPlaylistVisible={setNewPlaylistVisible}
        playlist={playlist}
        setPlaylist={setPlaylist}
        id={id}
        setId={setId}
        item={item}
        
        />:newPlaylistVisible
      }
      <div>
        <BoxInput>
          <Input fluid placeholder="Pesquisar" onChange={handleSearchContent} onClick={handleInputSelecet} onKeyUp={handleInputEnter} ref={inputEl} icon={
            <Icon className="input-search" name="search" inverted circular link onClick={handleSearch}  />
          }/>
        </BoxInput>
        {showResult ? <SearchResult 
          searchResult={searchResult}  
          playlist={playlist} 
          setPlaylist={setPlaylist} 
          itemPlay={itemPlay} 
          setItemPlay={setItemPlay} 
          setUrlPlay={setUrlPlay} 
          item={item} 
          setItem={setItem}
          playlistUpdate={playlistUpdate}
          setPlaylistUpdate={setPlaylistUpdate}
        />: showResult }
      </div>
      {showPlaylistDetails ? 
        <PlaylistDetails
          setItemPlay={setItemPlay}
          itemPlay={itemPlay}
          setUrlPlay={setUrlPlay}
          playlistSelected={playlistSelected}
          setPlaylistSelected={setPlaylistSelected}
          setShowResult={setShowResult}
          playlist={playlist}
          setPlaylist={setPlaylist}
        />: showPlaylistDetails
      }
      <PlayTrack>
        <iframe className="iframe-spotify" src={urlPlay} width="300" height="80" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe> 
      </PlayTrack>
    </Content>
  )
  }



  Home.getInitialProps = async () => {
    const clientId = process.env.clientId;
    const clientSecret = process.env.clientSecret;

    const getToken = async () => {
      const res = await fetch('https://accounts.spotify.com/api/token',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization':'Basic ' + Buffer.from(clientId + ':' + clientSecret).toString('base64')
        },
        body: 'grant_type=client_credentials'
      });
      const data = await res.json();
      return data.access_token;
    }
    
    const getPlaylists = async () => {
      const res = await fetch('http://localhost:3000/api/playlist',{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });

      const data = await res.json();
      return data.data;

    }
      const token = await getToken();
      
      //const playlists = await getPlaylists();
        
      return {token:token};

  }
