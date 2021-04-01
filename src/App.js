
import './App.scss';
import { useEffect, useState,useContext} from 'react';
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
import Explore from './Explore/Explore';
import PostEdit from './PostEdit/PostEdit';
function App() {
    const history = useHistory();
    const [user, setUser] = useState({});
    const { userObject } = useContext(UserContext);
    useEffect(() => {
        async function getMe() {
            console.log("this is working first","user is:",userObject)
            try {
                const user = await UserService.me();
                if (!user) {
                    history.push('/login');
                    return;
                }
                setUser(user.username);
            } catch(err) {
                console.log(err);
            }
        }
        
        isLoggedIn()
        getMe();
    }, [history,user]);
    // const [test,setTest] = useState(false)
    // useEffect(() => {
    //     console.log(test)
    //     isLoggedIn()
    // },[test])
    function isLoggedIn() {
        console.log("its working",user)
        return Boolean(Object.keys(user).length);
    }
    
    // מה זה  return Boolean(Object.keys(user).length);

  return ( // למה הסדר של הראוטים משנה
      <UserContext.Provider value={{userObject, setUser}}>
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
                        <Logout  check={isLoggedIn} setUser={setUser}/>
                    </Route>
                    <Route path="/explore" >
                        <Explore/>
                    </Route>
                    <Route path="/postedit/:postId" >
                        <PostEdit/>
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
