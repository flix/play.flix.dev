import ace from 'ace-builds/src-noconflict/ace'
import 'ace-builds/src-noconflict/mode-flix'
import 'ace-builds/src-noconflict/theme-xcode'

import LZString from 'lz-string'
import ReconnectingWebSocket from 'reconnecting-websocket'
import prettyMilliseconds from 'pretty-ms'

import samples from './generated/samples.js'
import defaultProgram from './defaultProgram.js'

let src = ''
let aceEditor = undefined
let changeIsProgrammatic = false

function setSrc(newSrc, options = {}) {
  const { updateEditor = true, saveToLocalStorage = true } = options

  src = newSrc
  if (saveToLocalStorage) {
    localStorage.setItem('program', src)
  }
  if (updateEditor) {
    changeIsProgrammatic = true
    aceEditor.setValue(src)
    aceEditor.clearSelection()
    changeIsProgrammatic = false
  }
}

function initEditor() {
  // Determine the initial program to put in the editor.
  let initialProgram = undefined

  // Decode the initial program from the query param (if available).
  const urlParams = new URLSearchParams(window.location.search)
  const qparam = urlParams.get('q')
  if (typeof qparam === 'string' && qparam.length > 0) {
    console.log('Using initial program from query parameter.')
    initialProgram = LZString.decompressFromEncodedURIComponent(qparam)
  }

  // Otherwise, retrieve the initial program from local storage (if available).
  if (initialProgram === undefined) {
    let storedProgram = localStorage.getItem('program')
    if (typeof storedProgram === 'string') {
      console.log('Using initial program from local storage.')
      initialProgram = storedProgram
    }
  }

  // Otherwise use the default program.
  if (initialProgram === undefined) {
    console.log('Using default initial program.')
    initialProgram = defaultProgram
  }

  aceEditor = ace.edit('editor')
  aceEditor.setOptions({
    mode: 'ace/mode/flix',
    theme: 'ace/theme/xcode',
    fontSize: 14,
    showGutter: true,
    showPrintMargin: true,
    highlightActiveLine: true,
    highlightSelectedWord: true,
  })
  setSrc(initialProgram)

  aceEditor.on('change', () => {
    if (!changeIsProgrammatic) {
      setSrc(aceEditor.getValue(), { updateEditor: false })
    }
  })
}

function initExamplesDropdown() {
  const dropdown = document.getElementById('examples-dropdown')

  for (let i = 0; i < samples.length; i++) {
    const sample = samples[i]
    const option = document.createElement('option')
    option.value = i
    option.innerText = sample.name
    dropdown.appendChild(option)
  }

  dropdown.addEventListener('change', event => {
    const newChoice = Number(event.target.value)
    // Don't save until changes are made
    setSrc(samples[newChoice].code, { saveToLocalStorage: false })
  })
}

function initCompiler() {
  const socketAddress = 'wss://tivoli.flix.dev/ws'

  const ws = new ReconnectingWebSocket(socketAddress, [], {
    connectionTimeout: 2500,
  })

  const runButton = document.getElementById('run-button')
  runButton.addEventListener('click', () => {
    const responsePromise = new Promise(resolve => {
      ws.onmessage = event => {
        const res = JSON.parse(event.data)
        console.log(res)
        resolve(res)
      }
    })

    ws.send(
      JSON.stringify({
        src: src,
      }),
    )

    setOutput(responsePromise)
  })
}

let responsePromise = Promise.resolve('')
async function setOutput(newResponsePromise) {
  responsePromise = newResponsePromise

  const outputElement = document.getElementById('output')
  const outputContentElement = document.getElementById('output-content')
  const outputInfoElement = document.getElementById('output-info')

  outputElement.classList.remove('error')
  outputContentElement.innerHTML = 'Loading...'

  const { status, result, version, compilationTime, evaluationTime } = await newResponsePromise

  // Ensure that the result isn't outdated.
  if (responsePromise === newResponsePromise) {
    if (status === 'failure') {
      outputElement.classList.add('error')
    }
    outputContentElement.innerText = result

    const compTimeString = prettyMilliseconds(compilationTime / (1000 * 1000))
    const evalTimeString = prettyMilliseconds(evaluationTime / (1000 * 1000))
    outputInfoElement.innerText = `(${version}, compile: ${compTimeString}, evaluate: ${evalTimeString})`
  }
}

let link = ''
function initSharing() {
  const shareDialog = document.getElementById('share-dialog')
  const shareDialogLink = document.getElementById('share-dialog-link')

  const shareButton = document.getElementById('share-button')
  shareButton.addEventListener('click', () => {
    link = `${window.location.origin}${window.location.pathname}?q=${LZString.compressToEncodedURIComponent(src)}`
    shareDialogLink.value = link
    shareDialog.showModal()
  })

  const closeButton = document.getElementById('share-dialog-close')
  closeButton.addEventListener('click', () => {
    shareDialog.close()
  })

  const copyButton = document.getElementById('share-dialog-copy')
  copyButton.addEventListener('click', () => {
    try {
      navigator.clipboard.writeText(link)
      copyButton.innerText = 'Copied!'
    } catch {
      copyButton.innerText = 'Failed to copy'
    }
    setTimeout(() => {
      copyButton.innerText = 'Copy'
    }, 2000)
  })
}

initEditor()
initExamplesDropdown()
initCompiler()
initSharing()
