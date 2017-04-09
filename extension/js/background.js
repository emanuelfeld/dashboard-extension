(function () {
  'use strict'

  function handleOptionsClick () {
    try {
      chrome.runtime.openOptionsPage()
    } catch (e) {
      window.open(chrome.runtime.getURL('options.html'))
    }
  }

  chrome.runtime.onMessage.addListener(handleOptionsClick)
})()
