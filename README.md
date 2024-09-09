Demo: <br>
[![Simple Kanban Demo]( https://img.youtube.com/vi/cZ2UPgGMKwA/0.jpg )](https://www.youtube.com/watch?v=cZ2UPgGMKwA) <br>
<h1> Simple Kanban </h1>
<p>
This the Next.js version of a past project of mine. <br>
Check it out here: <br>
https://simple-kanban-next-js.vercel.app/ <br>
Dummy account: <br>
user: a@gmail.com <br>
password: 123456789 
</p>

<h2> Ok, but what does your app do? </h2>
<p> A kanban board is a organization tool designed to assist in visualizing tasks in an ordered and efficient manner, commonly used in agile environments. <br>
  The features of my application are:  <br>
  <ul>
    <li> Signup and user authentication with NextAuth.js</li>
    <li> Manage user boards in the homepage </li>
    <li> Create lists, and manage item cards with the React-beautiful-dnd library</li>
  </ul>
</p>

<h2> Design Choices </h2>
<h3> Stack </h3>
<p>
  <ul>
    <li> Next.js and Chakra UI for front-end </li>
    <li> Drag and drop with React-beautiful-dnd </li>
    <li> Next.js for backend API calls to MongoDB Atlas </li>
    <li> NextAuth.js and bcrypt for authentication and security </li>
  </ul>
</p>

<p> So why did I choose Next.js? 
<ol>
  <li> Core features: directory based routing, server-side rendering, and built in server components </li>
  <li> Ease of adoption from React, and the fact that I wanted to learn a full stack framework </li>
  <li> Experimentation and Learning Purposes </li>
</ol>
I plan to continue working on this application and maybe port it into mobile. 
As per a suggestion, there are also plans to transform this application into a all-in-one productivity app 
with features such as a pomodoro timer, calendars, and more. I look forward to working on it.
</p>

<p>
Some issues with the project: 
<ul> 
  <li> The UI framework used, Chakra UI, overrides css modules, thus making the initial load long since Chakra's css themes have to be imported first. </li>
  <li> I have yet to include other authentication providers, such as Google and Facebook. </li>
  <li> My application has a really long cold start, which means long initial long times. Couple this with relatively large bundles results in load times of 5-7 seconds. </li>
 <ul>
 </p>
