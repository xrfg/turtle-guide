import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CardActionArea from '@material-ui/core/CardActionArea';

import {Grid,Container,Button,Box } from "@material-ui/core"
import Card from '@material-ui/core/Card';

import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';

import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles((theme) => ({
  hero:{
    backgroundImage:`linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0.5)),url("https://ernst-leitz-museum.de/wp-content/uploads/2019/03/das-ernst-leitz-museum-in-wetzlar-2-2-1440x566.jpg")`,
    height:"500px",
    backgroundPosition:"center",
    backgroundRepeat:"no-repeat",
    backgroundSize:"cover",
    position:"relative",
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    color:"#fff",
    fontSize:"4rem"

  },
  guideContainer:{
    paddingTop:theme.spacing(3)
  },
  guideTitle:{
    fontWeight:800,
    paddingBottom:theme.spacing(3),
    textAlign:"center"

  },
  card:{
    maxWidth:"100%"
  },
  media:{
    height:240
  },
  cardActions:{
    display:"flex",
    margin:"0 10px",
    justifyContent:"space-between"
  }
 
}));

 

export default function Home() {
  const classes = useStyles();
  // const [expanded, setExpanded] = React.useState(false);

 

  return (
    <>

{/* Herro Section */}



<Box className={classes.hero}>
       <Box>
         Museum Guide
       </Box>
     </Box>
     {/* Herro Section */}
     <Container maxWidth="lg" className={classes.guideContainer}>

         
         <Typography variant="h4" className={classes.guideTitle}>
        Welcome to our Guide
         </Typography>
         <Grid container spacing={3}>
           <Grid item xs={12} sm={6} md={4}>
           <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image="https://image.geo.de/30139448/t/Xg/v4/w1440/r1.7778/-/pergamon-museum-berlin-m-07254362-jpg--79299-.jpg"
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
          General
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.cardActions}>
        
       
        <Button size="small" color="primary">
         See our Guides
        </Button>

      </CardActions>
    </Card>
           </Grid>
           <Grid item xs={12} sm={6} md={4}>
           <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image="https://ernst-leitz-museum.de/wp-content/uploads/2019/03/05_leica-store-in-wetzlar-1440x960.jpg"
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
          Natural history museums
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.cardActions}>
        
       
        <Button size="small" color="primary">
         See our Guides
        </Button>

      </CardActions>
    </Card>

</Grid>

<Grid item xs={12} sm={6} md={4}>
<Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image="https://www.visitberlin.de/system/files/styles/visitberlin_hero_visitberlin_desktop_2x/private/image/NaturkundeMuseum_Sauriersaal_04__Foto_©_Carola-Radke-MfN_DL_PPT_0.jpg?h=10d202d3&itok=3r9Pr0Ht"
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
           Arts
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.cardActions}>
        
       
        <Button size="small" color="primary">
         See our Guides
        </Button>

      </CardActions>
    </Card>

</Grid>

<Grid item xs={12} sm={6} md={4}>
<Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image="https://img.lovepik.com/photo/50129/1881.jpg_wh860.jpg"
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
          Science and technology
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.cardActions}>
        
       
        <Button size="small" color="primary">
         See our Guides
        </Button>

      </CardActions>
    </Card>

</Grid>
<Grid item xs={12} sm={6} md={4}>
<Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image="https://image.shutterstock.com/image-photo/moscow-russia-december-13-2017-260nw-1055707085.jpg"
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
        History
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.cardActions}>
        
       
        <Button size="small" color="primary">
         See our Guides
        </Button>

      </CardActions>
    </Card>
</Grid>


         </Grid>
     </Container>

    
    </>
  );
}