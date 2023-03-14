import React, { Component } from 'react';
import { toast } from 'react-toastify'
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
    loadflag: true,
  }

  onSubmit = query => {
    this.setState({ gallery: [], loadflag: false, query, status: 'resolved' })
  }

  componentDidUpdate = async (_, prevState) => {
    const prevQuery = prevState.query;
    const nextQuery = this.state.query;
    const currPage = nextQuery !== prevQuery ? 1 : this.state.page;
    const loadflag = this.state.loadflag;
    
    if (loadflag || prevQuery !== nextQuery) {
      this.setState({ status: 'pending' })
      try {
        await fetchImages(nextQuery, currPage).then(({ total, hits }) => {
          if (total > 0) {
            this.setState({gallery: !loadflag ? [...hits] : [...prevState.gallery, ...hits], 
            query: nextQuery, loadflag: false, page: currPage, status: 'resolved'})
          } else {
            this.setState({ status: 'idle' })
            toast.error('No images found!')}
            })
      } catch (error) {
        this.setState({ status: 'rejected' })
      }
    }
  }

  loadflagClick = () => {this.setState(prevState => ({ page: prevState.page + 1, loadflag: true }))}

  render() {
    const { query, gallery } = this.state;
    console.log(gallery.length);
    return (<div>
      <Searchbar onSubmit={this.onSubmit} />
      <ImageGallery gallery={gallery} />
      {(!(gallery.length % 12) && (gallery.length > 0)) && <Button onClick={this.loadflagClick} />}
      {this.state.status === 'rejected' && <div >{this.state.lastMessage}</div>}
      {this.state.status === 'pending' && <Loader query={query} />}
    </div>
    )
  };
};