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

- You want to drag any element and drop it somewhere on DOM
- You also want Drag-drop feature withthe keyboards

#### Built With

[![JavaScript][javascript.com]][javascript-url] &nbsp; [![HTML][html.com]][html-url] &nbsp; [![CSS][css.com]][css-url] &nbsp; [![OOPs][oops.com]][oops-url]

## Installation

Include **one of the following** CDN link in your project. And create a new instance of the class.

```sh
https://devashishp1999.github.io/drag-drop-plus/main.min.js
```

<!--
**or**

```sh
https://cdn.jsdelivr.net/gh/devashishp1999/drag-drop-plus@main/main.min.js
```
-->

```js
<script src="CDN_LINK"></script>

<script>
  const draggable = new DragDrop();
</script>
```

**Or** Install with NPM:

```sh
npm i drag-drop-plus
```

```js
import DragDrop from "drag-drop-plus";

const draggable = new DragDrop();
```

**NOTE :** The script **needs an attribute** of the element to make it **draggable or a drop-zone**. Default attributes are set for:

- Element to drag : `data-draggable`
- Element to drop in : `data-dropzone`

Also you can set your custom `Attributes`. To make an element droppable in specific drop-zone among multiple drop-zones.

> To see elements in action, **do not forget to add styles**. `data-dragging-box` is the default attribute for the element while dragging. And the Element while dragging will always be a `clone()` of the element you are dragging.

<!-- USAGE EXAMPLES -->

## Usage - [Demo link](https://jsfiddle.net/devashishpujari/8kt9axo3/33/)

### Basic drag-drop

1.) Create an instance.

```js
const draggable = new DragDrop();
```

2.) Add required attributes to HTML Tags

```html
<!-- Tell script what to drag -->
<span data-draggable> drag-box 1 </span>
<span data-draggable> drag-box 2 </span>

<!-- Tell script where to drop -->
<div data-dropzone>drop-zone 1</div>
<div data-dropzone>drop-zone 2</div>
<div data-dropzone>drop-zone 3</div>
```

**And DONE**. Now, in this example, `<span>` elements are draggable and you can drop them inside the `<div>` elements.

### Drop-zone specific drag-boxes : `setDragDropElements()`

To create multiple draggable-boxes and specific drop-zones for them. Create multiple instances of the class and use `setDragDropElements()` method.

1.) Create multiple instances.

```js
const draggable_1 = new DragDrop();
const draggable_2 = new DragDrop();

// 1st Drag-Drop Environment
draggable_1.setDragDropElements({
  boxAttr: "data-draggable-1",
  dropboxAttr: "data-dropzone-1",
  dragboxAttr: "data-dragging-box-1", // Attribute for the Element while dragging
});

// 2nd Drag-Drop Environment
draggable_2.setDragDropElements({
  boxAttr: "data-draggable-2",
  dropboxAttr: "data-dropzone-2",
  dragboxAttr: "data-dragging-box-2", // Attribute for the Element while dragging
});
```

2.) Add required attributes to HTML Tags

```html
<!-- Draggable SET 1-->
<span data-draggable-1> drag-box 1 </span>
<span data-draggable-1> drag-box 1 </span>

<!-- DropZone for SET 1 -->
<div data-dropzone-1>drop-zone 1</div>
<div data-dropzone-1>drop-zone 2</div>

------------------------------------------

<!-- Draggable SET 2-->
<span data-draggable-2> drag-box 2 </span>
<span data-draggable-2> drag-box 2 </span>

<!-- DropZone for SET 2 -->
<div data-dropzone-2>drop-zone 1</div>
<div data-dropzone-2>drop-zone 2</div>
```

**Now** the `<span>` elements with `data-draggable-1` attribute can only be dropped in the `<div>` elements with the `data-dropzone-1` attributes. And same for every new `Attribute` you specify for a new Instance `new DragDrop()`.

### Drag-Drop with Keyboard:

1. Move to a draggable element with `TAB` key.

