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

    post.createdAtDate = new Date(post.createdAt).toLocaleDateString("en-US")
    post.updatedAtDate = new Date(post.updatedAt).toLocaleDateString("en-US")

    str += post_template(post)
  }

  $('#show-posts').html(str)
}

$('body').on('click', '.post-title', function(e) {
  e.preventDefault()
  // TODO: Show detail view for this post
})

$('body').on('click', '.nav-link', function(e) {
  e.preventDefault()
  const divId = $(this).attr('href')
  console.log(divId)
  $('.content').hide()
  $(divId).show()
})
