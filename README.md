<a name="readme-top"></a>

<!-- PROJECT LOGO -->
<div align="center">

   # Drag-Drop Plus

   A JavaScript library for enabling **drag and drop** functionality on any elements in the DOM. This library also includes **accessibility** features, allowing users to drag and drop elements using only their keyboard.

   [Request a Feature](https://github.com/devashishp1999/drag-drop-plus/issues)

</div>

<!--<details close>
  <summary><strong>last updated</strong> : Jan 26, 2023 7:40 am (UTC)</summary>
  <ul>
    <li><code>Fixed CDN links</code> : now usable</li>
  </ul>
</details> -->


## About The Project

The **drag-drop-plus** library is a powerful and easy to use tool that allows developers to easily add drag and drop functionality to their web projects. This library is designed to make it easy to add drag and drop functionality to any element in the DOM, while **also providing accessibility options** so users can drag and drop elements using only their keyboard.

**Use this library if:**

- You want to drag an element and drop it somewhere on DOM
- You also want Drag-drop feature withthe keyboards

#### Built With

[![JavaScript][javascript.com]][javascript-url] &nbsp; [![HTML][html.com]][html-url] &nbsp; [![CSS][css.com]][css-url] &nbsp; [![OOPs][OOPs.com]][OOPs-url]

## Installation

• Include the `main.js` file in your project and create a new instance of a class.

```js
<script src="CDN-LINK"></script>

<script>
  const draggable = new DragDrop();
</script>
```

Install with NPM:

```sh
npm i drag-drop-plus
```
**or**

Include **one of the following** CDN link in your project.

```sh
https://devashishp1999.github.io/utils-deva/main.min.js

or

https://cdn.jsdelivr.net/gh/devashishp1999/utils-deva@main/main.min.js
```

<!-- USAGE EXAMPLES -->

## List of Classes :

<details close>
  <summary><strong>👇</strong></summary>
  <ol>
    <li><a href="#toast"><code>new Toast()</code></a></li>
  </ol>
</details>

<ol>
  <li id="toast"><h2>Toast</h2></li>
  
The Toast class provides a simple and flexible way to create and manage toast notifications in your web application. It allows you to easily customize the look, position and behavior of the toasts, and provides methods for showing, hiding and removing toasts.

### Showing a Toast

To show a toast, call the `show()` method on the Toast instance and pass in an options object.

```js
toast.show({
  text: "Hello World",
  position: "top",
  duration: 3,
  styles: {
    backgroundColor: "red",
    color: "white",
    fontSize: "20px",
  },
  animations: {
    slideIn: "1s",
  },
  fonts: {
    fontFamily: "Arial",
  },
});
```

### Removing a Toast

To remove a specific toast, call the `remove()` method on the Toast instance and pass in the toast element as an argument.

```js
toast.remove(toastElement);
```

### Removing All Toasts

To remove all toasts, call the `removeAll()` method on the Toast instance.

```js
toast.removeAll();
```

### Configuration

The options object passed to the `show()` method can include the following properties:

<ul><li><code>text</code> (string): The text to display in the toast (default: "Toast text").</li><li><code>position</code> (string): The position of the toast. Available options are "top", "bottom", "center", "left" and "right" (default: "bottom").</li><li><code>duration</code> (number): The duration in seconds for which the toast should be displayed (default: 3).</li><li><code>onClose</code> (function): A callback function that is invoked when the toast is closed (default: null).</li><li><code>styles</code> (object): An object containing custom CSS styles to be applied to the toast (default: {}).</li><li><code>animations</code> (object): An object containing custom CSS animations to be applied to the toast (default: {}).</li><li><code>fonts</code> (object): An object containing custom fonts to be applied to the toast (default: {}).</li></ul>

### Example

```js
const toast = new Toast();
toast.show({
  text: "Hello World",
  position: "top",
  duration: 2.5,
  styles: {
    backgroundColor: "red",
    color: "white",
    fontSize: "20px",
  },
  animations: {
    slideIn: "1s",
  },
  fonts: {
    fontFamily: "Arial",
  },
});
```

This will create a new toast with the text "Hello World" and position it on the top of the screen and it will be removed after 3000ms. Also the toast will slide in from 1s with custom background color, color and font size and font family.

### Browser Support

This library uses `querySelector` and `appendChild` which are supported by all modern browsers.

<!--
<li><h3>Toast </h3> : A standalone class for creating customizable, dismissable toast notifications.</li><br />-->
</ol>

### License

<p>This library is released under the <a href="https://opensource.org/licenses/MIT" target="_new">MIT license</a></p>

Hope this library will be helpful for you.

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[stars-shield]: https://img.shields.io/github/stars/github_username/repo_name.svg?style=for-the-badge
[stars-url]: https://github.com/github_username/repo_name/stargazers
[issues-shield]: https://img.shields.io/github/issues/github_username/repo_name.svg?style=for-the-badge
[issues-url]: https://github.com/github_username/repo_name/issues
[license-shield]: https://img.shields.io/github/license/github_username/repo_name.svg?style=for-the-badge
[license-url]: https://github.com/github_username/repo_name/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/devashishpujari
[product-screenshot]: images/screenshot.png
[next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[next-url]: https://nextjs.org/
[react.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[react-url]: https://reactjs.org/
[vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[vue-url]: https://vuejs.org/
[angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[angular-url]: https://angular.io/
[svelte.dev]: https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00
[svelte-url]: https://svelte.dev/
[laravel.com]: https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white
[laravel-url]: https://laravel.com
[bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[bootstrap-url]: https://getbootstrap.com
[jquery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[jquery-url]: https://jquery.com
[javascript.com]: https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo&logoColor=black
[javascript-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript
[oops.com]: https://img.shields.io/badge/Object%20Oriented%20Programming-2c5ebf?style=for-the-badge&logo&logoColor=black
[oops-url]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Object-oriented_programming
[html.com]: https://img.shields.io/badge/HTML-E96228?style=for-the-badge&logo=html
[html-url]: https://developer.mozilla.org/en-US/docs/Web/HTML
[css.com]: https://img.shields.io/badge/CSS-2965F1?style=for-the-badge&logo=CSS&logoColor=black
[css-url]: https://developer.mozilla.org/en-US/docs/Web/CSS
