import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom'
import './App.css';

import Header from './header'

import Posts from './posts'
import PostId from './post-id'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      posts: [],
      selected: "I am null"
    }

    fetch('/api/posts')
    .then(res => res.json())
    .then(posts => this.setState({ posts }))
    .catch(err => console.log(err.message))
  }

  render() {
    const posts = this.state.posts.map((post, i) => {
      return (
        <div key={post._id}>
          <h1>

          <Link
            to={{
              pathname:`/post/${post._id}`,
              search: 'Search...',
              hash: '#hashtag',
              state: {
                id: i,
                name: "hello",
                obj: this.state.posts[i]
              }
            }}
            id={i} name="hello" obj={this.state.posts[i]}>
              {post.title}
            </Link></h1>

          <p><button
            onClick={e => this.setState({ selected: i })}>Click {i}</button>
            </p>
        </div>
      )
    })
    return (
      <BrowserRouter>
        <div className="App">
          <h1>Hello Redit Clone React</h1>
          <Header />
          <Route exact path="/" render={() => <Posts posts={posts} />} />
          <Route path="/post/:id" render={props => <PostId {...props} />} />
          <Route path="/post-test/:id" component={PostId} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;

var a = {a:"A", b:"B", c:"C"}
var d = {...a, c: 22}
