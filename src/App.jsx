import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import Layout from './components/Layout';
import ScrollToAnchor from './components/ScrollToAnchor';
import GalaxySite from './GalaxySite';
import About from './pages/About';

// GitHub Pages SPA fallback: public/404.html stashes the requested path in
// sessionStorage and redirects to "/"; we restore it here after the app boots.
function RedirectHandler() {
    const navigate = useNavigate();
    useEffect(() => {
        const redirect = sessionStorage.getItem('spa-redirect');
        if (redirect) {
            sessionStorage.removeItem('spa-redirect');
            navigate(redirect, { replace: true });
        }
    }, [navigate]);
    return null;
}

function App() {
    return (
        <BrowserRouter>
            <RedirectHandler />
            <ScrollToAnchor />
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/" element={<GalaxySite />} />
                    <Route path="/about" element={<About />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
