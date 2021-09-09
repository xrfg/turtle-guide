import { Container, Grid, Box, Link } from "@material-ui/core";

export default function Footer() {
  return (
    <footer>
      <Box
        px={{ xs: 3, sm: 10 }}
        py={{ xs: 5, sm: 10 }}
        bgcolor="lightgrey"
        color="black"
      >
        <Container maxWidth="lg">
          <Grid container spacing={5}>
            <Grid item xs={12} sm={4}>
              <Box borderBottom={1}>Help</Box>
              <Box>
                <Link href="/" color="inherit">
                  Contact
                </Link>
              </Box>
              <Box>
                <Link href="/" color="inherit">
                  Support
                </Link>
              </Box>
              <Box>
                <Link href="/" color="inherit">
                  Privacy
                </Link>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box borderBottom={1}>Company</Box>
              <Box>
                <Link href="/" color="inherit">
                  Terms ans Policy
                </Link>
              </Box>
              <Box>
                <Link href="/" color="inherit">
                  Careers
                </Link>
              </Box>
              <Box>
                <Link href="/" color="inherit">
                  Media
                </Link>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box borderBottom={1}>Product</Box>
              <Box>
                <Link href="/" color="inherit">
                  What`s new
                </Link>
              </Box>
              <Box>
                <Link href="/" color="inherit">
                  Pricing
                </Link>
              </Box>
              <Box>
                <Link href="/" color="inherit">
                  Enterprise
                </Link>
              </Box>
            </Grid>
          </Grid>
          <Box textAlign="center" pt={{ xs: 5, sm: 10 }} pb={{ xs: 5, sm: 0 }}>
            Turtle Guide @2021
          </Box>
        </Container>
      </Box>
    </footer>
  );
}
