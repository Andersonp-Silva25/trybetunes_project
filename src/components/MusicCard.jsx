import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

export default class MusicCard extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      check: false,
    };
  }

  async componentDidMount() {
    const { trackId } = this.props;
    const favoriteMusic = await getFavoriteSongs();
    const verifyFavorite = favoriteMusic.some((music) => music.trackId === trackId);
    if (verifyFavorite) this.setState({ check: true });
  }

  favoriteMusic = async ({ target }) => {
    const { selectedMusic } = this.props;
    if (target.checked) {
      this.setState({ isLoading: true });
      await addSong(selectedMusic);
      this.setState({ isLoading: false, check: true });
    } else {
      this.setState({ isLoading: true });
      await removeSong(selectedMusic);
      this.setState({ isLoading: false, check: false });
    }
  }

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { isLoading, check } = this.state;
    return (
      <div>
        <p>{trackName}</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
          .
        </audio>
        {isLoading ? <Loading />
          : (
            <label htmlFor="favorita">
              Favorita
              <input
                type="checkbox"
                name="favorita"
                id="favorita"
                data-testid={ `checkbox-music-${trackId}` }
                onChange={ this.favoriteMusic }
                checked={ check }
              />
            </label>
          )}
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  selectedMusic: PropTypes.shape({}).isRequired,
};
