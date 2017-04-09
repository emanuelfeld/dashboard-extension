(function () {
  'use strict'

  let button = document.getElementById('save')

  button.addEventListener('click', saveTextAsFile)

  function saveTextAsFile () {
    let textToSave = document.getElementById('note-area').value
    let textToSaveAsBlob = new Blob([textToSave], {type: 'text/plain'})
    let textToSaveAsURL = window.URL.createObjectURL(textToSaveAsBlob)
    let titleToSave = document.getElementById('note-name').value
    let date = (new Date()).toISOString().split('T')[0]
    let fileNameToSaveAs
    if (titleToSave) {
      fileNameToSaveAs = titleToSave + ' ' + date + '.md'
    } else {
      fileNameToSaveAs = 'note ' + date + '.md'
    }

    let downloadLink = document.createElement('a')
    downloadLink.download = fileNameToSaveAs
    downloadLink.innerHTML = 'Download File'
    downloadLink.href = textToSaveAsURL
    downloadLink.style.display = 'none'
    document.body.appendChild(downloadLink)

    downloadLink.click()
  }

  chrome.storage.sync.get(['bookmarks'], function (settings) {
    let bookmarksDiv = document.getElementById('bookmarks-container')
    let bookmarks = settings.bookmarks

    if (bookmarks) {
      for (let i = 0; i < bookmarks.length; i++) {
        if (bookmarks[i].name && bookmarks[i].url) {
          let bookmarkLink = document.createElement('a')
          bookmarkLink.href = bookmarks[i].url
          bookmarksDiv.appendChild(bookmarkLink)

          let bookmarkDiv = document.createElement('div')
          bookmarkDiv.className = 'bookmark'
          bookmarkDiv.textContent = bookmarks[i].name
          bookmarkLink.appendChild(bookmarkDiv)
        }
      }      
    }

    let options = document.createElement('p')
    bookmarksDiv.appendChild(options)

    let optionsLink = document.createElement('a')
    optionsLink.textContent = 'Settings'
    optionsLink.setAttribute('id', 'options-link')
    options.appendChild(optionsLink)

    optionsLink.addEventListener('click', function () {
      chrome.runtime.sendMessage({'options': true})
    })
  })
})()
