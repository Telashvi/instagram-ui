
import './App.scss';
import { useEffect, useState } from 'react';
import Header from './Header/Header';
import Register from './Register/Register';
import { Switch, Route, useHistory } from 'react-router-dom';
import Login from './Login/Login';
// import LoginBasic from './Login/LoginBasic';
import Feed from './Feed/Feed';
import { UserService } from './services/user.service';
import { UserContext } from './user-context';
import PostCreate from './PostCreate/PostCreate';
import PostPage from './PostPage/PostPage';
import Profile from './Profile/Profile';
import Search from './Search/Search';
import ProfileEdit from './Profile/ProfileEdit/ProfileEdit';
import Logout from './Logout/Logout';

function App() {
    const history = useHistory();
    const [user, setUser] = useState({});

    useEffect(() => {
        async function getMe() {
            try {
                const user = await UserService.me();
                if (!user) {
                    history.push('/login');
                    return;
                }
                setUser(user);
            } catch(err) {
                console.log(err);
            }
        }
        getMe();
    }, [history]);

    function isLoggedIn() {
        return Boolean(Object.keys(user).length);
    }
    // מה זה  return Boolean(Object.keys(user).length);

  return ( // למה הסדר של הראוטים משנה
      <UserContext.Provider value={{user, setUser}}>
        <div className="App d-flex flex-column flex-sm-column-reverse vh-100">
            <div className="flex-grow-1 main">
              <div className="container mt-lg-4">
                <Switch>
                    <Route path="/register">
                        <Register />
                    </Route>
                    <Route path="/login">
                        <Login/>
                    </Route>
                    <Route path="/post/create">
                        <PostCreate />
                    </Route>
                    <Route path="/post/:id">
                        <PostPage />
                    </Route>
                    <Route path="/profile/:username/edit">
                        <ProfileEdit />
                    </Route>
                    <Route path="/profile/:username">
                        <Profile />
                    </Route>
                    <Route path="/search">
                        <Search />
                    </Route>
                    <Route path="/logout">
                        <Logout />
                    </Route>
                    <Route path="/" exact>
                        <Feed />
                    </Route>
                </Switch>
              </div>
            </div>
            { isLoggedIn() && <Header /> }
        </div>
      </UserContext.Provider>
  );
}

export default App;
