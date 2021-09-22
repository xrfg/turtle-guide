import React from 'react'
import {Link} from 'react-router-dom'
import { Container} from '@material-ui/core'

import pageNotFoundImage from '../../assets/images/PageNotFound/404image.jpg'
import CustomButton from '../Buttons/CustomButtons/CustomButton'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    Container:{
        margin:"30px auto",
        padding:"20px",
        height:"100vh",
        width:"100%",
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        flexDirection:"column"
    },
    hero:{
        width: "100%",
        height:"100%",
    },
    btnContainer:{
        marginTop:"20px",
        
    },
}))

export default function PageNotFoundAdmin() {
    const classes = useStyles()

    return (
        <Container className={classes.Container} >
                <img
                className={classes.hero} 
                src={pageNotFoundImage} alt="error" />
            <Link className={classes.btnContainer}  to="/">
            <CustomButton
            text="Back To Home"
            startIcon="arrowBack"
            /> 
            </Link>
            
              
            
              
            
        </Container>
    )
}
