import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Logo from './components/Logo';
import SearchBar from './components/SearchBar';
import Home from './routes/Home';
import BoardApprove from './routes/BoardApprove';
import BoardShow from './routes/BoardShow';
import PostShow from './routes/PostShow';
import Profile from './routes/Profile';
import Search from './routes/Search';
import { useEffect, useState } from 'react';
import UserContext from './context/UserContext';
import PostForm from './routes/PostForm';
import UserForm from './routes/UserForm';
import BoardForm from './routes/BoardForm';
import Request from './Request';

function App() {
  const [userData, setUserData] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    Request(
      {
        method: 'get',
        query: 'user/isLogin',
      },
      (res) => {
        setUserData(res.data.data);
      }
    );
    Request(
      {
        method: 'get',
        query: 'user/isAdmin',
      },
      (res) => {
        setIsAdmin(res.data.data);
      }
    );
  }, []);

  return (
    <div className="App">
      <UserContext.Provider
        value={{ userData, setUserData, isAdmin, setIsAdmin }}>
        <BrowserRouter>
          <div className="container-fluid">
            {/* <h3>{this.props.checkIsLogin ? "True" : "false"}</h3> */}
            <br />
            <div className="row">
              <div className="col-sm-4">
                <Logo />
              </div>
              <div className="col-sm-4">
                <SearchBar />
              </div>
              <div className="col-sm-4">
                {/* <div className="float-right">
                  <button onClick={()=>this.setState({refrash: true})} className="btn btn-secondary">새로고침</button>
                </div> */}
              </div>
            </div>
            <Routes>
              <Route refresh path="/" element={<Home />} />
              <Route refresh path="/:boardId" element={<Home />} />
              <Route refresh path="/BoardApprove" element={<BoardApprove />} />
              <Route refresh path="/BoardShow" element={<BoardShow />} />
              <Route refresh path="/PostForm/:boardId" element={<PostForm />} />
              <Route refresh path="/UserForm/" element={<UserForm />} />
              <Route refresh path="/BoardForm/" element={<BoardForm />} />
              <Route refresh path="/PostShow/:postId" element={<PostShow />} />
              <Route refresh path="/Profile/:userId" element={<Profile />} />
              <Route refresh path="/Search/:query" element={<Search />} />
            </Routes>
          </div>
        </BrowserRouter>
      </UserContext.Provider>
    </div>
  );
}

export default App;
