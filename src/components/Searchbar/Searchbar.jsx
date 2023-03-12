import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { ToastContainer, toast } from 'react-toastify';
import { ImSearch } from 'react-icons/im';
import css from 'components/Searchbar/Searchbar.module.css';

export class Searchbar extends Component {
  state = {
    query: '',
  }

  handleQweryChange = e => {
    this.setState({ query: e.currentTarget.value.toLowerCase() })
  }

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.query.trim() === "") {
      toast.error('Search fild is empty');
      return
    }

    this.props.onSubmit(this.state.query);
    this.setState({
      gallery: [], 
      page: 1, 
      forFetch: false, 
      query: '', 
      status: 'idle'
    });
  }

  render() {
    return (
      <header className={css.Searchbar} >
        <form className={css.SearchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={css.SearchFormButton}>
            <ImSearch size={25} />
          </button>

          <input
            className={css.SearchFormInput}
            type="text"
            name="query"
            value={this.state.query}
            onChange={this.handleQweryChange}
            // autocomplete="off"
            // autofocus
            placeholder="Search images and photos"
          />
        </form>
        <ToastContainer
          position="top-right"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </header>
    )
  }
}

Searchbar.propType = {
  onSubmit: PropTypes.func.isRequired,
};