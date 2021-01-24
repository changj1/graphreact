import {useQuery, gql} from '@apollo/client'

const EXCHANGE_RATES = gql`
    query GetExchangeRates{
        rates(currency: "USD"){
            currency
            rate
        }
    }
`
function ExchangeRates(params) {
    const {loading, error, data} = useQuery(EXCHANGE_RATES)   

    if(loading) return <p>Loading...</p>
    if(error) return <p>`Error:${error.message}`</p>

    return data.rates.map(({currency, rate})=>(
        <div key={currency}>
            <p>
                {currency} : {rate}
            </p>
        </div>
    ))
}

export default ExchangeRates