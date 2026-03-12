import { useState, useEffect, useRef, useCallback } from 'react'
import './App.css'

import ReconnectingWebSocket from 'reconnecting-websocket'

import LZString from 'lz-string'

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

function getInitialProgram() {
  // Decode the initial program from the query param (if available).
  let urlParams = new URLSearchParams(window.location.search)
  let qparam = urlParams.get('q')
  if (typeof qparam === 'string' && qparam.length > 0) {
    console.log('Using initial program from query parameter.')
    return LZString.decompressFromEncodedURIComponent(qparam)
  }

  // Otherwise, retrieve the initial program from local storage (if available).
  let storedProgram = localStorage.getItem('program')
  if (typeof storedProgram === 'string') {
    console.log('Using initial program from local storage.')
    return storedProgram
  }

  // Otherwise use the default program.
  console.log('Using default initial program.')
  return defaultProgram
}

export default function App() {
  const initialProgram = useRef(getInitialProgram()).current

  const [connected, setConnected] = useState(undefined)
  const [program, setProgram] = useState(initialProgram)
  const [result, setResult] = useState('')
  const [version, setVersion] = useState(undefined)
  const [compilationTime, setCompilationTime] = useState(undefined)
  const [evaluationTime, setEvaluationTime] = useState(undefined)
  const [url, setUrl] = useState('?q=' + LZString.compressToEncodedURIComponent(initialProgram))

  const websocket = useRef(null)
  const programRef = useRef(program)
  const connectedRef = useRef(connected)

  // Keep refs in sync with state
  programRef.current = program
  connectedRef.current = connected

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
    let qparam = LZString.compressToEncodedURIComponent(src)
    setProgram(src)
    setUrl('?q=' + qparam)
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

  return (
    <div>
      <Menu connected={connected} notifyRun={notifyRun} notifySampleChange={notifyOnChange} url={url} />
      <div className="page">
        <LeftPane initial={program} notifyOnChange={notifyOnChange} />
        <RightPane
          result={result}
          version={version}
          compilationTime={compilationTime}
          evaluationTime={evaluationTime}
        />
      </div>
    </div>
  )
}
