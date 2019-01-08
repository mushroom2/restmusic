import React, { Component } from 'react';
import Axios from 'axios';
import TLD from './tld'
import { connect } from 'react-redux'
import { setTracks} from "../../../actions/actions";

class TrackList extends Component {

    componentDidMount(){
       Axios.get('/api/tracks')
           .then((resp) => {
               console.log(resp.data);
               this.props.setTracksAction(resp.data)
           })
           .catch((err) => (console.log('err when tracklist fetch', err)));
    }
    render(){
        return (
            <div className="container">
                <h1>Some kind of music</h1>
                <TLD tracks={this.props.tracks}/>
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


export default connect(mapStateToProps, mapDispatchToProps)(TrackList);
//export default TrackList