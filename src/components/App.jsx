import React, { Component } from 'react';
import { fetchImages } from 'components/api/fetchImages';
import { Searchbar } from 'components/Searchbar/Searchbar.jsx';
import { ImageGallery } from 'components/ImageGallery/ImageGallery.jsx';
import { Loader } from 'components/Loader/Loader';
import { Button } from 'components/Button/Button.jsx';

export class App extends Component {
  state = {
    query: '',
    status: 'idle',
    gallery: [],
    page: 1,
    forFetch: true,
  }

  onSubmit = query => {
    this.setState({ query, status: 'resolved' })
  }

  componentDidUpdate = async (_, prevState) => {
    const prevQuery = prevState.query;
    const nextQuery = this.state.query;
    const currPage = nextQuery !== this.state.query ? 1 : this.state.page;
    const forFetch = this.state.forFetch;
    if (forFetch || prevQuery !== nextQuery) {
      this.setState({ status: 'pending' })
      let newState = null;
      try {
        newState = await fetchImages(nextQuery, currPage).then(({ total, hits, error }) => {
          if (total > 0) {
            this.setState({ status: 'resolved' })
            return {
              gallery: !(prevQuery !== nextQuery) ? [...prevState.gallery, ...hits] : [...hits],
              query: nextQuery, forFetch: false, page: currPage,
            };
          }
          this.setState({ gallery: [], page: 1, forFetch: false, query: '', status: 'idle' });
        })
      } catch (error) {
        this.setState({ status: 'rejected' })
      }
      
      this.setState(newState);
    }
  }

  loadMoreClick = () => {
    this.setState(prevState => ({ page: prevState.page + 1, forFetch: true }));
    }

  render() {
    const { query, gallery } = this.state;
    console.log(gallery.length);
    return (<div>
      <Searchbar onSubmit={this.onSubmit} />
      {this.state.status === 'idle' && (<div >{query && <h1> {query} not found</h1>}</div>)}
      <ImageGallery gallery={gallery} />
      {(!(gallery.length % 12) && (gallery.length > 0)) && <Button onClick={this.loadMoreClick} />}
      {this.state.status === 'rejected' && <div >{this.state.lastMessage}</div>}
      {this.state.status === 'pending' && <Loader query={query} />}
    </div>
    )
  };
};