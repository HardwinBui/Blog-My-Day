# Blog My Day


<h2>Introduction</h2>
BlogMyDay is a web application built with MERN stack where people can blog about their day, hobbies, or anything that they find interesting. When users enter the website, they are presented with all of the blogs created from existing users. They can then click on a specific blog to see all of the respective posts and comments that were made. If the user wants to make their own blogs or comment on other posts, they must sign up and log in. After logging in, users will also have access to make, view, and delete their blogs and posts.


<h2>Link to Application</h2>
https://blogmyday.onrender.com/


Features
----
### Home Page

![featured](https://user-images.githubusercontent.com/27057402/216795792-60403b65-f515-4c19-b56d-45315acf2d02.PNG)
When users enter the page they will be presented with all of the blogs made by existing users. These blogs are sorted by popularity measured by their followers and posts. From here, users can either look at indiviual blogs or sign up to make some of their own.

![search filter](https://user-images.githubusercontent.com/27057402/216795824-362ea935-08be-47dd-afd7-bc969324b252.PNG)
Additionally, users can filter and search specifics blogs by typing part of their title in the searchbar.

### Login Page

![login](https://user-images.githubusercontent.com/27057402/214251560-203ebc56-21de-42a0-ab88-505842b00187.PNG)

Users are asked to sign up or login with the required information. Auth0 was used for the sign up and login functionalities.

### Navigation

![blogs dropdown](https://user-images.githubusercontent.com/27057402/216796095-65c05819-d62b-46c0-8b09-9d9b32758d06.png)

The NavBar has multiple options for the users to pick from. The View Blogs dropdown provides the users with a few different pages where they can see blogs and posts made by the overall userbase. My Blogs will send the user to their personal page. 

![notifications](https://user-images.githubusercontent.com/27057402/216796162-36a3f417-de68-4612-af36-ec1db60ebbf3.png)

The Notifications bell icon will light up in the NavBar if the users has any notifications. The dropdown will display up to 3 of the lastest notifications they had. From here, they can choose to clear their notifications or view them all in the Notifications page shown below:

![notif page](https://user-images.githubusercontent.com/27057402/216796205-fa46af06-5891-4b42-8f2a-dbb9ddf45036.PNG)

### Recent Posts Page

![recent posts](https://user-images.githubusercontent.com/27057402/216796300-cdf18b95-5971-41c9-b033-aa137dac80df.PNG)

The most recent posts by all users on the website database are shown here.

### Followed Blogs Page

![followed blogs](https://user-images.githubusercontent.com/27057402/216796373-80b193b0-de3a-4d0c-831e-0443c5998306.PNG)

Logged in users can view all of the blogs they're following on this page. Clicking on any of them will allow users to view more of the details of each blog.

### User Page

![user page](https://user-images.githubusercontent.com/27057402/216795859-72b03e2b-f016-46b6-a620-318e1d9b5fb1.PNG)

If the user logs into their account, they can access their blog page. Here, they can create a new blog, delete an existing blog, or view any of their blogs.

### View Blog Page 

![view blog](https://user-images.githubusercontent.com/27057402/216795868-54c8d2f5-1569-4bd7-9b9e-5fb164a7392c.PNG)

This page allows you to view all the posts made about the blog you're looking at. You can click on any of the posts if you'd like to interact or comment on them. Logged in users can follow the blog by clicking the star icon next to the blog title. If you are the user who created the blog, you have edit, delete, and post creation access on this page.

### View Post Page

![view post](https://user-images.githubusercontent.com/27057402/216796349-a623d1d2-3f96-44c1-80f2-4dcf883a83b4.PNG)

This page contains all the details of the selected post. On this page, logged in users can like/dislike the post or any of the comments in it. They can also comment on the post directly as well. If the logged in user is the owner of the post, they have edit and delete access to it. Users also have access to delete any of their own comments on this page.

### Create Blog Page 

![create blog](https://user-images.githubusercontent.com/27057402/216796535-14c882da-a1f0-4d53-90e0-5639447c4df6.PNG)

Users can create a blog on this page by entering the necessary data. Currently, users only have to specify the title of the blog.

### Edit Blog Page 

![edit blog](https://user-images.githubusercontent.com/27057402/216796493-6a4645d1-0fce-4d86-902d-679b3ebc8e7d.PNG)

Users can make revisions to an existing post here.

### Create Post Page 

![create post](https://user-images.githubusercontent.com/27057402/216796539-17d03d4e-661a-4935-937f-4c54308dc089.PNG)

Users can make a post here by specifying its title and content.

### Edit Post Page 

![edit post](https://user-images.githubusercontent.com/27057402/216796462-f1d27a2f-bb73-4985-aa5e-76135611ca18.PNG)

Users can make revisions to an existing post here.
