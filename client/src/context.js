import React, { Component } from 'react'
import axios from 'axios'
const {Consumer, Provider} = React.createContext();


export default class GlobalProvider extends Component {
    state = {
      coins: [],
      coinNames: [],
      currentCoin: "BTC",
      BTCHISTORICAL: [],
      ETHHISTORICAL: [],
      XRPHISTORICAL: [],
      LTCHISTORICAL: [],
      EOSHISTORICAL: [],
      BTC: [],
      ETH: [],
      XRP: [],
      LTC: [],
      EOS: [],
      BTCname: [],
      ETHname: [],
      XRPname: [],
      LTCname: [],
      EOSname: [],
      coinPrice: '',
      coinVolume: '',
      coinHigh: '',
      coinLow: '',
      coinMrkcap: '',
      coinPrctg: '',
      coinOpen: '',
      coinPriceChng: '',
      coinImg: 'https://en.bitcoin.it/w/images/en/2/29/BC_Logo_.png',
    }

    componentDidMount(){
      console.log('component mounted')
      this.getCoinData() 
      this.getCoinData2()
      this.getCoinNames()
      // this.countDown()
 }

 countDown = () => {
  setInterval(() => { 
     console.log("running")
    this.postCoinDataDB();
    }, 10000)
}


    getHistoricalBTC = () => {
      axios.get(`https://vschool-cors.herokuapp.com?url=https://min-api.cryptocompare.com/data/histoday?fsym=BTC&tsym=USD&limit=30&aggregate=1&e=CCCAGG&api_key=${process.env.REACT_APP_NN}`)
      .then(res=> {
      
        this.setState({
          BTCHISTORICAL: res.data
        })
      })
    }
    
      getHistoricalETH = () => {
      axios.get(`https://vschool-cors.herokuapp.com?url=https://min-api.cryptocompare.com/data/histoday?fsym=ETH&tsym=USD&limit=30&aggregate=1&e=CCCAGG&api_key=${process.env.REACT_APP_NN}`)
      .then(res=> {
        this.setState({
          ETHHISTORICAL: res.data
        })
        // console.log(this.state.ETHHISTORICAL)
      })
    }
      getHistoricalXRP = () => {
      axios.get(`https://vschool-cors.herokuapp.com?url=https://min-api.cryptocompare.com/data/histoday?fsym=XRP&tsym=USD&limit=30&aggregate=1&e=CCCAGG&api_key=${process.env.REACT_APP_NN}`)
      .then(res=> {
        this.setState({
          XRPHISTORICAL: res.data
        })
        // console.log(this.state.XRPHISTORICAL)
      })
    }
      getHistoricalLTC = () => {
      axios.get(`https://vschool-cors.herokuapp.com?url=https://min-api.cryptocompare.com/data/histoday?fsym=LTC&tsym=USD&limit=30&aggregate=1&e=CCCAGG&api_key=${process.env.REACT_APP_NN}`)
      .then(res=> {
        this.setState({
          LTCHISTORICAL: res.data
        })
        // console.log(this.state.LTCHISTORICAL)
      })
    }
      getHistoricalEOS = () => {
      axios.get(`https://vschool-cors.herokuapp.com?url=https://min-api.cryptocompare.com/data/histoday?fsym=EOS&tsym=USD&limit=30&aggregate=1&e=CCCAGG&api_key=${process.env.REACT_APP_NN}`)
      .then(res=> {
        this.setState({
          EOSHISTORICAL: res.data
        })
        // console.log(this.state.EOSHISTORICAL)
      })
    }
    getCoinNames = () => {
       axios.get(`https://vschool-cors.herokuapp.com?url=https://min-api.cryptocompare.com/data/pricemultifull?fsyms=ETH,EOS,XRP,BTC,LTC&tsyms=USD&api_key=${process.env.REACT_APP_MM}`)
        .then(res => {
          this.setState({
            coinNames: res.data.DISPLAY.BTC
          })
          // console.log('coinNames')
          // console.log(this.state.coinNames)
    })}

    getCoinData = () => {
      axios.get(`https://vschool-cors.herokuapp.com?url=https://min-api.cryptocompare.com/data/pricemultifull?fsyms=ETH,EOS,XRP,BTC,LTC&tsyms=BTC,USD,EUR&api_key=${process.env.REACT_APP_MM}`)
      .then(res => {
        
        this.setState({
          coins: res.data,
          BTC: res.data.DISPLAY.BTC.USD,
          ETH: res.data.DISPLAY.ETH.USD,
          XRP: res.data.DISPLAY.LTC.USD,
          LTC: res.data.DISPLAY.XRP.USD,
          EOS: res.data.DISPLAY.EOS.USD,
          coinPrice: res.data.DISPLAY.BTC.USD.PRICE,
          coinVolume: res.data.DISPLAY.BTC.USD.TOTALVOLUME24H,
          coinHigh: res.data.DISPLAY.BTC.USD.HIGHDAY,
          coinLow: res.data.DISPLAY.BTC.USD.LOWDAY,
          coinMrkcap: res.data.DISPLAY.BTC.USD.MKTCAP,
          coinPrctg: res.data.DISPLAY.BTC.USD.CHANGEPCTDAY,
          coinOpen: res.data.DISPLAY.BTC.USD.OPENDAY,
          coinPriceChng: res.data.DISPLAY.BTC.USD.CHANGE24HOUR,
        })
      })
    }

