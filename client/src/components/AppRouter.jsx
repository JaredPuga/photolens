import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Importa Routes y Route

import ShowPhotos from './ShowPhotos';
import CreatePhoto from './CreatePhoto';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ShowPhotos />} />
        <Route path="/create-photo" element={<CreatePhoto />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
