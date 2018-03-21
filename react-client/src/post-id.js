import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class PostId extends Component {
  constructor(props) {
    super(props)

    this.state = {
      post: null
    }

    // console.log(this.props.match.params.id)
    //
    // fetch(`/api/posts/${this.props.match.params.id}`)
    // .then(res => res.json())
    // .then(post => this.setState({ post }))
    // .catch(err => console.log(err.message))
  }

  getPost() {
    if (this.state.post !== null) {
      return <div>{this.state.post.title}</div>
    }
    return <div>Loading...</div>
  }

  render() {
    // const { params } = this.props.match
    console.log(this.props)

    return (
      <div>
        <h1>Post ID</h1>
        <p>{`params.id`}</p>
        <Link to="/">Back</Link>
        {/* this.getPost() */}
      </div>
    )
  }
}
