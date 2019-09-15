export const cryptoMockResponse = {
    "status": {
        "timestamp": "2019-09-15T11:20:56.100Z",
        "error_code": 0,
        "error_message": null,
        "elapsed": 8,
        "credit_count": 1
    },
    "data": {
        "BTC": {
            "id": 1,
            "name": "Bitcoin",
            "symbol": "BTC",
            "slug": "bitcoin",
            "num_market_pairs": 8052,
            "date_added": "2013-04-28T00:00:00.000Z",
            "tags": [
                "mineable"
            ],
            "max_supply": 21000000,
            "circulating_supply": 17937025,
            "total_supply": 17937025,
            "is_market_cap_included_in_calc": 1,
            "platform": null,
            "cmc_rank": 1,
            "last_updated": "2019-09-15T11:19:31.000Z",
            "quote": {
                "USD": {
                    "price": 10383.5782909,
                    "volume_24h": 14004686455.2687,
                    "percent_change_1h": 0.324724,
                    "percent_change_24h": 0.590395,
                    "percent_change_7d": -1.09798,
                    "market_cap": 186250503393.3306,
                    "last_updated": "2019-09-15T11:19:31.000Z"
                }
            }
        }
    }
}

export const fiatMockResponse = {
    "rates":
    {
        "EUR": 0.9012256669,
        "AUD": 1.4533165105,
        "BRL": 4.0522710887,
        "GBP": 0.8029289834
    },
    "base": "USD",
    "date": "2019-09-13"
}