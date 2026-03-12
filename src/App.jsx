import { useState, useEffect, useRef, useCallback } from 'react'
import './App.css'

import ReconnectingWebSocket from 'reconnecting-websocket'

import { decompressFromURL } from './compression'

import Menu from './Menu'
import LeftPane from './LeftPane'
import RightPane from './RightPane'

const SocketAddress = 'wss://tivoli.flix.dev/ws'

const defaultProgram = `/// An algebraic data type for shapes.
enum Shape {
    case Circle(Int32),          // circle radius
    case Square(Int32),          // side length
    case Rectangle(Int32, Int32) // height and width
}

/// Computes the area of the given shape using
/// pattern matching and basic arithmetic.
def area(s: Shape): Int32 = match s {
    case Shape.Circle(r)       => 3 * (r * r)
    case Shape.Square(w)       => w * w
    case Shape.Rectangle(h, w) => h * w
}

// Computes the area of a 2 by 4.
def main(): Unit \\\\ IO =
    println(area(Shape.Rectangle(2, 4)))
`

function getInitialTheme() {
  const stored = localStorage.getItem('theme')
  if (stored) return stored === 'dark'
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

export default function App() {
  const [connected, setConnected] = useState(undefined)
  const [program, setProgram] = useState(null)
  const [result, setResult] = useState('')
  const [version, setVersion] = useState(undefined)
  const [compilationTime, setCompilationTime] = useState(undefined)
  const [evaluationTime, setEvaluationTime] = useState(undefined)
  const [isDark, setIsDark] = useState(getInitialTheme)

  const websocket = useRef(null)
  const programRef = useRef(program)
  const connectedRef = useRef(connected)

  // Keep refs in sync with state
  programRef.current = program
  connectedRef.current = connected

  useEffect(() => {
    const theme = isDark ? 'dark' : 'light'
    document.documentElement.setAttribute('data-theme', theme)
    document.documentElement.setAttribute('data-bs-theme', theme)
    localStorage.setItem('theme', theme)
  }, [isDark])

  const toggleDarkMode = useCallback(() => {
    setIsDark(prev => !prev)
  }, [])

  // Load initial program (async for URL decompression)
  useEffect(() => {
    async function loadInitialProgram() {
      const urlParams = new URLSearchParams(window.location.search)
      const qparam = urlParams.get('q')
      if (typeof qparam === 'string' && qparam.length > 0) {
        console.log('Using initial program from query parameter.')
        const decoded = await decompressFromURL(qparam)
        setProgram(decoded)
        return
      }

      const storedProgram = localStorage.getItem('program')
      if (typeof storedProgram === 'string') {
        console.log('Using initial program from local storage.')
        setProgram(storedProgram)
        return
      }

      console.log('Using default initial program.')
      setProgram(defaultProgram)
    }
    loadInitialProgram()
  }, [])

  useEffect(() => {
    let options = {
      connectionTimeout: 2500,
    }

    console.log('Connecting to: ' + SocketAddress)

    const ws = new ReconnectingWebSocket(SocketAddress, [], options)
    websocket.current = ws

    ws.addEventListener('open', () => {
      console.log('Connected to: ' + SocketAddress)
      setConnected(true)
    })
    ws.addEventListener('close', event => {
      console.log('Disconnected from: ' + SocketAddress)
      console.log(event)
      setConnected(false)
    })
    ws.addEventListener('error', event => {
      console.log('Disconnected from: ' + SocketAddress)
      console.log(event)
      setConnected(false)
    })

    return () => {
      ws.close()
    }
  }, [])

  const notifyOnChange = useCallback(src => {
    localStorage.setItem('program', src)
    setProgram(src)
    if (window.location.search) {
      window.history.replaceState(undefined, undefined, window.location.pathname)
    }
  }, [])

  const notifyRun = useCallback(() => {
    if (!connectedRef.current) {
      console.log('Not connected yet')
      return
    }

    let t = new Date()
    setResult(undefined)
    setVersion(undefined)
    setCompilationTime(undefined)
    setEvaluationTime(undefined)

    websocket.current.onmessage = event => {
      console.log('Received reply from: ' + SocketAddress)
      const data = JSON.parse(event.data)

      console.log(data)
      let e = new Date() - t
      console.log('Elapsed: ' + e + 'ms.')
      setResult(data.result)
      setVersion(data.version)
      setCompilationTime(data.compilationTime)
      setEvaluationTime(data.evaluationTime)
    }

    let data = {
      src: programRef.current,
    }

    websocket.current.send(JSON.stringify(data))
  }, [])

  if (program === null) return null

  return (
    <div>
      <Menu
        connected={connected}
        notifyRun={notifyRun}
        notifySampleChange={notifyOnChange}
        program={program}
        isDark={isDark}
        toggleDarkMode={toggleDarkMode}
      />
      <div className="page">
        <LeftPane initial={program} notifyOnChange={notifyOnChange} isDark={isDark} />
        <RightPane
          result={result}
          version={version}
          compilationTime={compilationTime}
          evaluationTime={evaluationTime}
          isDark={isDark}
        />
      </div>
    </div>
  )
}
