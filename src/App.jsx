import { Routes, Route } from 'react-router-dom';
import Root from './Root';
import Home from './pages/Home';
import SignIn from './pages/SignIn';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Root />}>
        <Route index element={<Home />} />
        <Route path="signin" element={<SignIn />} />
      </Route>
    </Routes>
  );
}

export default App;