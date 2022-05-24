const dummy = (blogs) => {
  if (Array.isArray(blogs)) return 1
}

const totalLikes = (blogs) => {
  if(!blogs.length) return 0
  return blogs.reduce((acc, item) => acc + item.likes, 0)
}

const favoriteBlog = (blogs) => {
  const blog = blogs.reduce((prev, current) => (prev.likes > current.likes) ? prev : current)
  return ({ title: blog.title, author: blog.author, likes: blog.likes })
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}