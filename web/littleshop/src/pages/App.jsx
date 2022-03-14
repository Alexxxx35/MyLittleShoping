import React from 'react'
import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";

import Home from './Home';
import Login from './Login';
import Register from './Register';

const App = () => {
    return (
        <Router>
            <Routes>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/login' element={<Login />} />
            <Route exact path='/register' element={<Register />} />
            </Routes>
        </Router>
    )
}

export default App