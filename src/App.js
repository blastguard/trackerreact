import React from 'react';
import StartFirebase from '../src/components/firebaseConfig';
import { ref, set, get, update, remove, child } from 'firebase/database'
import { ref as sRef } from 'firebase/storage';
import "../src/App.css"
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      db: '',
      username: '',
      latitude: '',
      longitude: '',
      readyflag: null
    }
    this.interface = this.interface.bind(this);
    this.readyblast = this.readyblast.bind(this);
  }

  componentDidMount() {
    let x, y;
    let self = this;
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(function (position) {
        x = position.coords.latitude;
        y = position.coords.longitude;

        self.setState({ latitude: x });
        self.setState({ longitude: y });
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
      <div className="App">
        <div className="App-header">
          <input type="text" id="userbox" placeholder='Enter User Name' value={this.state.username} onChange={e => this.setState({ username: e.target.value })}></input>
          <p>{this.state.latitude || 'Loading latitude..'}</p>
          <p>{this.state.longitude || 'Loading longitude..'}</p>

          <button id="addBtn" onClick={this.interface}>Send Data</button>
          <button id="blastBtn" className="round-button" onClick={this.readyblast}>Ready <br></br>For <br></br>Blast</button>

        </div>
      </div>
    )
  }

  interface(event) {
    const id = event.target.id;
    this.addData();
  }

  readyblast(event) {
    const db = this.state.db;
    const data = this.getInputs();
    if (this.state.username == "") {
      alert('Enter username')
    }
    else {
      if (event.target.textContent == "Ready For Blast") {
        if (window.confirm('Are you sure for the blast approval?')) {
          this.setState({ readyflag: true })

          set(ref(db, 'Customer/' + data.username), {
            Fullname: data.username,
            Latitude: data.latitude,
            Longitude: data.longitude,
            ReadyFlag: true
          }).then(() => { alert('Approved for blast') })
            .catch((err) => { alert("Error" + err) })

          document.getElementById('blastBtn').textContent = "END"
          document.getElementById('blastBtn').style.background = "green"

        } else {
          alert('Blast disapproved')
        }
      }
      else {
        this.setState({ readyflag: false })
        set(ref(db, 'Customer/' + data.username), {
          Fullname: data.username,
          Latitude: data.latitude,
          Longitude: data.longitude,
          ReadyFlag: false
        }).then(() => { alert('Process ended') })
          .catch((err) => { alert("Error" + err) })
        document.getElementById('blastBtn').textContent = "Ready For Blast"
        document.getElementById('blastBtn').style.background = "red"
      }
    }


  }

  getInputs() {
    return {
      username: this.state.username,
      latitude: this.state.latitude,
      longitude: this.state.longitude,
      readyflag: this.state.readyflag
    }
  }
  addData() {
    if (this.state.username == "") {
      alert('Enter username')
    } else {
      const db = this.state.db;
      const data = this.getInputs();

      set(ref(db, 'Customer/' + data.username), {
        Fullname: data.username,
        Latitude: data.latitude,
        Longitude: data.longitude,
        ReadyFlag: false
      }).then(() => { alert('Success') })
        .catch((err) => { alert("Error" + err) })
    }
  }

}


//npm start for starting application
//git status
//git add .
//git commit -m "first commit"
//git push