import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import { CryptoState } from '../../CryptoContext';
import { Avatar } from '@material-ui/core';

const useStyles = makeStyles({
    container: {
        width: 350,
        padding: 25,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        fontFamily: "Montserrat",
        backgroundColor: "#060518",
        textAlign: "center"
    },
    profile: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "20px",
        height: "92%",
    },
    picture: {
        height: 200,
        width: 200,
        cursor: "pointer",
        backgroundColor: "gold",
        objectFit: "contain"
    },
    logout: {
        // border: "1px solid gold",
        borderRadius: 0,
        width: "100%",
        padding: 10,
        paddingLeft: 20,
        paddingRight: 20,
        fontFamily: "Montserrat",
        cursor: "pointer",
        backgroundColor: "gold" ,
        color: "#060518",
        fontWeight: 700,
        textAlign: "center",
        // "&:hover": {
        //     backgroundColor: "black",
        //     color: "gold",
        // },
        //   margin: 5,
    },
    watchlist: {
        flex: 1,
        width: "100%",
        backgroundColor: "#131d58",
        borderRadius: 10,
        padding: 15,
        paddingTop: 10,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 12,
        overflowY: "scroll",
    },
});

export default function UserSidebar() {
    const classes = useStyles();
    const [state, setState] = React.useState({
        right: false,
    });
    const { user } = CryptoState();

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
          return;
        }

        setState({ ...state, [anchor]: open });
    };

    const logOut = () => {}


    return (
        <div>
        {['right'].map((anchor) => (
            <React.Fragment key={anchor}>
            <Avatar
                onClick={toggleDrawer(anchor, true)}
                style={{
                    height: 38,
                    width: 38,
                    // marginLeft: 15,
                    cursor: "pointer",
                    backgroundColor: "gold"
                }} 
                src={user.photoURL}
                alt={user.displayName || user.email}
            />
            <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
                <div className={classes.container}>
                    <div className={classes.profile}>
                        <Avatar
                            onClick={toggleDrawer(anchor, true)}
                            src={user.photoURL}
                            alt={user.displayName || user.email}
                            className={classes.picture}
                        />
                        <span style={{
                            width: "100%",
                            fontSize: 25,
                            textALign: "center",
                            fontWeight: "bolder",
                            wordWrap: "break-word",
                            color: "white"
                        }}>
                            {user.displayName || user.email}
                        </span>
                        <div className={classes.watchlist}>
                            <span style={{
                                fontSize: 15,
                                textShadow: "0 0 5px black",
                                color: "white"
                            }}>
                                WATCHLIST
                            </span>
                        </div>
                    </div>
                </div>

                <div>
                    <Button
                        variant="contained"
                        className={classes.logout}
                        onClick={logOut}
                    >
                        Log Out
                    </Button>
                </div>
            </Drawer>
            </React.Fragment>
        ))}
        </div>
    );
}