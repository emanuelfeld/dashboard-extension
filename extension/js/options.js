(function () {
  'use strict'

  function saveOptions () {
    let bookmarks = []
    let bookmarkNames = document.getElementsByClassName('bookmark-name')
    let bookmarkURLs = document.getElementsByClassName('bookmark-url')

    for (let i = 1; i < bookmarkNames.length; i++) {
      let name = bookmarkNames[i].value
      let url = bookmarkURLs[i].value
      if (url.search(/http[s]?:\/\//) < 0) {
        url = 'http://' + url
      }
      if (name.length && url.length) {
        bookmarks.push({
          name: name,
          url: url
        })
      }
    }

    chrome.storage.sync.set({
      'bookmarks': bookmarks
    }, function () {
      var status = document.getElementById('status')
      status.textContent = 'options saved!'
      setTimeout(function () {
        status.textContent = ''
      }, 750)
    })
  }

  function restoreOptions () {
    chrome.storage.sync.get({
      'bookmarks': [{ name: '', url: '' }]
    }, function (options) {
      let bookmarks = options.bookmarks
      let bookmarksContainer = document.getElementById('bookmark-container-main')

      for (let i = 0; i < bookmarks.length; i++) {
        let bookmarkName = bookmarks[i].name
        let bookmarkURL = bookmarks[i].url
        bookmarksCount++
        newBookmark(bookmarksContainer, bookmarkName, bookmarkURL, bookmarksCount)
      }
    })
  }

  function newBookmark (container, name, url, index) {
    let bookmark = document.createElement('div')
    bookmark.className = 'bookmark-container'
    bookmark.id = `bookmark-${index}`
    container.appendChild(bookmark)

    let bookmarkNameInput = document.createElement('input')
    bookmarkNameInput.className = 'bookmark-name'
    bookmarkNameInput.type = 'text'
    bookmarkNameInput.value = name
    bookmark.appendChild(bookmarkNameInput)

    let bookmarkURLInput = document.createElement('input')
    bookmarkURLInput.type = 'text'
    bookmarkURLInput.className = 'bookmark-url'
    bookmarkURLInput.value = url
    bookmark.appendChild(bookmarkURLInput)

    let removeBookmark = document.createElement('label')
    removeBookmark.className = 'remove-bookmark'
    removeBookmark.setAttribute('id', `remove-bookmark-${index}`)
    removeBookmark.textContent = 'X'
    bookmark.appendChild(removeBookmark)

    removeBookmark.addEventListener('click', function () {
      bookmark.parentNode.removeChild(bookmark)
    })
  }

  var bookmarksCount = 0

  document.addEventListener('DOMContentLoaded', restoreOptions)
  document.getElementById('save').addEventListener('click', saveOptions)
  document.getElementById('new-bookmark').addEventListener('click', function () {
    let bookmarksContainer = document.getElementById('bookmark-container-main')
    let bookmarkName = ''
    let bookmarkURL = ''
    bookmarksCount++
    newBookmark(bookmarksContainer, bookmarkName, bookmarkURL, bookmarksCount)
  })
})()
