import React, { Component } from 'react'

class Bg extends Component {
    componentWillMount(){
    var w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName('body')[0],
    x = w.innerWidth || e.clientWidth || g.clientWidth,
    y = w.innerHeight|| e.clientHeight|| g.clientHeight;

    this.setState({x:x,y:y});
  }
  render(){
    return (<div><img className='bg' src={'/static/img/IMG_20181201_203659.jpg'} width={this.state.x} height={this.state.y} /></div>)
  }
}

export default Bg