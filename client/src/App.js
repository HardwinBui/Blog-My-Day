import React from "react";
 
// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";
 
// We import all the components we need in our app
import Navbar from "./components/navbar";
import RecordList from "./components/recordList";
import Edit from "./components/edit";
import Create from "./components/create";

// Auth0 imports
import LoginButton from './components/Auth0/loginButton';
import LogoutButton from './components/Auth0/logoutButton';
import UserProfile from './components/Auth0/userProfile';

// Main components
import BlogCreate from "./components/Blog/blogCreate";
import FeatureBlog from "./components/Blog/featureBlog";
import ViewBlog from "./components/Blog/viewBlog";

import CreatePost from "./components/Post/createPost";
 
const App = () => {
 return (
   <div>
    <LoginButton/>
    <LogoutButton/>
    <p>The user info is below</p>
    <UserProfile/>

     <Navbar/>
     <Routes>
       <Route exact path="/" element={<FeatureBlog />} />
       <Route path="/edit/:id" element={<Edit />} />
       <Route path="/createB" element={<Create />} />

       <Route path="/create" element={<BlogCreate />} />
       <Route path="/viewBlog/:id" element={<ViewBlog />} />

       <Route path="/createPost/:id" element={<CreatePost />} />
     </Routes>
   </div>
 );
};
 
export default App;