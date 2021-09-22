import React from 'react'
import {Link} from 'react-router-dom'

import { Container} from '@material-ui/core' 

import pageNotFoundImage from '../../../../assets/images/PageNotFound/404image.jpg'
import CustomButton from '../../../Buttons/CustomButtons/CustomButton'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles((theme) => ({
    Container:{
        padding:"20px",
        height:"100vh",
        width:"100vw",
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        flexDirection:"column"
    },
    hero:{
        width: "100%",
        height:"70%",
        backgroundSize:"100% 100%",
    },
    btn:{
        backgroundColor:"red",
    }
}))
export default function PageNotFoundGuide() {

    const classes = useStyles()
    return (
        <Container className={classes.Container} >
                <img
                className={classes.hero} 
                src={pageNotFoundImage} alt="error" />
            <Link  to="/events/van-gogh">
            <CustomButton
            className={classes.btn}
            text="Back To Home"
            startIcon="arrowBack"
            /> 
            </Link>
            
              
            
              
            
        </Container>
    )
}
