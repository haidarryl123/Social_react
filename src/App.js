
import './Style/App.scss';
import './Style/plugins/fontawesome-free/css/all.min.css';
import './Style/plugins/overlayScrollbars/css/OverlayScrollbars.min.css';
import './Style/dist/css/adminlte.min.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import {Main} from "./Layout/Main";
import {Home} from "./Layout/Home";
import {SinglePost} from "./Layout/Components/SinglePost";
import {Profile} from "./Layout/Profile";
import CreatePost from "./Layout/CreatePost";
import UpdateInfo from "./Layout/UpdateInfo";
import {Login} from "./Layout/Auth/Login";
import {Register} from "./Layout/Auth/Register";
import {NotFound} from "./Layout/NotFound";

function App() {
  return (
      <>
          <BrowserRouter>
              <Routes>
                  <Route path="/" element={<Main />}>
                      <Route index element={<Home />} />
                      <Route path="post/:id" element={<SinglePost />} />
                      <Route path="login" element={<Login />} />
                      <Route path="register" element={<Register />} />
                      <Route path="profile/:id" element={<Profile />} />
                      <Route path="wall" element={<Profile />} />
                      <Route path="create-post" element={<CreatePost />} />
                      <Route path="update-info" element={<UpdateInfo />} />
                      <Route path="*" element={<NotFound />} />
                  </Route>
              </Routes>
          </BrowserRouter>
      </>
  );
}

export default App;
