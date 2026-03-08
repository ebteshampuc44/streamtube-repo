import { Routes, Route } from 'react-router-dom';
import Root from './Root';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp'; // ইম포트 করুন

function App() {
  return (
    <Routes>
      <Route path="/" element={<Root />}>
        <Route index element={<Home />} />
        <Route path="signin" element={<SignIn />} />
        <Route path="signup" element={<SignUp />} /> {/* নতুন রাউট */}
      </Route>
    </Routes>
  );
}

export default App;