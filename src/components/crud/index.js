import React from 'react';
import StartFirebase from '../firebaseConfig';
import { ref, set, get, update, remove, child } from 'firebase/database'

export class Crud extends React.Component {
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
        this.setState({
            db: StartFirebase()
        });
    }

    render() {
        return (
            <>
                <label>Enter Username</label>
                <input type="text" id="userbox" value={this.state.username} onChange={e => this.setState({ username: e.target.value })}></input>

                <label>Enter Latitude</label>
                <input type="text" id="latitudebox" value={this.state.latitude} onChange={e => this.setState({ latitude: e.target.value })}></input>

                <label>Enter Longitude</label>
                <input type="text" id="longitudebox" value={this.state.longitude} onChange={e => this.setState({ longitude: e.target.value })}></input>
                <button id="addBtn" onClick={this.interface}>Send Data</button>
            </>
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