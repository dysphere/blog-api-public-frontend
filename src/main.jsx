import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import '@mantine/core/styles.css';
import { createTheme, MantineProvider } from '@mantine/core';
import { UserProvider } from './UserProvider';
import Router from './router';

const theme = createTheme({
  /** Put your mantine theme override here */
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MantineProvider theme={theme}>
      <UserProvider>
        <Router/>
      </UserProvider>
    </MantineProvider>
  </React.StrictMode>,
)
