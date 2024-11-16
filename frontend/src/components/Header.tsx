import React from 'react'
import { AppBar, Toolbar } from '@mui/material'
import Logo from './shared/Logo'
import { userAuth } from '../context/AuthContext'
import NavigationLinks from './shared/NavigationLinks'

const Header = () => {
  const auth = userAuth();
  return (
    <div>
        <AppBar sx={{ bgcolor: "transparent", position: "static", boxShadow: "none" }}>
            <Toolbar sx={{ display: "flex" }}>
                <Logo></Logo>
                <div>
                  {
                    auth?.isLoggedIn ? 
                    <>
                      <NavigationLinks
                        bg="#00fffc"
                        to="/chat"
                        text="Go To Chat"
                        textColor="black"
                      />
                      <NavigationLinks
                        bg="#51538f"
                        textColor="white"
                        to="/"
                        text="logout"
                        onClick={auth.logout}
                      />
                    </> : 
                     <>
                     <NavigationLinks
                       bg="#00fffc"
                       to="/login"
                       text="Login"
                       textColor="black"
                     />
                     <NavigationLinks
                       bg="#51538f"
                       textColor="white"
                       to="/signup"
                       text="Signup"
                     />
                   </>
                  }
              </div>
            </Toolbar>
        </AppBar>
    </div>
  )
}

export default Header