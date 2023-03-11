import React from 'react';
import StartFirebase from '../src/components/firebaseConfig';
import { ref, set, get, update, remove, child } from 'firebase/database'
import "../src/App.css"
export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            db: '',
            username: '',
            latitude: '',
            longitude: ''
        }
        this.interface=this.interface.bind(this);
    }

    componentDidMount() {
      let x,y;
      let self = this;
      if (navigator.geolocation) {
        navigator.geolocation.watchPosition(function(position) {
          x = position.coords.latitude;
          y = position.coords.longitude;
          
        self.setState({latitude:x});
        self.setState({longitude:y});
          console.log("Latitude is :", position.coords.latitude);
          console.log("Longitude is :", position.coords.longitude);
        });
      }

        this.setState({
            db: StartFirebase()
        });

    }

    render() {
        return (
            <div class="App">
              <div class="App-header">
                <input type="text" id="userbox" placeholder='Enter User Name' value={this.state.username} onChange={e => this.setState({ username: e.target.value })}></input>
                <p>{this.state.latitude || 'Loading latitude..'}</p>
                <p>{this.state.longitude || 'Loading longitude..'}</p>

                <button id="addBtn" onClick={this.interface}>Send Data</button>
                </div>
            </div>
        )
    }
    
    interface(event){
        const id = event.target.id;
        this.addData();
    }

    getInputs(){
        return{
            username: this.state.username,
            latitude: this.state.latitude,
            longitude: this.state.longitude
        }
    }
    addData(){
      if(this.state.username==""){
        alert('Enter username')
      }else{
        const db= this.state.db;
        const data = this.getInputs();

        set(ref(db, 'Customer/'+ data.username),{
            Fullname: data.username,
            Latitude: data.latitude,
            Longitude: data.longitude
        }).then(()=>{alert('Success')})
        .catch((err)=>{alert("Error"+err)})
      }
    }

}