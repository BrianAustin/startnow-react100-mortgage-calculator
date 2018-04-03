import React from 'react';

export default class App extends React.Component {
  // your Javascript goes here
  constructor(props) {
    super(props);
    //setting initial state below
    this.state = {
      balance: '',
      rate: '',
      term: '',
      payment: ''
    };
    //event binding for updating state values
    this.updateBalance = this.updateBalance.bind(this);
    this.updateRate = this.updateRate.bind(this);
    this.updateTerm = this.updateTerm.bind(this);
    //event binding for making calculation
    this.calculate = this.calculate.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  updateBalance(e) {
    this.setState({
      balance: e.target.value
    })
  }

  updateRate(e) {
    this.setState({
      rate: e.target.value
    });
  }

  updateTerm(e) {
    this.setState({
      term: e.target.value
    });
  }

  calculate(balance, rate, term) {
    let n = term * 12;
    let r = (rate / 100) / 12;
    let numerator = r * (1 + r)**n;
    let denominator = ((1 + r)**n) - 1;

    return parseFloat(balance * (numerator / denominator)).toFixed(2);
  }

  handleClick(e) {
    e.preventDefault();

    let balance = this.state.balance;
    let rate = this.state.rate;
    let term = this.state.term;

    let payment = this.calculate(balance, rate, term);
    // Now set the value so that the user will see the result
    this.setState({
      payment: '$' + payment + ' is your payment.'
    });
  }

  render() {
    return (

      <div className='container'>
        {
          <form className='form-horizontal'>
            <div className='col-sm-2'>
            </div>
            <div className='page-header'>
              <h3>Mortgage Calculator</h3>
            </div>
            <div className='form-group'>
              <label for='balance' className='col-sm-2 control-label'>Loan Balance</label>
              <div className='col-sm-5'>
                <input name='balance' value={this.state.balance} onChange={this.updateBalance} className='form-control input-sm' type='number' placeholder='0' />
              </div>
            </div>
            <div className='form-group'>
              <label for='rate' className='col-sm-2 control-label'>Interest Rate (%)</label>
              <div className='col-sm-5'>
                <input name='rate' value={this.state.rate} onChange={this.updateRate} className='form-control input-sm' type='number' step='0.01' placeholder='0' />
              </div>
            </div>
            <div className='form-group'>
              <label for='term' className='col-sm-2 control-label'>Loan Term (years)</label>
              <div className='col-sm-5' type='number'>
                <select name='term' 
                  value={this.state.term} 
                  onChange={this.updateTerm} 
                  className='form-control input-sm' 
                  type='number'>
                    <option value='0'>0</option>
                    <option value='15'>15</option>
                    <option value='30'>30</option>
                </select>
              </div>
            </div>
            <div className='form-group'>
              <div className='col-sm-offset-2 col-sm-10'>
                <button 
                  name='submit' 
                  className='btn btn-primary' 
                  onClick={this.handleClick}>Calculate</button>
              </div>
            </div>
            <div id='output' name='output'><p>{this.state.payment}</p></div>
          </form>
        }
      </div>
    );
  }
}