2. Press `SPACE` key to select the focused draggable element.

3. To drop you have 2 options :
   - Use `TAB` key to focus a `dropzone`. And then press `SPACE` key to drop on focused dropzone.
   - Use `Arrow Keys` to move the selected drag-box. And make its center inside your favourite dropzone. And then press `SPACE` key to drop the element.

## Methods and properties

The library is built with a number of abstracted methods, which make it easy for developers to customize the behavior of the drag and drop functionality to fit their specific needs.

#### Properties :

**1**) `draggingBox`: Reference of the HTMLElement being dragged. Read Only.
**2**) `boxToDrag`: Reference of the HTMLElement to drag. Read Only.

**Note :** `boxToDrag !== draggingBox`

```js
const draggable = new DragDrop();

draggable.onDragStart = function () {
  console.log(draggable.draggingBox); // HTMLElement user is dragging
  console.log(draggable.boxToDrag); // HTMLElement that is selected to drag
};

// There are more methods other than onDragStart(). See 'Methods' section
```

**3**) `droppable` : Read Only.

```js
const draggable = new DragDrop();

draggable.onDrag = function () {
  // Read Only property.
  console.log(draggable.draggable); // Logs the Object on every Drag event
};
/*
Returned Object :
{
  value: false, // If draggibg-box is over valid drop-zone or not. Default: false
  dropbox: null, // Valid dropbox HTMLElement or Null/False. Default: null
};
*/
```

It can be used to check, before droping or while dragging, if an element can be dropped or not. and get the drop-zone element. Can be **helpful** to style elements, also with the `methods()` listed below.

#### Methods :

**1**) `setDragDropElements()` : Tells script the value of custom attributes.

Put the same attributes in your HTMLElements that you update via this method

```js
const draggable = new DragDrop();

draggable.setDragDropElements({
  boxAttr: "data-drag-this",
  dropboxAttr: "data-drop-here",
  dragboxAttr: "data-being-dragged", // Attribute for the Element while dragging
});
```

**2**) `addEventListners()` : Adds eventListners to drag-drop to the elements with the specified attributes. The class this function by default.

**3**) `removeEventListners()` : Removes all the attached eventListners for the Drag-drop functionality from the elements with the attributes in that instance.

```js
const draggable_1 = new DragDrop();
const draggable_2 = new DragDrop();

draggable_1.removeEventListners();
draggable_1.addEventListners();

draggable_2.removeEventListners();
```

**Methods to override :** by default they are set to `() => null`

**1**) `onDragStart()` : runs when selected a draggable-box
**2**) `onDrag()` : runs when Dragging with mouse/ Touch/ KeyPresses
**3**) `onKeyDrag()` : runs when Dragging with only KeyPress
**4**) `onDragEnd()` : runs when mouse is released after dragging.
**5**) `onDrop()` : runs when element dropped successfully
**6**) `onTabKeypress()` : runs when hopping b/w drop-zones.

Override these methods, if you want to, as following:

```js
const draggable = new DragDrop();

draggable.onDragStart = function () {
  console.log(draggable.boxToDrag); // HTMLElement user selected to drag

  /* Any thing you want to do onDragStart */
};

draggable.onDrag = function (event) {
  console.log(draggable.draggingBox); // HTMLElement user is dragging
  console.log(draggable.droppable);

  console.log(event.type);
  /* Any thing you want to do onDrag */
};

draggable.onDrop = function (event) {
  console.log(draggable.droppable.dropbox) // HTMLElement where drag-box is dropped
  console.log(event); // MouseEvent or KeyboardEvent
  .
  .
  /* Any thing you want to do onDrop */
};

/* Other Methods */
```

#### Example : [JSFiddle Link](https://jsfiddle.net/devashishpujari/8kt9axo3/33/)

If you liked this. Give this repo a ⭐ STAR ⭐

## License

<p>This library is released under the <a href="https://opensource.org/licenses/MIT" target="_new">MIT license</a></p>

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
