import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Header extends Component {
  render () {
    return (
      <div>
        <h1>Reddit Clone</h1>
        <Link to="/about">About</Link>
        <Link to="/">Posts</Link>
      </div>
    )
  }
}
