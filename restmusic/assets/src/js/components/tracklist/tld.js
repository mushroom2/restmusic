import React, { Component } from 'react'
import ReactAudioPlayer from 'react-audio-player';
import Axios from 'axios';

class TLD extends Component {
    constructor(props){
        super(props);
        this.state = {
            track: ''
        };
        this.inputChange = this.inputChange.bind(this);
        this.inputSubmit = this.inputSubmit.bind(this);
    }
    inputChange(e){
        this.setState({track: e.target.value})
    }

    inputSubmit(e){
        Axios.post('/api/tracks', {'url': this.state.track}, {headers: {'Content-Type': 'application/json'}})
            .then((resp) => {console.log(resp)})
            .catch((err) => console.log('err when track add', err));
        e.preventDefault();
    }

    render(){
        return (

            <div className="col-md-12">
                {this.props.tracks.forEach((elem) => console.log('#',elem))}
                <div className="col-md-6">
                    <ul>
                        {this.props.tracks.map((elem, k) => {return (
                            <li key={k}>
                                <p>
                                    {elem.track_name}
                                </p>
                                <ReactAudioPlayer src={elem.path} controls/>
                            </li>
                        )})}

                    </ul>
                </div>
                <div className="col-md-6">
                    <span>Now we have {this.props.tracks.length} tracks</span>
                    <form className="row form-inline">
                        <label className="col-sm-3">Add Track</label>
                        <input type="text" id="addTrack" className="col-sm-6 form-control" onChange={this.inputChange} value={this.state.track}/>
                        <button className="col-sm-offset-1 col-sm-2 btn btn-primary" id="addTrackBtn" onClick={this.inputSubmit}>Yeah!</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default TLD