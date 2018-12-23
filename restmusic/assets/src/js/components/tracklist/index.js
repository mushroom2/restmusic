import React, { Component } from 'react';
import Axios from 'axios';
import TLD from './tld'


class TrackList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tracks: []
        };
  }
    componentDidMount(){
       Axios.get('/api/tracks')
           .then((resp) => {
               console.log(resp.data);
               this.setState({
                   tracks: resp.data
               })
           })
           .catch((err) => (console.log('err when tracklist fetch', err)));
    }
    render(){
        return (
            <div className="container">
                <h1>Some kind of music</h1>
                <TLD tracks={this.state.tracks}/>
            </div>
        )
    }
}

export default TrackList