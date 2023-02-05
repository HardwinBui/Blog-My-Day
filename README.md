# Blog My Day


<h2>Introduction</h2>
BlogMyDay is a web application built with MERN stack where people can blog about their day, hobbies, or anything that they find interesting. When users enter the website, they are presented with all of the blogs created from existing users. They can then click on a specific blog to see all of the respective posts and comments that were made. If the user wants to make their own blogs or comment on other posts, they must sign up and log in. After logging in, users will also have access to make, view, and delete their blogs and posts.


<h2>Link to Application</h2>
https://blogmyday.onrender.com/


Features
----
__Home Page__ 

![featured](https://user-images.githubusercontent.com/27057402/216795792-60403b65-f515-4c19-b56d-45315acf2d02.PNG)
When users enter the page they will be presented with all of the blogs made by existing users. These blogs are sorted by popularity measured by their followers and psots. From here, users can either look at indiviual blogs or sign up to make some of their own.

![search filter](https://user-images.githubusercontent.com/27057402/216795824-362ea935-08be-47dd-afd7-bc969324b252.PNG)
Additionally, users can filter and search specifics blogs by typing part of their title in the searchbar.

__Login Page__ 

![login](https://user-images.githubusercontent.com/27057402/214251560-203ebc56-21de-42a0-ab88-505842b00187.PNG)

Users will sign up or login with the required information. Auth0 was used for the sign up and login functionalities.

__Nav Bar__ 

![blogs dropdown](https://user-images.githubusercontent.com/27057402/216796095-65c05819-d62b-46c0-8b09-9d9b32758d06.png)

The NavBar has multiple options for the users to pick from. The View Blogs dropdown provides the users with a few different pages where they can see blogs and posts made by the overall userbase. My Blogs will send the user to their personal page. 

![notifications](https://user-images.githubusercontent.com/27057402/216796162-36a3f417-de68-4612-af36-ec1db60ebbf3.png)

The Notifications bell icon will light up in the NavBar if the users has any notifications. The dropdown will display up to 3 of the lastest notifications they had. From here, they can choose to clear their notifications or view them all in the Notifications page shown below:

![notif page](https://user-images.githubusercontent.com/27057402/216796205-fa46af06-5891-4b42-8f2a-dbb9ddf45036.PNG)

__User Page__ 

![user page](https://user-images.githubusercontent.com/27057402/216795859-72b03e2b-f016-46b6-a620-318e1d9b5fb1.PNG)

If the user logs into their account, they can access their blog page. Here, they can create a new blog, delete an existing blog, or view any of their blogs.

__View Blog Page__ 

![view blog](https://user-images.githubusercontent.com/27057402/216795868-54c8d2f5-1569-4bd7-9b9e-5fb164a7392c.PNG)

This page allows you to view all the posts made about the blog you're looking at. You can click on any of the posts if you'd like to interact or comment on them. Logged in users can follow the blog by clicking the star icon next to the blog title. If you are the user who created the blog, you can also create a new post or choose to delete the blog.

__Create Blog Page__ 

![create blog](https://user-images.githubusercontent.com/27057402/214251532-ab538f74-41ef-4fde-a906-bf4919159e4f.PNG)

Users can create a blog on this page by entering the necessary data. Currently, users only have to specify the title of the blog.

__Create Post Page__ 

![create post](https://user-images.githubusercontent.com/27057402/214251507-8218eae2-afa9-4e79-becd-b21f835832d3.PNG)

Users can make a post here by specifying its title and content.

__Create Comment Page__ 

![add comment](https://user-images.githubusercontent.com/27057402/214251448-846fd082-0aaf-459c-86a2-a328113660d9.PNG)

Users to make a comment to a post by entering their message here.
