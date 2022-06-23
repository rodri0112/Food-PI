import React from 'react';
import Video from '../../images/Aesthetic.mp4';
import './Landing.css'
import { Link } from 'react-router-dom';

export default function Landing() {
    return (
        <div>
            <video autoPlay loop className='myVideo'>
                <source src={Video} type="video/mp4"/>
            </video>
            <h1>Bienvenidos a Henry Foods</h1>
            <h3>Aqui encontraras las mejores recetas</h3>
            <Link to='/home'>
                Recetas
            </Link>
        </div>
    )
}