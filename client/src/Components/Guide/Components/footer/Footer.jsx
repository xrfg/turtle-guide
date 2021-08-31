import React from 'react'
import { Container,Box,Grid } from '@material-ui/core'
// import "./footer.scss"
import { Link } from 'react-router-dom'


export default function Footer() { 
  return (
      <footer>
      <Box 
      px={{xs:3,sm:10}}
      py={{xs:5,sm:10}}
      bgcolor="text.secondary"
       color="white">
        <Container maxWidth="lg">
          <Grid container spacing={5}>
            <Grid item xs={12} sm={4}>
              <Box borderBottom={1}> Help </Box>
              <Box>
                <Link href="/" color="inherit">Contact</Link>
              </Box>
              <Box>
                <Link href="/" color="inherit">Support</Link>
              </Box>
              <Box>
                <Link href="/" color="inherit">Privacy</Link>
              </Box>
            </Grid>
            {/* 2 */}
            <Grid item xs={12} sm={4}>
              <Box borderBottom={1}> Account </Box>
              <Box>
                <Link href="/" color="inherit">Account</Link>
              </Box>
              <Box>
                <Link href="/" color="inherit">Login</Link>
              </Box>
              <Box>
                <Link href="/" color="inherit">About the App</Link>
              </Box>
            </Grid>
            {/* 3 */}
            <Grid item xs={12} sm={4}>
              <Box borderBottom={1}> Turtle App </Box>
              <Box>
                <Link href="/" color="inherit">API</Link>
              </Box>
              <Box>
                <Link href="/" color="inherit">Documentation</Link>
              </Box>
              <Box>
                <Link href="/" color="inherit">Register</Link>
              </Box>
            </Grid>

          </Grid>
          <Box textAlign="center" pt={{xs:5,sm:10}} pb={{xs:5,sm:0}}>
           © Turtle App Team &reg; {new Date().getFullYear()}
          </Box>

        </Container>
      </Box>

      </footer>
      
    
  )
}
