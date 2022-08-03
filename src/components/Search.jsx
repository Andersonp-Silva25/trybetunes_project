import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Header from './Header';
import Loading from './Loading';

export default class Search extends Component {
  constructor() {
    super();
    this.state = {
      isDisable: true,
      inputValue: '',
      searchName: '',
      isLoading: false,
      musics: [],
      searchAlbum: false,
    };
  }

  verifyInput = ({ target: { value } }) => {
    const lengthInput = value.length >= 2;
    this.setState({ isDisable: !lengthInput, inputValue: value });
  }

  handleButtonClick = async (event) => {
    event.preventDefault();
    const { inputValue } = this.state;
    this.setState({
      isDisable: true,
      isLoading: true,
    },
    async () => (
      this.setState({
        musics: await searchAlbumsAPI(inputValue),
        isLoading: false,
        searchName: inputValue,
        inputValue: '',
        searchAlbum: true,
      })));
  }

  render() {
    const {
      isDisable,
      inputValue,
      isLoading,
      musics,
      searchName,
      searchAlbum,
    } = this.state;

    const isMusic = musics.length > 0;
    return (
      <>
        <Header />
        <div data-testid="page-search">
          {isLoading
            ? <Loading />
            : (
              <section>
                <form>
                  <label htmlFor="search">
                    <input
                      type="text"
                      name="search"
                      id="search"
                      placeholder="Nome do Artista ou Banda"
                      data-testid="search-artist-input"
                      onChange={ this.verifyInput }
                      value={ inputValue }
                    />
                  </label>
                  <button
                    type="button"
                    data-testid="search-artist-button"
                    disabled={ isDisable }
                    onClick={ this.handleButtonClick }
                  >
                    Pesquisar
                  </button>
                </form>
                {isMusic
                  ? (
                    <div>
                      <h2>{`Resultado de álbuns de: ${searchName}`}</h2>
                      <div>
                        {musics.map((album) => (
                          <div key={ album.artistId + album.collectionId }>
                            <Link
                              to={ `/album/${album.collectionId}` }
                              data-testid={ `link-to-album-${album.collectionId}` }
                            >
                              <img src={ album.artworkUrl100 } alt={ album.artistName } />
                              <p>{album.collectionName}</p>
                              <p>{album.artistName}</p>
                            </Link>
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                  : searchAlbum && <h2>Nenhum álbum foi encontrado</h2>}
              </section>
            )}
        </div>
      </>
    );
  }
}
