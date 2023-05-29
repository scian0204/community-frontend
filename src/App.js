import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Logo from './components/Logo';
import SearchBar from './components/SearchBar';
import Home from './routes/Home';
import BoardApprove from './routes/BoardApprove';
import BoardShow from './routes/BoardShow';
import Form from './routes/Form';
import PostShow from './routes/PostShow';
import Profile from './routes/Profile';
import Search from './routes/Search';
import { useEffect, useState } from 'react';
import UserContext from './context/UserContext';
import Request from './Request';

function App() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    Request.get('http://localhost:8080/api/user/isLogin').then((res) => {
      setUserData(res.data.data);
    });
  }, []);

  return (
    <div className="App">
      <UserContext.Provider value={{ userData, setUserData }}>
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
              <Route refresh path="/Form/:form" element={<Form />} />
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
