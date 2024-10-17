import React, { Suspense } from "react";
import { NavLink } from "react-router-dom";

import {BrowserRouter as Router, Route, Routes, Link} from "react-router-dom";


const Home = React.lazy(() => import("./components/Home"));
const FalkultasList = React.lazy(() => import("./components/Fakultas/List"));
const ProdiList = React.lazy(() => import("./components/Prodi/List"))
const FakultasCreate = React.lazy(() => import("./components/Fakultas/Create"));

const FakultasEdit = React.lazy(() => import("./components/Fakultas/Edit"));

const ProdiCreate = React.lazy(() => import("./components/Prodi/Create"));
const ProdiEdit = React.lazy(() => import('./components/Prodi/Edit'));

const App = () => {
  return (
      <Router>
        {/* Header */}
        <nav className="navbar navbar-expand-lg bg-light">
          <div className="container">
            <a className="navbar-brand" href="#">Navbar</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                    aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <NavLink className={({isActive}) =>
                      'nav-link ${isActive ? "active" : ""}'
                  }
                           to="/fakultas">
                    Fakultas
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                      className={({isActive}) => 'nav-link ${isActive ? "active" : ""}'}
                      to="/prodi">
                    Program Studi
                  </NavLink>

                </li>
              </ul>
            </div>
          </div>
        </nav>

        {/* Contents */}
        <div className="container py-5">
          <Suspense fallback={<div>Loading....</div>}>
            <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="/fakultas" element={<FalkultasList/>}/>
              <Route path="/fakultas/create" element={<FakultasCreate/>}/>
              <Route path="/fakultas/edit/:id" element={<FakultasEdit/>}/>

              <Route path="/prodi" element={<ProdiList/>}/>
              <Route path="/prodi/create" element={<ProdiCreate/>}/>
              <Route path="/prodi/edit/:id" element={<ProdiEdit/>}/>

            </Routes>
          </Suspense>
          {/* Footer */}
          <div className="my-5 py-2">
            <div className="d-flex justify-content-center align-items-center">
              &copy; 2024 Mahasiswa UMDP
            </div>
          </div>
        </div>
      </Router>
  )
};

export default App;