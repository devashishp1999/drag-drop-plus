export default class DragDrop {
  static MOVE_BY = 20; // px
  static SCROLL_ZONE_HEIGHT = 80; // px
  static SCROLL_AMOUNT = 10; // px
  static MOVE_KEYS = { 38: "N", 40: "S", 39: "E", 37: "W" }; // e.keyCodes
  static DROP_ANIM_DURATION = 300; // milliseconds

  // Attributes to work on
  #DRAG_BOX_ATTR = "data-draggable";
  #DROP_ZONE_ATTR = "data-dropzone";
  #DRAGGING_BOX_ATTR = "data-dragging-box";

  // Usfull vars
  #boxToDrag = null;
  #boxIsFocused = false;
  #boxIsSelected = false;
  #boxMouseSelected = false;

  #draggingBox = null;
  #draggingFrom = null;
  #dropZones = [];
  #dropBox = null;

  #mouse = { mx: null, my: null, boxX: null, boxY: null, dx: null, dy: null };
  #mouseLastCoords = { x: 0, y: 0 };

  // Information for abstraction - read-only
  #candrop = { value: null, dropbox: null };

  constructor() {
    this.#makeElementsAccessible(this.#DRAG_BOX_ATTR, true);
    this.#addEventListners();
  }

  // Set Drag-Boxes and DropZones
  #setDragDropElements(envObject) {
    if (Object.entries(envObject).length === 0) return;

    const { boxAttr, dropboxAttr, dragboxAttr } = envObject;

    this.#DRAG_BOX_ATTR = boxAttr ?? "nullAttribute";
    this.#DROP_ZONE_ATTR = dropboxAttr ?? "nullAttribute";
    this.#DRAGGING_BOX_ATTR = dragboxAttr ?? "nullAttribute";

    // Add accissibilty to default elements
    this.#makeElementsAccessible(this.#DRAG_BOX_ATTR, true);
    this.#makeElementsAccessible(this.#DROP_ZONE_ATTR, true);
  }

  // Make draggable elements accissible by keyboard.
  #makeElementsAccessible(attr, bool) {
    setTimeout(() => {
      const boxes = document.querySelectorAll(`[${attr}]`);

      if (boxes.length === 0) {
        throw new Error(`No element found with Attribute "${attr}"`);
      }
      boxes.forEach((box) => box.setAttribute("tabindex", bool ? "0" : ""));
    }, 10);
  }

  // Add Event Listners
  #addEventListners() {
    // Mouse drag-drop
    document.addEventListener("mousedown", this.#eventCallback);
    document.addEventListener("mouseup", this.#eventCallback);
    document.addEventListener("mousemove", this.#eventCallback);

    // Key Events for accessibilty
    document.addEventListener("keydown", this.#eventCallback);
    document.addEventListener("keyup", this.#eventCallback);

    // Mobile touch drag-drop
    // { passive: false } to prevent reload on swipe-down in mobile phones
    document.addEventListener("touchstart", this.#eventCallback, {
      passive: false,
    });
    document.addEventListener("touchend", this.#eventCallback, {
      passive: false,
    });
    document.addEventListener("touchmove", this.#eventCallback, {
      passive: false,
    });
  }

  // Remove Event Listners
  #removeEventListners() {
    // Mouse drag-drop
    document.removeEventListener("mousedown", this.#eventCallback);
    document.removeEventListener("mouseup", this.#eventCallback);
    document.removeEventListener("mousemove", this.#eventCallback);

    // Key Events for accessibilty
    document.removeEventListener("keydown", this.#eventCallback);
    document.removeEventListener("keyup", this.#eventCallback);

    // Mobile touch drag-drop
    // { passive: false } to prevent reload on swipe-down in mobile phones
    document.removeEventListener("touchstart", this.#eventCallback, {
      passive: false,
    });
    document.removeEventListener("touchend", this.#eventCallback, {
      passive: false,
    });
    document.removeEventListener("touchmove", this.#eventCallback, {
      passive: false,
    });
  }

  // Callback map
  #eventCallback = (event) => {
    switch (event.type) {
      case "mousedown":
        this.#onMouseDown(event);
        break;
      case "mouseup":
        this.#onMouseUp(event);
        break;
      case "mousemove":
        this.#onMouseMove(event);
        break;
      case "touchstart":
        this.#onTouchStart(event);
        break;
      case "touchend":
        this.#onTouchEnd(event);
        break;
      case "touchmove":
        this.#onTouchMove(event);
        break;
      case "keydown":
        this.#onKeyDown(event);
        break;
      case "keyup":
        this.#onKeyUp(event);
        break;
    }
  };

  // Handle mousedown event on draggable box
  #onMouseDown(event) {
    const target = event.target.hasAttribute(this.#DRAG_BOX_ATTR)
      ? event.target
      : event.target.closest(`[${this.#DRAG_BOX_ATTR}]`);

    if (!target || this.#boxIsSelected) return;

    // restricts text selection onMouseMove
    event.preventDefault();

    this.#setPropertiesOnDragStart(event, target);
    this.#setInitialCoords(event);
    this.#createDraggingBox(event);

    window.requestAnimationFrame(() => this.#scrollOnScrollZone(event));
  }

  // Handle touch-start event on draggable box
  #onTouchStart(event) {
    const target = event.target.hasAttribute(this.#DRAG_BOX_ATTR)
      ? event.target
      : event.target.closest(`[${this.#DRAG_BOX_ATTR}]`);

    if (!target || this.#boxIsSelected) return;

    this.#setPropertiesOnDragStart(event, target);
    this.#setInitialCoords(event);
    this.#createDraggingBox(event);

    window.requestAnimationFrame(() => this.#scrollOnScrollZone(event));
  }

  // Create a clone of the draggable box to use as the dragging element
  #createDraggingBox(event) {
    // return if box is already dragging.
    if (this.#draggingBox) return;

    // dragging will be done on new Node
    this.#draggingBox = this.#boxToDrag.cloneNode(true);
    // hide original node
    this.#boxToDrag.style.opacity = 0;

    // remove drag_box_attr and add dragging_box attr to dragging box
    this.#draggingBox.removeAttribute(this.#DRAG_BOX_ATTR);
    this.#draggingBox.setAttribute(this.#DRAGGING_BOX_ATTR, "");

    let { width, height, x, y } = this.#boxToDrag.getBoundingClientRect();

    x += window.scrollX;
    y += window.scrollY;

    this.#draggingBox.style.cssText = `
          position: absolute;
          width: ${width}px;
          height: ${height}px;
          top: ${y}px;
          left: ${x}px;
          box-shadow: 0 0 10px #00000080;
          outline: 1px solid gray;
          z-index: 999;
          user-select: none;
        `;

    document.querySelector("body").append(this.#draggingBox);

    this.#makeElementsAccessible(this.#DRAG_BOX_ATTR, false);
    this.#makeElementsAccessible(this.#DROP_ZONE_ATTR, true);

    this.onDragStart(event);
  }

  // Scroll screen when box is near to top-bottom ends
  #scrollOnScrollZone(event) {
    if (this.#boxIsSelected) {
      const viewportHeight = window.innerHeight;
      const cursorPosition = this.#mouseLastCoords.y;

      const draggingBoxTop = parseInt(this.#draggingBox.style.top);
      const scrollAmount = Draggable.SCROLL_AMOUNT;

      // Check for mouseY within 80px from top. To scroll up
      // Also scrollY > 0 is checked to not update Box-Top when scrollY == 0
      if (cursorPosition < Draggable.SCROLL_ZONE_HEIGHT && window.pageYOffset) {
        window.scrollBy(0, -scrollAmount);

        // Move draggingBox with scroll
        this.#draggingBox.style.top = draggingBoxTop - scrollAmount + "px";
      }
      // Check for mouseY within 80px from bottom. To scroll down.
      else if (cursorPosition > viewportHeight - Draggable.SCROLL_ZONE_HEIGHT) {
        window.scrollBy(0, scrollAmount);

        // Move draggingBox with scroll
        this.#draggingBox.style.top = draggingBoxTop + scrollAmount + "px";
      }

      window.requestAnimationFrame(() => this.#scrollOnScrollZone(event));
    }
  }

  // Handle mouseup event on draggable box
  #onMouseUp(event) {
    const target =
      event.target.closest(`[${this.#DRAGGING_BOX_ATTR}]`) ?? event.target;

    if (target !== this.#draggingBox) return this.#removeDraggingBox(event);

    // Get dropbox where mouse left the dragging box
    if (this.#boxIsSelected) this.#dropBox = this.#pointerInsideDropbox();

    // If there is a valid dropbox, drop the element
    if (this.#dropBox) this.#dropDraggingBox(event);

    this.#boxMouseSelected = false;
    this.#mouseLastCoords = { x: 0, y: 0 };

    // Remove the dragging box
    this.#removeDraggingBox(event);
  }

  // Handle touchend event on draggable box
  #onTouchEnd(event) {
    const target =
      event.target.closest(`[${this.#DRAGGING_BOX_ATTR}]`) ?? event.target;

    // Get dropbox where mouse left the dragging box
    if (this.#boxIsSelected) this.#dropBox = this.#pointerInsideDropbox();

    // If there is a valid dropbox, drop the element
    if (this.#dropBox) this.#dropDraggingBox(event);

    this.#boxMouseSelected = false;
    this.#mouseLastCoords = { x: 0, y: 0 };

    // Remove the dragging box
    this.#removeDraggingBox(event);
  }

  // Handle KeyUp event on Document
  #onKeyUp(event) {
    if (event.key !== "Tab") return true;

    // Check if drop-Zone is focused
    const dropzoneIsFocused = document.activeElement.hasAttribute(
      this.#DROP_ZONE_ATTR
    );

    // Update Abstracted Object
    if (dropzoneIsFocused) {
      this.#candrop = { value: true, dropbox: document.activeElement };
    } else {
      this.#candrop = { value: false, dropbox: null };
    }

    //  Custom function call
    this.onTabKeypress(event);

    // Don't select any other elements if already picked an element
    if (this.#boxIsSelected) return event.preventDefault();

    // Make a Box selectable
    this.#boxIsFocused = document.activeElement.hasAttribute(
      this.#DRAG_BOX_ATTR
    );

    // Select box to drag if draggable box is selected
    if (this.#boxIsFocused) this.#boxToDrag = document.activeElement;
  }

  // Handle KeyDown event on Document
  #onKeyDown(event) {
    // which direction to move
    const direction = Draggable.MOVE_KEYS[event.keyCode];

    // On [SPACE] keyDown,
    //if box has focus()
    if (event.key === " " && this.#boxIsFocused) {
      // prevent the scroll when SPACE key pressed
      event.preventDefault();

      // Do nothing if already selected by mouse
      if (this.#boxMouseSelected) return true;

      // Pick the box if no box-selected
      if (!this.#boxIsSelected) {
        this.#boxIsSelected = true; // Mark selected

        // set for go-back transition
        this.#setInitialCoords(null);
        // Make inviewport, if already not, when selected.
        this.#keepElementInViewport(this.#boxToDrag);
      }
      // Drop the box if already a box selected
      else {
        this.#dropBox = this.#elementInsideDropbox();

        const dropzoneIsFocused = document.activeElement.hasAttribute(
          this.#DROP_ZONE_ATTR
        );

        // If dropzone is focused via [TAB] key
        if (dropzoneIsFocused) this.#dropBox = document.activeElement;
        // Drop the box if valid dropbox exists
        if (this.#dropBox) {
          this.#dropDraggingBox(event);
        }

        this.#removeDraggingBox(event);
      }
    }
    // On [ArrowKey Down]
    // and if not selected by mouse & there exists a dragging box
    else if (!this.#boxMouseSelected && direction && this.#draggingBox) {
      // prevent scroll on arrow keyDown
      event.preventDefault();

      // Make dragging box in viewport if gone out of viewport
      this.#keepElementInViewport(this.#draggingBox);
      this.#moveBox(direction, event);
    } else return;

    // Generate a draggable Element if selected a Box
    if (this.#boxIsSelected) {
      this.#draggingFrom = this.#boxToDrag?.parentElement;
      this.#createDraggingBox(event);

      this.#dropZones = Array.from(
        document.querySelectorAll(`[${this.#DROP_ZONE_ATTR}]`)
      );
    }
  }

  // Remove the clone of the draggable box
  #removeDraggingBox(event) {
    if (!this.#draggingBox) return;

    // position to start transition from
    const { x: x1, y: y1 } = this.#draggingBox.getBoundingClientRect();
    // position to end transition at
    const { x: x2, y: y2 } = this.#boxToDrag.getBoundingClientRect();

    // distance to transform
    const dx = Math.abs(x2 - x1);
    const dy = Math.abs(y2 - y1);

    // transition when distance > 200PX
    let animDuration = 0;
    if (Math.max(dx, dy) > 200) animDuration = Draggable.DROP_ANIM_DURATION;

    Object.assign(this.#draggingBox.style, {
      transition: animDuration + "ms linear",
      top: window.scrollY + y2 + "px",
      left: window.scrollX + x2 + "px",
    });

    setTimeout(() => {
      // Show hidden drag box and then focus()
      this.#boxToDrag.style.opacity = 1;
      this.#boxIsSelected = false;

      this.#boxToDrag.focus();

      this.#draggingBox?.remove();
      this.#draggingBox = null;

      this.#keepElementInViewport(this.#boxToDrag);
    }, animDuration);

    this.#makeElementsAccessible(this.#DRAG_BOX_ATTR, true);
    this.#makeElementsAccessible(this.#DROP_ZONE_ATTR, false);

    this.#candrop = { value: null, dropbox: null };
    this.onDragEnd(event);
  }

  // Finally drop the Box by copying a
  #dropDraggingBox(event) {
    const newBox = this.#boxToDrag.cloneNode(true);

    // add drag box to dropzone
    this.#dropBox.appendChild(newBox);

    // remove drop-able property from target dropzone
    this.#dropBox.removeAttribute(this.#DROP_ZONE_ATTR);
    // add drop-able property to container box dragged from
    this.#draggingFrom.setAttribute(this.#DROP_ZONE_ATTR, "");

    // also remove accessibility from target dropzone
    this.#dropBox.removeAttribute("tabindex");
    // add accessibilty to the container box is dragged from
    this.#draggingFrom.setAttribute("tabindex", 0);

    this.#boxToDrag.remove(); // remove original
    this.#boxToDrag = newBox; //
    this.#boxToDrag.focus();

    this.onDrop(event);
  }

  // Handle mousemove event on draggable box
  #onMouseMove(event) {
    if (!this.#boxIsSelected || !this.#boxMouseSelected) return;
    this.#dragBox(event);
  }
  // Handle touchmove event on draggable box
  #onTouchMove(event) {
    if (!this.#boxIsSelected || !this.#boxMouseSelected) return;

    // prevent loading on mobile devices
    event.preventDefault();
    this.#dragBox(event);
  }

  // Drag box by updating positions
  #dragBox(event) {
    const { clientX, clientY } = event.touches ? event.touches[0] : event;

    this.#mouseLastCoords = { x: clientX, y: clientY };

    // calculate how much to move
    let mdx, mdy;
    mdx = clientX - this.#mouse.mx;
    mdy = clientY - this.#mouse.my;

    let left = window.scrollX + this.#mouse.mx + mdx - this.#mouse.dx;
    let top = window.scrollY + this.#mouse.my + mdy - this.#mouse.dy;

    this.#draggingBox.style.top = top + "px";
    this.#draggingBox.style.left = left + "px";

    const dropbox = this.#pointerInsideDropbox();
    this.#candrop = { value: !!dropbox, dropbox };

    this.onDrag(event);
  }

  // Move Box with arrow keys
  #moveBox(direction, event) {
    const curr_y = parseInt(this.#draggingBox.style.top);
    const curr_x = parseInt(this.#draggingBox.style.left);

    const moveBy = Draggable.MOVE_BY;

    switch (direction) {
      case "N":
        this.#draggingBox.style.top = curr_y - moveBy + "px"; // y - 20 + px
        break;
      case "S":
        this.#draggingBox.style.top = curr_y + moveBy + "px";
        break;
      case "E":
        this.#draggingBox.style.left = curr_x + moveBy + "px"; // x + 20 + px
        break;
      case "W":
        this.#draggingBox.style.left = curr_x - moveBy + "px";
        break;
      default:
        break;
    }

    const dropbox = this.#elementInsideDropbox();
    this.#candrop = { value: !!dropbox, dropbox };

    this.onKeyDrag(event) === null ? this.onKeyDrag(event) : this.onDrag(event);
  }

  // Set some values and properties onDragStart
  #setPropertiesOnDragStart(event, target) {
    this.#boxToDrag = target;
    this.#draggingFrom = target.parentElement;

    this.#boxIsFocused = true;
    this.#boxIsSelected = true;
    this.#boxMouseSelected = true;

    const { clientX, clientY } = event.touches ? event.touches[0] : event;
    // update mouse coords
    this.#mouseLastCoords = { x: clientX, y: clientY };

    // identify dropzones
    this.#dropZones = Array.from(
      document.querySelectorAll(`[${this.#DROP_ZONE_ATTR}]`)
    );
  }

  // save Starting points of mouse and dragging box. Helps while mouseMove
  #setInitialCoords(event) {
    const { left, top } = this.#boxToDrag.getBoundingClientRect();

    if (event) {
      var { clientX, clientY } = event.touches ? event.touches[0] : event;
    } //
    else {
      var clientX = left;
      var clientY = top;
    }

    this.#mouse = {
      mx: clientX,
      my: clientY,
      boxX: left,
      boxY: top,
      dx: clientX - left,
      dy: clientY - top,
    };
  }

  // Get container to drop. When dragging with touch or mouse
  #pointerInsideDropbox() {
    let { x: pointerX, y: pointerY } = this.#mouseLastCoords;

    let dropbox = null;
    this.#dropZones.forEach((zone) => {
      let { top, bottom, left, right } = zone.getBoundingClientRect();

      if (
        pointerY >= top &&
        pointerY <= bottom &&
        pointerX >= left &&
        pointerX <= right
      )
        dropbox = zone;
    });

    return dropbox;
  }

  // Get container to drop. When dragging with KeyEvents
  #elementInsideDropbox() {
    const { top, left, width, height } =
      this.#draggingBox.getBoundingClientRect();

    const boxCenterX = left + width / 2;
    const boxCenterY = top + height / 2;

    let dropbox = null;
    this.#dropZones.forEach((zone) => {
      let boundRect = zone.getBoundingClientRect();

      if (
        boxCenterY >= boundRect.top &&
        boxCenterY <= boundRect.bottom &&
        boxCenterX >= boundRect.left &&
        boxCenterX <= boundRect.right
      )
        dropbox = zone;
    });

    return dropbox;
  }

  // Brings an element into viewport if its not
  #keepElementInViewport(ele) {
    const boundingRect = ele.getBoundingClientRect();

    // Width - Height of the viewport in a cross-browser compatible way.
    // viewportWidth
    const VW = window.innerWidth || document.documentElement.clientWidth;
    // viewportHeight
    const VH = window.innerHeight || document.documentElement.clientHeight;

    const isElementInViewport =
      boundingRect.bottom > 0 &&
      boundingRect.right > 0 &&
      boundingRect.left < VW &&
      boundingRect.top < VH;

    if (!isElementInViewport) {
      ele.scrollIntoView({ block: "center", behavior: "smooth" });
    }
  }

  // ABSTRACTION

  // values to read
  get droppable() {
    return this.#candrop;
  }

  get draggingBox() {
    return this.#draggingBox;
  }

  get boxToDrag() {
    return this.#boxToDrag;
  }

  // Set Drag-Boxes and DropZones
  get setDragDropElements() {
    return this.#setDragDropElements;
  }

  // Add Event Listners
  get addEventListners() {
    return this.#addEventListners;
  }

  // Remove Event Listners
  get removeEventListners() {
    return this.#removeEventListners;
  }

  // For additional functionality
  onDragStart = () => null;
  onDrag = () => null;
  onKeyDrag = () => null;
  onDragEnd = () => null;
  onDrop = () => null;
  onTabKeypress = () => null;
}
