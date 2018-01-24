fetch('/api/posts').then((res) => {
  return res.json()
}).then((json) => {
  // console.log(json)
  makePosts(json)
}).catch((err) => {
  console.log(err.message)
})

function makePosts(posts) {
  let str = ""
  for (let i in posts) {
    const post = posts[i]
    
    post.createdAtDate = new Date(post.createdAt)
    post.updatedAtDate = new Date(post.updatedAt)

    str += post_template(post)
  }

  $('#show-posts').html(str)
}
