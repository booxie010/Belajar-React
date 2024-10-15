import React, { Suspense } from "react";
import { NavLink } from "react-router-dom";

import {BrowserRouter as Router, Route, Routes, Link} from "react-router-dom";


const Home = React.lazy(() => import("./components/Home"));
const FalkultasList = React.lazy(() => import("./components/Fakultas/List"));
const ProdiList = React.lazy(() => import("./components/Prodi/List"))

const App = () => {
  return (
    <Router>
      {/* Navbars */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
        <div className="container">
          <NavLink className="navbar-brand" to="/">
              Home
          </NavLink>

          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className={({ isActive }) => 
                'nav-link ${isActive ? "active" : ""}' 
              }
              to="/fakultas">
                Fakultas
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({ isActive }) => 
                'nav-link ${isActive ? "active" : ""}' 
              }
              to="/prodi">
                Program Studi
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
      <div className="container">
        <Suspense fallback={<div>Loading....</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/fakultas" element={<FalkultasList />}/>
            <Route path="/prodi" element={<ProdiList />}/>
          </Routes>
        </Suspense>
        <div className="mt-2">&copy; 2024 Mahasiswa</div>
      </div>
    </Router>
  )
};

export default App;