const HtmlWebpackPlugin = require('html-webpack-plugin')

function createPages(template, filename, chunks) {
  return new HtmlWebpackPlugin({
    template: template,
    filename: filename,
    chunks: chunks
  })
}

const htmlPages = [
  createPages('./src/index.html', './index.html', ['index']),
  createPages('./src/pages/articles.html', './pages/articles.html', ['index']),
  createPages('./src/pages/tests.html', './pages/tests.html', ['index']),
  createPages('./src/pages/routes.html', './pages/routes.html', ['index']),
  createPages('./src/pages/catalog.html', './pages/catalog.html', [
    'index'
  ]),
    createPages('./src/pages/catalogtests.html', './pages/catalogtests.html', [
    'index'
  ]),
  createPages(
    './src/pages/articles/animals.html',
    './pages/articles/animals.html',
    ['index']
  ),
  createPages(
    './src/pages/articles/dagestan.html',
    './pages/articles/dagestan.html',
    ['index']
  ),
  createPages(
    './src/pages/routes/dagestan.html',
    './pages/routes/dagestan.html',
    ['index']
  ),
  createPages(
    './src/pages/routes/arkhyz.html',
    './pages/routes/arkhyz.html',
    ['index']
  ),
  createPages('./src/pages/tests/test1.html', './pages/tests/test1.html', [
    'index'
  ])
]

module.exports = htmlPages
