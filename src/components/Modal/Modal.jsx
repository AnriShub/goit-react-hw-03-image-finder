import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import css from 'components/Modal/Modal.module.css';


const ModalRoot = document.querySelector('#ModalRoot');

export class Modal extends Component {
    componentDidMount() {
        window.addEventListener('keydown', this.keyDown);
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.keyDown);
    }

    keyDown = e => {
        if (e.code === 'Escape') {
            this.props.onClose();
        }
    };

    onOverlayClose = e => {
        if (e.currentTarget === e.target) {
            this.props.onClose();
        }
    };

    render() {
        const { largeImageURL } = this.props.image;
        return createPortal(
            <div onClick={this.onOverlayClose} className={css.Overlay}>
                <div className={css.Modal}>
                    <img src={largeImageURL} alt="img" />
                </div>
            </div>,
            ModalRoot
        );
    }
}

Modal.propTypes = {
    image: PropTypes.object,
    onClose: PropTypes.func,
};
