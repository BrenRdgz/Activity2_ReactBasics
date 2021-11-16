import React from 'react';
import PropTypes from 'prop-types';
import Container from '@mui/material/Container';
import styles from '../utils/styles.css';


const Header = ({title})=>{
    return (
        <Container>
            <h1 className='styles.h1'>{title}</h1>
        </Container>
    )
}

Header.propTypes = {
    title: PropTypes.string.isRequired
}

export default Header;