/* eslint-disable no-unused-vars */
import { Container, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import { useHistory } from 'react-router-dom'
import Carousel from './Carousel'

const useStyles = makeStyles(() => ({
    banner : {
        backgroundImage: 'url(./banner.jpg)',
        // backgroundAttachment: 'fixed',
        // backgroundPosition: 'center',
        // backgroundRepeat: "no-repeat",
        backgroundSize: "cover"
    },
    bannerContext : {
        height: 400,
        display: "flex",
        flexDirection: "column",
        paddingTop: 25,
        justifyContent: "space-around",
    },
    tagline: {
        display: "flex",
        height: "40%",
        flexDirection: "column",
        justifyContent: "center",
        textAlign: "center",
      },
}))

const Banner = () => {
    const classes = useStyles();
    const history = useHistory();
    return (
        <div className={classes.banner}>
            <Container className={classes.bannerContext}>
                <div className={classes.tagline}>
                    <Typography
                        variant="h2"
                        style={{
                        fontWeight: "bold",
                        marginBottom: 15,
                        fontFamily: "Montserrat",
                        // color: "gold",
                        }}
                    >
                        Crypto Hunter
                    </Typography>
                    <Typography
                        variant="subtitle2"
                        style={{
                        color: "darkgray",
                        textTransform: "capitalize",
                        fontFamily: "Montserrat",
                        }}
                    >
                        Get all the Info regarding your favorite Crypto Currency
                    </Typography>
                </div>
                <Carousel />
            </Container>
        </div>
  )
}

export default Banner;