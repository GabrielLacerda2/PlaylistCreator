import { Segment, Select, Form, Input, Icon, Button } from 'semantic-ui-react';
import { useState,useEffect } from 'react';
function NewPlaylist(props) {
  const [namePlaylist, setNamePlaylist] = useState('');
  const [descriptionPlaylist, setDescriptionPlaylist] = useState('');
  const [sexo,setSexo] = useState([]);
  const handleCloseNewPlaylist = () => {
    props.setNewPlaylistVisible(false);
  }
  //inputs
  const handleNamePlaylist = (e) => {
    setNamePlaylist(e.target.value);
  }

  const handleDescriptionPlaylist = (e) => {
    setDescriptionPlaylist(e.target.value);
  }
  // --
  
  //inserção da playlist no banco de dados
  const handleNewPlaylist = async () => {
    if (namePlaylist != '') {
      /*await fetch('http://localhost:3000/api/playlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ name: namePlaylist, description: descriptionPlaylist, items: [] })
      })*/
      props.setPlaylist([...props.playlist, { name: namePlaylist, descrição: descriptionPlaylist, items: [] }]);
      props.setNewPlaylistVisible(false)
      localStorage.setItem('playlist',JSON.stringify([...props.playlist,{ name: namePlaylist, descrição: descriptionPlaylist, items: [] }]))
    }
  }
  console.log(sexo)

  return (
    <div className="new-playlist-content">
      <div className="layer-click" onClick={handleCloseNewPlaylist}></div>
      <div className="box-new-playlist">
        <header>
          <h3><strong>Criar playlist</strong></h3>
        </header>
        <main>
          <Form inverted>
            <Form.Field
              label="Nome"
              placeholder="Nome da minha playlist"
              control="input"
              onChange={handleNamePlaylist}
            />
            <Form.Field
              label="Descrição"
              placeholder="Faça uma descrição sobre a sua playlist"
              control="textarea"
              style={{ maxHeight: 100 }}
              onChange={handleDescriptionPlaylist}
            />
            <Button
              className="btn-new-playlist"
              color="green"
              circular
              onClick={handleNewPlaylist}
            >
              CRIAR
                        </Button>
          </Form>
        </main>
      </div>

    </div>
  );
}

export default NewPlaylist;