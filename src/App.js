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
import { useState } from 'react';
import UserContext from './context/UserContext';

function App() {
  const [userId, setUserId] = useState(null);

  return (
    <div className="App">
      <UserContext.Provider value={{ userId, setUserId }}>
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
              <Route path="/" element={<Home />} />
              <Route path="/:boardId" element={<Home />} />
              <Route path="/BoardApprove" element={<BoardApprove />} />
              <Route path="/BoardShow" element={<BoardShow />} />
              <Route path="/Form/" element={<Form />} />
              <Route path="/PostShow" element={<PostShow />} />
              <Route path="/Profile" element={<Profile />} />
              <Route path="/Search" element={<Search />} />
            </Routes>
          </div>
        </BrowserRouter>
      </UserContext.Provider>
    </div>
  );
}

export default App;
