
# jquery-tutorial

A tutorial in several lessons to learn [jQuery](https://jquery.com/) and it's parts.

The examples use [Material Design](https://materializecss.com) for styling. This makes the examples look better but it also has some relation to real-world projects where the markup needs to be written as the framework requires it.

Each lesson contains a link to the task itself and may provide several solutions. The solutions for each task are ranked. Although all solution will work, the first solution is the "worst" and the last solution is the "best".

### Table of contents

- [Preflight](#preflight)
  - [functions and arrow functions](#functions-and-arrow-functions)
  - [Event handlers](#event-handlers)
  - [`var` and `let`](#var-and-let)
- [Lesson 1](#lesson-1)
  - [Get to the code](#get-to-the-code)

## Preflight

Some short things before we start with the actual tutorial.

### [functions and arrow functions](https://codepen.io/mulithemuli/pen/yLBaMjY)

A short difference between functions and [arrow functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions) in JavaScript in relation to jQuery.

When functions are used in jQuery for event handlers jQuery uses the `this` keyword for the current element in the collection of elements.

    $('button').on('click', function() {
      console.log(this);
      // prints the current button when clicked.
    }

This would print the clicked button node.

What if we replace the function with an arrow function?

    $('button').on('click', () => console.log(this));
    // prints window … wait, what …?

We see one thing in the syntax at first sight: we do not need the curly braces when using a single statement in the arrow function.

But since arrow functions have no `this` the click will print the Window node since it is the this from the outer scope (in that example).

So how to fix this? Depends …

- Event handlers have the event as argument which contains the originating element.
- jQuery functions like [`.each()`](https://api.jquery.com/each/) will pass the element to the function.

Event Handler

    $('button').on('click', e => console.log(e.currentTarget));
    // same as with the function (see that a single argument does not require braces?)

.each()

    $('button').each((i, element) => console.log(element));
    // the first argument is the counter and the second argument is the element

How to translate between plain functions and arrow functions? We never use `this` in arrow functions but pass the element as an function argument. As seen above:
- In event handlers we can use `e.currentTarget` from the event attribute
- Iterations will pass the element as an argument

In the following lessons we will use the arrow functions. But after this chapter it is easy to extrapolate and use functions for legacy applications, right?

### Event handlers

In the following tutorials we will bind the event handlers with the jQuery [`.on()`](https://api.jquery.com/on/) function. But there is a shorter way to bind these event handlers for the common events.

    $('button').on('click', () => console.log('do something'));

can be written as

    $('button').click(() => console.log('do something'));

jQuery states in its [.click() documentation](https://api.jquery.com/click/) that this is 
> a shortcut for `.on( "click", handler )`

So why do we use the first variant?

- We can add a namespace to the event – like `'click.justMyNamespace'`.
This can come in handy when using jQuery [`.off()`](https://api.jquery.com/off/) function to just remove specific events
- The `.click()` function is defined by jQuery. Which means we cannot minify the name of this function called. But when using the name of the function it can be stored in a constant. The name of the constant can be minified and so we reduce the amount of characters in our script
- With `.on()` we can delegate events to specific elements inside a specific context. But this will be covered in an extra lesson later on

### `var` and `let`

The tutorials will make use of the `let` keyword to store local variables.

Unfortunately `let` is not supported in IE so far. To read more about the differences try [this excellent MDN page](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let).

If you need to support IE, it is probably safe to replace `let` with `var`. <small>And cope with the unexpected 😈</small>

## Lesson 1

Write a script with jQuery which takes the entered text and prints it in the DIV below.

Covered in this Lesson
- jQuery Selectors
- jQuery Event handling
- basic DOM manipulation

It is allowed to add tags, IDs or classes. Although the existing ones must be preserved.
The solution is possible without doing that.

An explanation is attached to each solution.

The solutions of the first lesson are implemented with good ol' functions for IE support. But there are

### Get to the code

- [Task](https://codepen.io/mulithemuli/pen/JjPREzX)
- [Solution #1](https://codepen.io/mulithemuli/pen/yLBaMem)
- Solution #2
- Solution #3
