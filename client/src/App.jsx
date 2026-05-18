
import React from 'react'; // Add this line
import Layout from './components/Layout/layout';
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

function App() {
  useEffect(() => {
    // Initialize AOS
    AOS.init({
      duration: 1000, // Animation duration
      once: true, // Whether animation should happen only once
    });
  }, []);

  return (
    <div>
      <Layout />
    </div>

  );
}

export default App;
