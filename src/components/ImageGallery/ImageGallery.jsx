import React from 'react';
import PropTypes from 'prop-types';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem.jsx';
import 'react-toastify/dist/ReactToastify.css';
import css from 'components/ImageGallery/ImageGallery.module.css';

export const ImageGallery = ({ gallery }) => {
    return (gallery.length !== 0 &&
        <div>
            <ul className={css.ImageGallery} >
                {gallery.map((image, index) => (
                    <ImageGalleryItem key={index} image={image} />
                ))}
            </ul>
        </div>
    )
}

ImageGallery.propTypes = {
    gallery: PropTypes.string.isRequired,
};