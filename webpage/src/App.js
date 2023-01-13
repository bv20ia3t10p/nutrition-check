import './app.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import BatchReceiver from './BatchReceiver'
import Customer from './Customer'
import Inspector from './Inspector'
import Navbar from './Navbar'
import './inspector.css'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main
        className="content"
        //onClick = {Tabs}
      >
        <Routes>
          <Route exact path="Receiver" element={<BatchReceiver />} />
          <Route exact path="Inspector" element={<Inspector />} />
          <Route exact path="/" element={<Customer />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App
