import React, {  } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import PrivateRoutes from "./utils/privateRoute.jsx";
import PublicRoutes from "./utils/publicRoute.jsx";

//PUBLIC ROUTES
import Home from "./components/public/Home.jsx";
import Login from "./components/public/Login.jsx";
import Register from "./components/public/Register.jsx";

//PRIVATE ROUTES
import Dashboard from "./components/secure/Dashboard.jsx";
import ViaturasList from "./components/secure/Viaturas/viaturalist.jsx";
import Viatura from "./components/secure/Viaturas/viatura.jsx";

import Footer from "./components/shared/Footer.jsx";
import Header from "./components/shared/Header.jsx";
import Marcacaolist from "./components/secure/Marcacoes/marcacaolist.jsx";
import Marcacao from "./components/secure/Marcacoes/marcacao.jsx";

const App = () => {
    return (
        <div>
            <div className="container mt-3">
                <Header />
                <Routes>
                    <Route element={<PrivateRoutes />}>
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/viaturas-list" element={<ViaturasList />} />
                        <Route path="/viatura" element={<Viatura />} />
                        <Route path="/viatura/:id" element={<Viatura />} />

                        <Route path="/marcacao" element={<Marcacao />} />
                        <Route path="/marcacao/:id" element={<Marcacao />} />
                        <Route path="/marcacoes-list" element={<Marcacaolist />} />


                        <Route path='*'element={<Navigate to="/dashboard" />} />
                    </Route>

                    <Route element={<PublicRoutes />}>
                        <Route exact path={"/"} element={<Home />} />
                        <Route exact path="/login" element={<Login />} />
                        <Route exact path="/register" element={<Register />} />
                        <Route path="*" element={<Navigate to="/" />}  />
                    </Route>
                </Routes>
                <Footer />
            </div>
        </div>
    );
};

export default App;