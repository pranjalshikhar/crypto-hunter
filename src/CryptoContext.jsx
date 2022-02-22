import React, { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'
import { CoinList } from './Config/API'

const Crypto = createContext()

const CryptoContext = ({ children }) => {
    const [currency, setCurrency] = useState('INR')
    const [symbol, setSymbol] = useState('₹')
    const [coins, setCoins] = useState([])
    const [loading ,setLoading] = useState(false)
    const [user, setUser] = useState(null)

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
        <Crypto.Provider value={{currency, symbol, setCurrency, coins, loading, fetchCoinList}}>
            {children}
        </Crypto.Provider>
  )
}

export const CryptoState = () => {
    return useContext(Crypto)
}

export default CryptoContext