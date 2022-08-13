describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing')
    const newUser = {
      username: 'Alina',
      name: 'Alina Zarza',
      password: 'contraseña',
    }
    cy.request('POST', 'http://localhost:3003/api/users', newUser)
    cy.visit('http://localhost:3000/')
  })

  it('should find the login form by default', () => {
    cy.get('button').contains('Login')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('input[name="username"]').type('Alina')
      cy.get('input[name="password"]').type('contraseña')
      cy.get('button').click()

      cy.contains('Alina Zarza logged in')
    })

    it('fails with wrong credentials', function () {
      cy.get('input[name="username"]').type('Alina')
      cy.get('input[name="password"]').type('contrasena')
      cy.get('button').click()

      cy.get('.alert')
        .should('contain', 'invalid username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'Alina', password: 'contraseña' })
    })

    it('A blog can be created', function () {
      cy.get('button').contains('Add blog').click()
      cy.get('#title').type('Canonical string reduction')
      cy.get('#author').type('Edsger W. Dijkstra')
      cy.get('#url').type(
        'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html'
      )

      cy.get('button').contains('create').click()
      cy.get('.alert')
        .should(
          'contain',
          'the blog Canonical string reduction by Edsger W. Dijkstra was added'
        )
        .and('have.css', 'color', 'rgb(0, 128, 0)')
    })
  })

  describe('When a note is created', function () {
    beforeEach(function async() {
      cy.login({ username: 'Alina', password: 'contraseña' })
      cy.newBlog({
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      })
    })

    it('The user can like the blog', function () {
      cy.get('.view').click()
      cy.get('.likes').contains('0')
      cy.get('button').contains('like').click()
      cy.get('.likes').contains('1')
    })

    it('The user that created the blog can delete it', function () {
      cy.get('.view').click()
      cy.get('.remove').click()
      cy.get('html').should(
        'not.contain',
        'Canonical string reduction Edsger W. Dijkstra'
      )
    })

    it('The user cannot delete a blog created by another user', function () {
      cy.get('button').contains('log out').click()
      cy.newLogin()
      cy.get('.view').click()
      cy.contains('Alina Zarza')
      cy.get('.remove').should('not.exist')
    })
  })

  describe('When several blogs are created', () => {
    beforeEach(function async() {
      cy.login({ username: 'Alina', password: 'contraseña' })
    })
    it('The blogs are ordered according to the number of likes', () => {
      cy.newBlog({
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
        likes: 5,
      })
      cy.newBlog({
        title: 'First class tests',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
        likes: 10,
      })
      cy.newBlog({
        title: 'Type wars',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
        likes: 2,
      })
      cy.newBlog({
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 7,
      })

      cy.get('.view').eq(0).click()
      cy.get('.likes').should('contain', 'likes 10')
      cy.get('.view').eq(1).click()
      cy.get('.likes').should('contain', 'likes 7')
      cy.get('.view').eq(2).click()
      cy.get('.likes').should('contain', 'likes 5')
      cy.get('.view').eq(3).click()
      cy.get('.likes').should('contain', 'likes 2')
    })

    it('The position of a blog changes when it has more likes', () => {
      cy.newBlog({
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
        likes: 1,
      })
      cy.newBlog({
        title: 'First class tests',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
      })

      cy.get('.title').eq(0).should('contain', 'Canonical string reduction')
      cy.get('.view').eq(1).click()
      cy.get('button').contains('like').click()
      cy.get('button').contains('like').click()
      cy.get('.title')
        .eq(0)
        .should('contain', 'First class tests Robert C. Martin')
    })
  })
})
