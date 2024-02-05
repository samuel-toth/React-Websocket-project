import React, { useState, useEffect } from "react";

const Dashboard = () => {

    const [cryptos, setCryptos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [subcsribedCryptos, setSubscribedCryptos] = useState([]);

    useEffect(() => {

        const fetchCryptos = async () => {
            try {
                const response = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false");
                const data = await response.json();
                setCryptos(data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data", error);
            }
        };

        fetchCryptos();
    })

};

export default Dashboard;