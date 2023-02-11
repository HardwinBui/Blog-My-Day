# Blog My Day


<h2>Introduction</h2>
BlogMyDay is a web application built with MERN stack where people can blog about their day, hobbies, or anything that they find interesting. When users enter the website, they are presented with all of the blogs created from existing users. They can then click on a specific blog to see all of the respective posts and comments that were made. If the user wants to make their own blogs or comment on other posts, they must sign up and log in. After logging in, users will also have access to make, view, and delete their blogs and posts.


<h2>Link to Application</h2>
https://blogmyday.onrender.com/


Features
----
### Home Page

![featured](https://user-images.githubusercontent.com/27057402/218233601-d1e35bdb-6119-4c04-baa3-3e2f70119bce.PNG)
When users enter the page they will be presented with all of the blogs made by existing users. These blogs are sorted by popularity measured by their followers and posts. From here, users can either look at indiviual blogs or sign up to make some of their own.

![search filter](https://user-images.githubusercontent.com/27057402/218233612-d3fb8a8e-9624-43a2-83b2-1ca7abbb8747.PNG)
Additionally, users can filter and search specifics blogs by typing part of their title in the searchbar.

### Login Page

![login](https://user-images.githubusercontent.com/27057402/214251560-203ebc56-21de-42a0-ab88-505842b00187.PNG)

Users are asked to sign up or login with the required information. Auth0 was used for the sign up and login functionalities.

### Navigation

![blogs dropdown](https://user-images.githubusercontent.com/27057402/218233617-4ffdcd01-8fea-4f88-80d9-75434bbe2d9b.png)

The NavBar has multiple options for the users to pick from. The View Blogs dropdown provides the users with a few different pages where they can see blogs and posts made by the overall userbase. My Blogs will send the user to their personal page. 

![notif dropdown](https://user-images.githubusercontent.com/27057402/218233620-bee24331-e403-4eef-9a9a-3e6e96de9b26.png)

The Notifications bell icon will light up in the NavBar if the users has any notifications. The dropdown will display up to 3 of the lastest notifications they had. From here, they can choose to clear their notifications or view them all in the Notifications page shown below:

![notif page](https://user-images.githubusercontent.com/27057402/218233622-04546159-84a1-41a1-8398-eb826be968cd.PNG)

### Recent Posts Page

![recent posts](https://user-images.githubusercontent.com/27057402/218233625-89812c27-7d33-48c0-99b0-d1910db93401.PNG)

The most recent posts by all users on the website database are shown here.

### Followed Blogs Page

![followed](https://user-images.githubusercontent.com/27057402/218233630-54287603-3618-44f7-9da8-5a32a46031d5.PNG)

Logged in users can view all of the blogs they're following on this page. Clicking on any of them will allow users to view more of the details of each blog.

### User Page

![user page](https://user-images.githubusercontent.com/27057402/218233633-1f03d71f-37d0-4346-96be-568f93be3f13.PNG)

If the user logs into their account, they can access their blog page. Here, they can create a new blog, delete an existing blog, or view any of their blogs.

### View Blog Page 

![view blog](https://user-images.githubusercontent.com/27057402/218233637-5621569d-3e02-4ba9-b0b7-0b9223bce73c.PNG)

This page allows you to view all the posts made about the blog you're looking at. You can click on any of the posts if you'd like to interact or comment on them. Logged in users can follow the blog by clicking the star icon next to the blog title. If you are the user who created the blog, you have edit, delete, and post creation access on this page.

### View Post Page

![view post](https://user-images.githubusercontent.com/27057402/218233641-da290be1-fbd7-41a7-839d-565e9d057fd4.PNG)

This page contains all the details of the selected post. On this page, logged in users can like/dislike the post or any of the comments in it. They can also comment on the post directly as well. If the logged in user is the owner of the post, they have edit and delete access to it. Users also have access to delete any of their own comments on this page.

### Mobile Support

![responsive](https://user-images.githubusercontent.com/27057402/218233679-cf066b2e-10b1-441b-adca-a5634df3c40d.png | width=100)
<img src="https://user-images.githubusercontent.com/27057402/218233679-cf066b2e-10b1-441b-adca-a5634df3c40d.png" height="500">

The website is fully responsive and workd for mobile devices.

### Create Blog Page 

![create blog](https://user-images.githubusercontent.com/27057402/218233645-e9b52201-1d49-4c2c-9f80-c6670ae78294.PNG)

Users can create a blog on this page by entering the necessary data. Currently, users only have to specify the title of the blog.

### Edit Blog Page 

![edit blog](https://user-images.githubusercontent.com/27057402/218233650-7f12fbd5-918a-4ec2-a879-c98f5d868e50.PNG)

Users can make revisions to an existing post here.

### Create Post Page 

![create post](https://user-images.githubusercontent.com/27057402/218233653-118ac60c-c2ad-4c13-b4c1-d151292890f6.PNG)

Users can make a post here by specifying its title and content.

### Edit Post Page 

![edit post](https://user-images.githubusercontent.com/27057402/218233654-9f493146-8ce6-4c90-af23-1466b0c5273b.PNG)

Users can make revisions to an existing post here.
