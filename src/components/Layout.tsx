import { Link, Outlet } from 'react-router-dom'
import ResourceBadge from './ResourceIndicator'
import { useContext } from 'react';
import { GlobalContext } from '../context/ShipContext';
import '../CSS/header.css'

export function Layout() {

  const context = useContext(GlobalContext);
      
      if(!context) return null;
  
      const { fuel, credit } = context;
      
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">🚀 Cosmic Cargo</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <ResourceBadge icon={"src/assets/Gemini_Generated_Image_nizm1gnizm1gnizm-removebg-preview.png"} fuel={fuel} credit={credit}/>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">Puente de Mando</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/hirecrew">Cantina Intergaláctica</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/missions">Sala de Misiones</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  )
}

export default Layout
