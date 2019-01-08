import React, { Component } from 'react'
import ReactAudioPlayer from 'react-audio-player';
import Axios from 'axios';
import {connect} from "react-redux";
import {setTracks} from "../../../actions/actions";

class TLD extends Component {
    constructor(props){
        super(props);
        this.state = {
            track: ''
        };
        this.inputChange = this.inputChange.bind(this);
        this.inputSubmit = this.inputSubmit.bind(this);
        this.tracksChange = this.tracksChange.bind(this)
    }
    inputChange(e){
        console.log(this.state);
        this.setState({track: e.target.value})
    }

    tracksChange(track){
        let trgt = this.props.tracks.slice();
        trgt.push(track);
        this.props.setTracksAction(trgt)
    }

    inputSubmit(e){
        Axios.post('/api/tracks', {'url': this.state.track}, {headers: {'Content-Type': 'application/json'}})
            .then((resp) => {
                console.log(resp);
                this.tracksChange(resp.data)
            })
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

const mapStateToProps = store => {
  console.log(store);
  return {
    tracks: store.tracks,
  }
};


const mapDispatchToProps = dispatch => {
  return {
    setTracksAction: tracks => dispatch(setTracks(tracks))
  }
};




export default connect(mapStateToProps, mapDispatchToProps)(TLD);