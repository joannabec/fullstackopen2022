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

const filterMaxAuthor = (obj, prop) => {
  let result = {}
  Object.keys(obj).forEach((key, i) => {
    if(i === 0) {
      result.author = key
      result[prop] = obj[key]
    } else if (result[prop] < obj[key]) {
      result.author = key
      result[prop] = obj[key]
    }
  })

  return result
}
const mostBlogs = (blogs) => {
  let sumBlogs = {}
  blogs.forEach(item => {
    if(sumBlogs[item.author]) sumBlogs[item.author] += 1
    else sumBlogs[item.author] = 1
  })

  return filterMaxAuthor(sumBlogs, 'blogs')
}

const mostlikes = (blogs) => {
  let sumLikes = {}
  blogs.forEach(item => {
    if(sumLikes[item.author]) sumLikes[item.author] += item.likes
    else sumLikes[item.author] = item.likes
  })

  return filterMaxAuthor(sumLikes, 'likes')
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostlikes
}