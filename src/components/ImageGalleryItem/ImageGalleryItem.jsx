import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'components/Modal/Modal';
import css from 'components/ImageGalleryItem/ImageGalleryItem.module.css';

export class ImageGalleryItem extends Component {
    state = {
        shownModal: false,
    };

    onModal = () => {
        this.setState(({ shownModal }) => ({ shownModal: !shownModal }));
    };

    render() {
        const { image } = this.props;
        const { id, webformatURL, user } = image;
        return <li className={css.ImageGalleryItem}>
            <img
                className={css.ImageGalleryItemImage}
                id={id}
                src={webformatURL}
                alt={user}
                onClick={this.onModal} />
            {this.state.shownModal && <Modal onClose={this.onModal} image={image} />}
        </li>
    }

};

ImageGalleryItem.propTypes = {
    item: PropTypes.object,
};