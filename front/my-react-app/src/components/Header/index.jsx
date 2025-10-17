import { NavLink } from "react-router-dom"
import logo from '../../assets/SportSee.svg'

function Header() {
    return (
        <nav className='navbar'>
            <img src={logo} alt='SportSee' className='sport-logo' />
            <div className='menu'>
                <NavLink to="/">Accueil</NavLink>
                <div>Profil</div>
                <div>Réglage</div>
                <div>Communauté</div>
            </div>
        </nav>
    )
}

export default Header