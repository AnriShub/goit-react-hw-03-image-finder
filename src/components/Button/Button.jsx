import React from 'react';
import PropTypes from 'prop-types';
import css from 'components/Button/Button.module.css';

export const Button = ({ onClick }) => {
    return <div>
        <button type="button"
            name="loadButton"
            onClick={onClick}
            className={css.ButtonLoad}>
            Load More
        </button>
    </div>
}

Button.propTypes = {
    onClick: PropTypes.func,
};
