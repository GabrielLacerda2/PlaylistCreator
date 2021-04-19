import Link from 'next/link';
import { useState } from 'react';
function Tracks(props) {
  const [trackPlay, setTrackPlay] = useState('');
  const handleTrackPlay = (idAlbum, idTrack) => {

    const url = `https://open.spotify.com/embed/album/${idAlbum}?highlight=spotify:track:${idTrack}`
    setTrackPlay(url);
  }

  return (
    <div>
      <ul>
        {props.tracks.map((element, index) => {

          return <div>
            <li key={index} value={element.track.external_urls.spotify} onClick={() => handleTrackPlay(element.track.album.id, element.track.id)}>{element.track.name} - {element.track.artists[0].name}</li>
          </div>
        })}
      </ul>
      <iframe src={trackPlay} width="640" height="80" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
    </div>
  );
}

export default Tracks;