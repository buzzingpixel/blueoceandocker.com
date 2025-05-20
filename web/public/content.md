# Why Docker?

At this point, you’ve probably heard of Docker. Its usage has grown by leaps and bounds. But what is Docker? What does it do? How does it work? What purpose does Docker serve? Well, there’s a good reason Docker has taken the web development and server world by storm. Docker upends the way traditional web application stacks work and how we think about them and gives us a much better model of application architecture management.

Let’s start with local development. Any developer is going to need an environment in which to run their application for development and testing. Most developers use more than one environment. In the web world, we have to run the entire web application stack in order to serve the application we’re working on to a browser so we can see the result of the code we’re writing.

If, for instance, you have an application that runs a Node based React front-end and a PHP back-end. You’ll need a web server and PHP, and you’ll probably need a database, whether that’s MySQL, Postgres, Mongo, or one of the other myriad available database engines. And you’ll need a Node installation to run the Node application, probably using Express or some framework built-in tooling (which is likely running Express somewhere behind the scenes). This means you have to install a lot of stuff on your computer and keep it at the right version for your application.

There have been various tools for getting this done over the years. You may have heard of some of them: MAMP, XAMPP, Vagrant, EasyPHP, Virtalbox, Laravel Valet — or maybe you’ve used Homebrew to install these tools directly on your computer.

But these solutions have some of fatal flaws. Let’s consider two of them:

The first is that it can take a while to get started on a new or existing project. You may have to install new or different versions of your various application stacks, and you may have to manage those versions in some way so that they don’t clash with the versions required to run other application stacks that you also work on.

The second issue of concern is that using older and more traditional methods of running your application on your local computer means that you are working in an environment that your application will ultimately not be running in. To put this in context and illustrate why it’s important, let’s say that you write a feature that requires a certain PHP extension to be loaded — and that extension is loaded by default in the environment you’re working in. But when you deploy to production your app crashes because that extension isn’t loaded in that environment. And then you have the dreaded, “well, it works on my machine.” And now you have to track down an incredibly hard to find bug that you can’t replicate in your development environment. The quip to, “well, it works on my machine,” is usually, “but we’re not shipping your machine to the user are we?”

But what if we could?

Docker, when leveraged to its full potential, essentially makes this possible.

In the following lessons, we’ll cover things like the terminology that Docker uses (what is a container, what’s an image, and what’s the difference), how to set up an environment that you can use from dev to production, and how you can make the most of Docker.
