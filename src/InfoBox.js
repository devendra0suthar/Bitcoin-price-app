import React, { Component } from 'react';
import moment from 'moment';
import './InfoBox.css';

class InfoBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPriceUSD: null,
      currentPriceGBP: null,
      currentPriceEUR: null,
      updatedAt: null
    }
  }
  componentDidMount(){
    this.getData = () => {
      const {data} = this.props;
      const url = 'https://api.coindesk.com/v1/bpi/currentprice.json';

      fetch(url).then(r => r.json())
        .then((bitcoinData) => {
          const priceUSD = bitcoinData.bpi.USD.rate_float;
          const priceGBP = bitcoinData.bpi.GBP.rate_float;
          const priceEUR = bitcoinData.bpi.EUR.rate_float;
          
          this.setState({
            currentPriceUSD: priceUSD,
            currentPriceGBP: priceGBP,
            currentPriceEUR: priceEUR,
            updatedAt: bitcoinData.time.updated
          })
        })
        .catch((e) => {
          console.log(e);
        });
    }
    this.getData();
    this.refresh = setInterval(() => this.getData(), 90000);
  }
  componentWillUnmount(){
    clearInterval(this.refresh);
  }
  render(){
    return (
      <div id="data-container">
        { this.state.currentPriceUSD ?
          <div id="left" className='box'>
            <div className="heading">{this.state.currentPriceUSD.toLocaleString('us-EN',{ style: 'currency', currency: 'USD' })}</div>
            <div className="subtext">{'Updated ' + moment(this.state.updatedAt ).fromNow()}</div>
          </div>
        : null}
        { this.state.currentPriceGBP ?
          <div id="middle" className='box'>
            <div className="heading">{this.state.currentPriceGBP.toLocaleString('us-EN',{ style: 'currency', currency: 'GBP' })}</div>
            <div className="subtext">{'Updated ' + moment(this.state.updatedAt ).fromNow()}</div>
          </div>
        : null}
        { this.state.currentPriceEUR ?
          <div id="right" className='box'>
            <div className="heading">{this.state.currentPriceEUR.toLocaleString('us-EN',{ style: 'currency', currency: 'EUR' })}</div>
            <div className="subtext">{'Updated ' + moment(this.state.updatedAt ).fromNow()}</div>
          </div>
        : null}
      </div>
    );
  }
}

export default InfoBox;