import React, { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'
import { CoinList } from './Config/API'
import { onAuthStateChanged } from 'firebase/auth'
import { auth, db } from './firebase'
import { doc, onSnapshot } from 'firebase/firestore'

const Crypto = createContext()

const CryptoContext = ({ children }) => {
    const [currency, setCurrency] = useState('INR')
    const [symbol, setSymbol] = useState('₹')
    const [coins, setCoins] = useState([])
    const [loading ,setLoading] = useState(false)
    const [user, setUser] = useState(null)
    const [alert, setAlert] = useState({
        open: false,
        message: "",
        type: "success",
    });

    const [watchlist, setWatchlist] = useState([]);

    useEffect(() => {
        if(user) {
            const coinRef = doc(db, "watchlist", user.uid);

            var unsubscribe = onSnapshot(coinRef, coin => {
                if(coin.exists()) {
                    console.log(coin.data().coins);
                    setWatchlist(coin.data().coins);
                }
                else {
                    console.log("No items in the watchlist.");
                }
            });
            return () => {
                unsubscribe();
            }
        }
    }, [user])
    

    useEffect(() => {
        onAuthStateChanged(auth, user => {
            if(user) {
                setUser(user)
            }
            else {
                setUser(null)
            }
            console.log(user)
        })
    }, []);
    

    // Fetch Data from API
    const fetchCoinList = async () => {
        setLoading(true)
        const { data } = await axios.get(CoinList(currency));
        setCoins(data);
        setLoading(false);
    };

    useEffect(() => {
        if(currency === 'INR') setSymbol('₹')
        else if(currency === 'USD') setSymbol('$')
    }, [currency])
    

    return (
        <Crypto.Provider value={{currency, symbol, setCurrency, coins, loading, fetchCoinList, alert, setAlert, user, watchlist}}>
            {children}
        </Crypto.Provider>
  )
}

export const CryptoState = () => {
    return useContext(Crypto)
}

export default CryptoContext