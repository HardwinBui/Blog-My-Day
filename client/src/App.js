import React from "react";
 
// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";
 
// We import all the components we need in our app
import Navbar from "./components/navbar";

// Auth0 imports
import LoginButton from './components/Auth0/loginButton';
import LogoutButton from './components/Auth0/logoutButton';
import UserProfile from './components/Auth0/userProfile';

// Main components
import BlogCreate from "./components/Blog/blogCreate";
import FeatureBlog from "./components/Blog/featureBlog";
import ViewBlog from "./components/Blog/viewBlog";
import UserBlog from "./components/Blog/userBlog";

import CreatePost from "./components/Post/createPost";

import CreateComment from "./components/Comment/createComment";
 
const App = () => {
 return (
   <div>
     <Navbar/>
     <Routes>
       <Route exact path="/" element={<FeatureBlog />} />
       <Route path='*' element={<FeatureBlog />}/>

       <Route path="/createBlog" element={<BlogCreate />} />
       <Route path="/viewBlog/:id" element={<ViewBlog />} />
       <Route path="/userBlog" element={<UserBlog />} />

       <Route path="/createPost/:id" element={<CreatePost />} />

       <Route path="/createComment/:id" element={<CreateComment />}/>
     </Routes>
   </div>
 );
};
 
export default App;