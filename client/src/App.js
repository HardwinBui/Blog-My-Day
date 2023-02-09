import React from "react";

// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";

// We import all the components we need in our app
import Navbar from "./components/NavBar/navbar";

// Auth0 imports
import LoginButton from './components/Auth0/loginButton';
import LogoutButton from './components/Auth0/logoutButton';
import UserProfile from './components/Auth0/userProfile';
import LoginWarning from "./components/Auth0/loginWarning";

// Main components
import CreateBlog from "./components/Blog/createBlog";
import FeatureBlog from "./components/Blog/featureBlog";
import ViewBlog from "./components/Blog/viewBlog";
import UserBlog from "./components/Blog/userBlog";
import EditBlog from "./components/Blog/editBlog";
import FollowedBlog from "./components/Blog/followBlog";

import CreatePost from "./components/Post/createPost";
import EditPost from "./components/Post/editPost";
import ViewPost from "./components/Post/viewPost";
import RecentPost from "./components/Post/recentPosts";

import CreateComment from "./components/Comment/createComment";

import ViewNotification from "./components/Notification/viewNotifications";

import CreateImage from "./components/Image/createImage";

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        {/* <Route exact path="/" element={<CreateImage />} /> */}
        <Route exact path="/" element={<FeatureBlog />} />
        {/* <Route exact path="/" element={<UserBlog />} /> */}
        <Route path="/notification" element={<ViewNotification />} />

        <Route path="/createBlog" element={<CreateBlog />} />
        <Route path="/userBlog/:id" element={<UserBlog />} />
        <Route path="/viewBlog/:id" element={<ViewBlog />} />
        <Route path="/editBlog/:id" element={<EditBlog />} />
        <Route path="/followedBlog" element={<FollowedBlog />} />

        <Route path="/createPost/:id" element={<CreatePost />} />
        <Route path="/editPost/:id" element={<EditPost />} />
        <Route path="/viewPost/:id" element={<ViewPost />} />
        <Route path="/recentPosts" element={<RecentPost />} />

        <Route path="/createComment/:id" element={<CreateComment />} />

        <Route path="/login" element={<LoginWarning />} />
        <Route path='*' element={<FeatureBlog />} />
      </Routes>
    </div>
  );
};

export default App;