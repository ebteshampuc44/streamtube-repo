// App.jsx (আপডেটেড)
import { Routes, Route } from 'react-router-dom';
import Root from './Root';
import Home from './pages/Home';
import Explore from './pages/Explore';
import Videos from './pages/Videos';
import Trending from './pages/Trending';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import VideoPlay from './pages/VideoPlay';
import Shorts from './pages/Shorts';
import Liked from './pages/Liked';
import Profile from './pages/Profile';
import Travel from './pages/Travel';
import Blog from './pages/Blog';
import { LikeProvider } from './context/LikeContext';

function App() {
  return (
    <LikeProvider>
      <Routes>
        <Route path="/" element={<Root />}>
          <Route index element={<Home />} />
          <Route path="explore" element={<Explore />} />
          <Route path="videos" element={<Videos />} />
          <Route path="trending" element={<Trending />} />
          <Route path="signin" element={<SignIn />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="video/:videoId" element={<VideoPlay />} />
          <Route path="shorts" element={<Shorts />} />
          <Route path="liked" element={<Liked />} />
          <Route path="profile" element={<Profile />} />
          <Route path="travel" element={<Travel />} />
          <Route path="blog" element={<Blog />} />
        </Route>
      </Routes>
    </LikeProvider>
  );
}

export default App;