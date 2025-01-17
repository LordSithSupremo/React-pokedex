import React, { Component } from 'react';
import '../styles/Header.css';


export class Header extends Component {
    render() {
        return (
        <nav className='navbar'>
            <div className='navbar-left'>
                <img className='logo' src='#' alt='logo'></img>
            </div>
            <div className='navbar-center'>
                <h3>Faça uma busca pelo seu Pokémon favorito!</h3>
            </div>
            
        </nav>
        )
    }
}

export default Header