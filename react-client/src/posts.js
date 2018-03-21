import React, { Component } from 'react'

export default class Posts extends Component {
  render() {
    return (
      <div>
        <h1>Posts</h1>
        {this.props.posts}
      </div>
    )
  }
}
