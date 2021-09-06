import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';

import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 140,

    },

});

export default function CardsHome() {
    const classes = useStyles();

    return (

        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image="/"
                    title="Contemplative Reptile"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        Ldwwd
          </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ut sed voluptates nisi eveniet harum vel eaque illum fugit nam, at fugiat culpa qui incidunt maxime corporis eligendi hic necessitatibus magnam.
          </Typography>
                </CardContent>
            </CardActionArea>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image="/"
                    title="Contemplative Reptile"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        ddwdwdwf
          </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas delectus quaerat adipisci dolorum nesciunt fugiat neque. Mollitia voluptatibus illum, a culpa corporis repudiandae provident eos nostrum vitae ut sapiente. Doloribus.
          </Typography>
                </CardContent>
            </CardActionArea>

        </Card>

    );
}