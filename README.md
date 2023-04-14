This the Next.js version of a past project of mine. \
Check it out here: \
https://simple-kanban-next-js.vercel.app/ \
Some dummy accounts: \
user: a@gmail.com \
password: 123456789 

So why did I choose Next.js? 
1. Core features: directory based routing, server-side rendering, and built in server components 
2. Ease of adoption from React, and the fact that I wanted to learn a full stack framework 
3. Experimentation Purposes 

I plan to add continue working on this application and maybe port it into mobile. \
As per a suggestion, there are also plans to transform this application into a all-in-one productivity app \
with features such as a pomodoro timer, calendars, and more. I look forward to working on it.

Some issues with the project: 
1. The UI framework used, Chakra UI, overrides css modules, thus making the initial load long since Chakra's css themes have to be imported first.
2. I have yet to include other authentication providers, such as Google.
3. My application has a really long cold start, which means long initial long times. Couple this with relatively large bundles results in load times of 5-7 seconds.
