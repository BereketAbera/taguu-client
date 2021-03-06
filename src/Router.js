import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Account from "./pages/account/Account";
import Home from "./pages/home/Home";
import Landing from "./pages/landing/Landing";
import Profile from "./pages/profile/Profile";
import SavedPlayList from "./pages/savedPlaylist/SavedPlayList";
import Settings from "./pages/settings/Settings";
import StreamVideo from "./pages/streamVideo/StreamVideo";
import Upload from "./pages/Upload";
import UploadVideo from "./pages/uploadVideo/UploadVideo";
import WatchVideo from "./pages/watchVideo/WatchVideo";
import UploadAnt from "./pages/UploadAnt";
import Login from "./pages/authentication/Login";
import SignupPrd from "./pages/authentication/SignupPrd";
import YourVideo from "./pages/yourVideos/YourVideo";

const Router = () => {
  return (
    <div>
      {/* <Home /> */}
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={WatchVideo} />
          <Route path="/saved_playlist" component={SavedPlayList} />
          <Route path="/upload_video" component={UploadVideo} />
          <Route path="/stream_video" component={YourVideo} />
          <Route path="/settings" component={Settings} />
          <Route path="/account" component={Login} />
          <Route exact path="/" component={Home} />
          <Route exact path="/landing" component={Landing} />

          <Route exact path="/profile" component={Profile} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signupprd" component={SignupPrd} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default Router;
