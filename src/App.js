import React from 'react';
import './App.css';
import Web3 from 'web3';

const web3 = new Web3(window.ethereum);

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      balance: "<Fetching balance>"
    };

    (async () => {
      const balance = await web3.eth.getBalance("0xe14466f04e13764dc0E28cd954848c68b2260C46");
      this.setState({ balance: `${web3.utils.fromWei(balance)} ETH`})
    })();
  }

  sendEther(e) {
    e.preventDefault();
    window.ethereum.enable();

    (async () => {
      await web3.eth.sendTransaction({
        from: window.ethereum.selectedAddress,
        to: this.to.value,
        value: web3.utils.toWei(this.value.value)
      });
    })();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>{this.state.balance}</p>
          <form onSubmit={(e) => this.sendEther(e)}>
            <input placeholder="보낼 주소" ref={(input) => this.to = input} style={{width: "500px"}}/>
            <br />
            <input placeholder="보낼 금액" ref={(input) => this.value = input} style={{width: "500px"}}/>
            <br />
            <button type="submit">Send</button>
          </form>
        </header>
      </div>
    );
  }
}

export default App;
