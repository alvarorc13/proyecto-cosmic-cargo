import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Dashboard from "./pages/Dashboard"
import HireCrew from "./pages/HireCrew"
import Missions from "./pages/Missions"
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from './components/Layout'
import GlobalProvider from './context/ShipProvider';

  const Router = () => {
    return(
      <>
        <GlobalProvider>

          <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="home" replace/>} />
              <Route path="home" element={<Dashboard />}></Route>
              <Route path="hirecrew" element={<HireCrew />}></Route>
              <Route path="missions" element={<Missions />}></Route>
              <Route path="*" element={ <h1> Error 404</h1>}></Route>
            </Route>
          </Routes>
        </BrowserRouter>
        
        </GlobalProvider>
      </>
    )
  }

  export default Router