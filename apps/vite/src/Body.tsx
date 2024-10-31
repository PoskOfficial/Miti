import { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';

import AnnouncementAlert from './components/AnnouncementAlert';
import { DarkModeContext } from './components/DarkModeProvider';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import About from './pages/About';
import Calendar2 from './pages/Calendar2';
import DateConverter from './pages/DateConverter';
import GoogleApiDisclosure from './pages/GoogleApiDisclosure';
import Home from './pages/Home';
import PrivacyPolicy from './pages/PrivacyPolicy';

const Body = () => {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className={(darkMode ? 'dark' : '') + ' flex min-h-screen flex-col'}>
      <AnnouncementAlert />
      <Navbar />
      <div className="flex-grow">
        <Routes>
          <Route path="/:pageType?/:BSYear?/:BSMonth?" element={<Home />} />
          <Route path="/calendar2" element={<Calendar2 />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/converter" element={<DateConverter />} />
          <Route path="/about" element={<About />} />
          <Route
            path="/google-api-disclosure"
            element={<GoogleApiDisclosure />}
          />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default Body;
