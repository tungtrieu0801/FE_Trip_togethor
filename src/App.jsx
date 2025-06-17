import './App.css'
import LoginPage from './features/auth/pages/LoginPage'
import { Route, Routes } from 'react-router-dom'
import MainChatPage from './features/chat/pages/MainChatPage'

function App() {

  return (
    <Routes>
      <Route path='/' element={<LoginPage />} />
      <Route path='/home' element={<MainChatPage/> } />
    </Routes>
  )
}

export default App
