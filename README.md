# Yoga <img src="https://img.shields.io/badge/Status-Complete-green" style="vertical-align: middle;">
> Commercial app for selling tours to India
> <p><a href="https://username1111111111.github.io/Yoga/">Live demo here</a></p>
> <p>Or 👇:</p>
<a href="https://username1111111111.github.io/Yoga/">
 <img src="./_resourses/yoga.png">
</a>

## Table of Contents
* [General Info](#general-information)
* [Technologies Used](#technologies-used)
* [Features](#features)
* [Screenshots](#screenshots)
* [Setup](#setup)
* [Usage](#usage)
* [Contact](#contact)
<!-- * [License](#license) -->


## General Information
- This was done as one of my Udemy learning projects
- It was inteded for practice with Webpack, DOM events, DOM manipulation and Babel.

## Technologies Used
- Webpack
- Babel (as Webpack plugin)
- Uglify.js (as plugin)
- Bootstrap

## Features
- Good looking sliders for photos and cards
- Tour price calculation (with defense against empty fields errors)
- Timer and promotion (with Date() parsing)
- Modal window (by clicking "Learn more")
- Contact form with submit

## Screenshots
![Screenshot](./_resourses/yoga.gif)

## Setup
1. Clone repo
2. `npm install`

If you have trouble with webpack compiling - global installation may conflict with local, so you must delete global and install localy in cloned repo:
```
npm i --save webpack
npm i --save webpack-cli
npm i --save uglifyjs-webpack-plugin
npm i --save babel
npm i --save babel-loader
npm i --save core-js@2
```

## Usage
Open **index.html** in a browser 👍

If you plan to make changes inside .js files, you need to compile your code after changes with:
`npx webpack`

## Contact
<p style="font-size: 16px;"><a style="text-decoration: none;"href="https://github.com/Username1111111111/Username1111111111">@Username1111111111</a><details> 
  <summary>The Frontend developer</summary>
  💪
</details></p>


