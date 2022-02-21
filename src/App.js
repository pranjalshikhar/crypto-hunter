import "./App.css";
import { makeStyles } from "@material-ui/core";
import HomePage from './Pages/HomePage'
import { BrowserRouter, Route } from "react-router-dom";
import CoinPage from "./Pages/CoinPage";
import Header from "./Components/Header";

const useStyles = makeStyles(() => ({
  App: {
    // backgroundColor: "#14161a",
    background: "linear-gradient(90deg, rgba(5,4,20,1) 0%, rgba(19,49,113,1) 100%)",
    color: "white",
    minHeight: "100vh",
  },
}));


function App() {
  const classes = useStyles();

  return (
    <BrowserRouter>
      <div className={classes.App}>
        <Header />
        <Route path="/" component={HomePage} exact />
        <Route path="/coins/:id" component={CoinPage} />
      </div>
    </BrowserRouter>
  );
}

export default App;