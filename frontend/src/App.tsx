import './App.css'
import Header from './components/Header'
import { Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home'
import Chat from './pages/Chat'
import Login from './pages/Login'
import Signup from './pages/Signup'
import { userAuth } from './context/AuthContext'

function App() {
  console.log(userAuth())

  return (
    <main>
      <Header>
       
      </Header>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/chat' element={<Chat/>}/>
        <Route path='/signup' element={<Signup/>}/>
      </Routes>

    </main>
  )
}

export default App
