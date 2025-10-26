import React, { useEffect, useContext } from 'react';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Notification from './components/Notification/Notification';
import { ThemeContext } from './context/ThemeContext';
import './App.css';

function Main({cartItems, notification, handleCloseNotification}) {
  const { isDarkMode } = useContext(ThemeContext);

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
      document.body.classList.remove('light-mode');
    } else {
      document.body.classList.add('light-mode');
      document.body.classList.remove('dark-mode');
    }
  }, [isDarkMode]);

  return (
    <div className={`App ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
        <Navbar cartItemCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)} />
        {notification && (
        <Notification
            message={notification.message}
            type={notification.type}
            onClose={handleCloseNotification}
        />
        )}
        {/* <Footer /> */}
    </div>
  );
}

export default Main;
