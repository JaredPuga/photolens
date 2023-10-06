import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import ShowPhotos from './ShowPhotos';
import CreatePhoto from './CreatePhoto';

const AppRouter = () => {
  return (
    <div className="container">
      <Router>
        <Routes>
          <Route path="/" element={<ShowPhotos />} />
          <Route path="/create-photo" element={<CreatePhoto />} />
        </Routes>
      </Router>
    </div>
  );
};

export default AppRouter;