    getCoinData2 = () => {
      axios.get(`https://vschool-cors.herokuapp.com?url=https://rest.coinapi.io/v1/assets?apikey=${process.env.REACT_APP_COINAPI}`)
      .then(res => {
        const data = res.data
        this.setState({
          BTCname: data.slice(0, 1),
          ETHname: data.slice(2, 3),
          LTCname: data.slice(4, 5),
          XRPname: data.slice(8, 9),
          EOSname: data.slice(14, 15)
        })

      })
      
    }

    postCoinDataDB = () => {
     axios.post('/crypto', this.state.coinNames)
      .then(res => {
        console.log(res.data)
      })
    }
  
    handleChange = (event) => {
      console.log("event change working")
      console.log(event.target.value)
      this.setState({currentCoin: event.target.value}, () => this.switchCoin())
      console.log(this.state.currentCoin);
      
  }

  switchCoin = () => {
    console.log('Function RUNNing')
    console.log(this.state.currentCoin)
    switch (this.state.currentCoin) {
      case 'BTC':
          console.log(this.state.BTC.PRICE)
          this.setState({
            coinPrice: this.state.BTC.PRICE,
            coinVolume: this.state.BTC.TOTALVOLUME24H,
            coinHigh: this.state.BTC.HIGHDAY,
            coinLow: this.state.BTC.LOWDAY,
            coinMrkcap: this.state.BTC.MKTCAP,
            coinPrctg: this.state.BTC.CHANGEPCTDAY,
            coinOpen: this.state.BTC.OPENDAY,
            coinPriceChng: this.state.BTC.CHANGE24HOUR,
            coinImg: 'https://en.bitcoin.it/w/images/en/2/29/BC_Logo_.png'
            }
          )
            break;
        // console.log(this.state.currentCoin);
      case 'ETH':
          console.log(this.state.ETH.PRICE)
          this.setState({
            coinPrice: this.state.ETH.PRICE,
            coinVolume: this.state.ETH.TOTALVOLUME24H,
            coinHigh: this.state.ETH.HIGHDAY,
            coinLow: this.state.ETH.LOWDAY,
            coinMrkcap: this.state.ETH.MKTCAP,
            coinPrctg: this.state.ETH.CHANGEPCTDAY,
            coinOpen: this.state.ETH.OPENDAY,
            coinPriceChng: this.state.ETH.CHANGE24HOUR,
            coinImg: 'https://www.ethereum.org/images/logos/ETHEREUM-ICON_Black_small.png'
          
          })
          break;
          case ('LTC'):
          this.setState({
            coinPrice: this.state.LTC.PRICE,
            coinVolume: this.state.LTC.TOTALVOLUME24H,
            coinHigh: this.state.LTC.HIGHDAY,
            coinLow: this.state.LTC.LOWDAY,
            coinMrkcap: this.state.LTC.MKTCAP,
            coinPrctg: this.state.LTC.CHANGEPCTDAY,
            coinOpen: this.state.LTC.OPENDAY,
            coinPriceChng: this.state.LTC.CHANGE24HOUR,
            coinImg: 'https://cdn4.iconfinder.com/data/icons/cryptocoins/227/LTC-512.png'
          })
          break;
          case ('EOS'):
          this.setState({
            coinPrice: this.state.EOS.PRICE,
            coinVolume: this.state.EOS.TOTALVOLUME24H,
            coinHigh: this.state.EOS.HIGHDAY,
            coinLow: this.state.EOS.LOWDAY,
            coinMrkcap: this.state.EOS.MKTCAP,
            coinPrctg: this.state.EOS.CHANGEPCTDAY,
            coinOpen: this.state.EOS.OPENDAY,
            coinPriceChng: this.state.EOS.CHANGE24HOUR,
            coinImg: 'https://cdn.iconscout.com/icon/free/png-256/eos-9-646062.png'
          })
          break;
          case ('XRP'):
          this.setState({
            coinPrice: this.state.XRP.PRICE,
            coinVolume: this.state.XRP.TOTALVOLUME24H,
            coinHigh: this.state.XRP.HIGHDAY,
            coinLow: this.state.XRP.LOWDAY,
            coinMrkcap: this.state.XRP.MKTCAP,
            coinPrctg: this.state.XRP.CHANGEPCTDAY,
            coinOpen: this.state.XRP.OPENDAY,
            coinPriceChng: this.state.XRP.CHANGE24HOUR,
            coinImg: 'https://s2.coinmarketcap.com/static/img/coins/200x200/52.png'
          })
      }
  }

  render() {
    return (
        <Provider value={{
          getCoinData: this.getCoinData,
          getCoinData2: this.getCoinData2,
          getHistoricalBTC: this.getHistoricalBTC,
          getHistoricalETH: this.getHistoricalETH,
          getHistoricalXRP: this.getHistoricalXRP,
          getHistoricalLTC: this.getHistoricalLTC,
          getHistoricalEOS: this.getHistoricalEOS,
          getCoinNames: this.getCoinNames,
          countDown: this.countDown,
          switchCoin: this.switchCoin,
          handleChange: this.handleChange,
          ...this.state
          }}>
        {this.props.children}
        </Provider>
    )
  }
}


export function withProvider(C) {
  return props => <Consumer>
    {value => <C {...value}{...props} />}
  </Consumer>
}

