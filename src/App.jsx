// App.jsx
import { Routes, Route } from 'react-router-dom';
import Root from './Root';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import VideoPlay from './pages/VideoPlay';
import Shorts from './pages/Shorts';
import Liked from './pages/Liked'; // ইম포트 করুন
import { LikeProvider } from './context/LikeContext'; // ইম포트 করুন

function App() {
  return (
    <LikeProvider> {/* LikeProvider যোগ করুন */}
      <Routes>
        <Route path="/" element={<Root />}>
          <Route index element={<Home />} />
          <Route path="signin" element={<SignIn />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="video/:videoId" element={<VideoPlay />} />
          <Route path="shorts" element={<Shorts />} />
          <Route path="liked" element={<Liked />} /> {/* লাইক পেজ রাউট */}
        </Route>
      </Routes>
    </LikeProvider>
  );
}

export default App;