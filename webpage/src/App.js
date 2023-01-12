import { BrowserRouter, Route, Routes } from 'react-router-dom'
import BatchReceiver from './BatchReceiver'
import Customer from './Customer'
import Inspector from './Inspector'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="Receiver" element={<BatchReceiver />} />
        <Route exact path="Inspector" element={<Inspector />} />
        <Route exact path="/" element={<Customer />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
