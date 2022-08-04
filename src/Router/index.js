import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import LandingPage from '../Pages/LandingPage';
import Detail from '../Pages/Detail';
import About from '../Pages/About';

export default function router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/'>
          <Route index element={<LandingPage />} />
        </Route>
        <Route path='/detail' element={<Detail />} />

        <Route path='/about' element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}
