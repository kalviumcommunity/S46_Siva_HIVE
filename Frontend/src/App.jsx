import {Routes, Route, Navigate} from 'react-router-dom'
import { useAuthContext } from './Context/useAuthContext'

import Home from './Slides/Home'
import Login from './Slides/Login'
import Signup from './Slides/Signup'

function App() {
  const {user} = useAuthContext()

  return (
    <div>
      <Routes>
        <Route 
          path="/"
          element={user ? <Home/>: <Navigate to="/login" />}/>
        <Route
          path="/login"
          element={!user ? <Login/> : <Navigate to="/" />}
        />
        <Route
          path="/signup"
          element={!user ? <Signup/> : <Navigate to="/" />}
        />
      </Routes>
    
    </div>
        
  );
}

export default App;

