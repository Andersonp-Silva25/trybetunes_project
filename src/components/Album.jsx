import React, { Component } from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import Header from './Header';
import MusicCard from './MusicCard';

export default class Album extends Component {
  constructor() {
    super();

    this.state = {
      musics: [],
    };
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    this.setState({ musics: await getMusics(id) });
  }

  render() {
    const { musics } = this.state;
    return (
      <>
        <Header />
        <div data-testid="page-album">
          { musics.map((music, index) => (
            index === 0 ? (
              <div key={ music.amgArtistId + music.artistId }>
                <h3 data-testid="artist-name">{music.artistName}</h3>
                <h4 data-testid="album-name">{music.collectionName}</h4>
              </div>
            )
              : (
                <MusicCard
                  key={ music.trackName + music.artistId }
                  trackName={ music.trackName }
                  previewUrl={ music.previewUrl }
                />
              )
          ))}
        </div>
      </>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
