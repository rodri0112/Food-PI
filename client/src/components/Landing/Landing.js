import React from 'react';
import backImg from '../../images/food-with-ingredients.jpg';
import './Landing.css'
import { Link } from 'react-router-dom';

export default function Landing() {
    return (
        <div className='landing'>
            <div className='div1'>
            <h1 className='hland'>Bienvenidos a Henry Foods</h1>
            <h3 className='hland'>Aqui encontraras las mejores recetas</h3>
            <Link to='/home' className='link'>
                <button className='btn'>Ver Recetas</button>
            </Link>
            </div>
        </div>
    )
}