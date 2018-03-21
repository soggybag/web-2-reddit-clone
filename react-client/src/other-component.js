import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import data from './data'

export default class OtherComponent extends Component {
  constructor(props) {
    super(props)

    this.state = {
      post: null
    }

  }

  render() {
    const { params } = this.props.match
    console.log(this.state)

    return (
      <div>
        <h1>Post ID</h1>
        <p>{data[params.id]}</p>
        <Link to="/">Back</Link>
        {this.getPost()}
      </div>
    )
  }
}
