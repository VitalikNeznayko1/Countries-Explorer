import {Navigate, Route, Routes} from 'react-router'
import Home from '../pages/Home/Home';
import AboutCountry from '../pages/AboutCountry/AboutCountry';
import LanguagePage from "../pages/LanguagePage/LanguagePage";

function AppRouter(){
  sessionStorage.setItem("pageNum", 1);
    return (
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/about/:cca3" element={<AboutCountry />} />
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home/language/:language" element={<LanguagePage />} />
      </Routes>
    );
}

export default AppRouter