import React, { Component } from 'react';
import logo from './logo.svg';
import fire from './fire';

class App extends Component {

  state = {
    currentItem: '',
    username: '',
    items: []
  }

  componentDidMount(){
    const itemsRef = fire.database().ref('items')
    itemsRef.on('value', (snapshot) => {
      let items = snapshot.val();
      console.log(items)
      let newState = [];
      for(let item in items){
        newState.push({
          id: item,
          title: items[item].title,
          user: items[item].user
        })
      }
      this.setState({
        items: newState
      })
    })
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const itemsRef = fire.database().ref('items');
    const item = {
      title: this.state.currentItem,
      user: this.state.username
    }
    itemsRef.push(item);
    this.setState({
      currentItem: '',
      username: ''
    });
  }

  removeItem = (itemId) => {
    const itemsRef = fire.database().ref(`/items/${itemId}`)
    itemsRef.remove();
  }


  render() {
    return (
      <div className='app'>
        <header>
            <div className='wrapper'>
              <h1>Fun Food Friends</h1>
              
            </div>
        </header>
        <div className='container'>
          <section className='add-item'>
              <form onSubmit={this.handleSubmit}>
                <input type="text" name="username" placeholder="What's your name?" onChange={this.handleChange} value={this.state.username} />
                <input type="text" name="currentItem" placeholder="What are you bringing?" onChange={this.handleChange} value={this.state.currentItem} />
                <button>Add Item</button>
              </form>
          </section>
          <section className='display-item'>
            <div className='wrapper'>
              <ul>
                {this.state.items.map((item) => {
                  return <li key={item.id}>{item.user} is bringin {item.title}.<button onClick={() => this.removeItem(item.id)}>DELETE</button></li>
                })}
              </ul>
            </div>
          </section>
        </div>
      </div>
    );
  }
}
export default App;