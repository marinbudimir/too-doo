import * as React from 'react';
import './App.css';
import Register from './user/Register';
import Login from './user/Login';
import ListCollection from './list/Collection';
import List from './list/List';
import ShareList from './list/ShareList';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from "@mui/material/CssBaseline";

function App() {
  const [loggedIn, setLoggedIn] = React.useState(false);

  const theme = createTheme({
    palette: {
      background: {
        default: "#eff6ee"
      },
      primary: {
        main: '#f9c539'
      },
      secondary: {
        main: '#000000',
        light: '#808080'
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
          {loggedIn ?
              <Routes>
                  <Route path="/list" element={<ListCollection setLoggedIn={setLoggedIn} />}>
                  </Route>
                  <Route path="/list/:id" element={<List setLoggedIn={setLoggedIn} />}>
                  </Route>
              </Routes>
              :
              <Routes>
                  <Route path="/" element={<Login setLoggedIn={setLoggedIn} />}>
                  </Route>
                  <Route path="/register" element={<Register />}>
                  </Route>
                  <Route path="/list/:id" element={<ShareList />}>
                  </Route>
              </Routes>
          }
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
