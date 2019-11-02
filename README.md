
# jquery-tutorial

A tutorial in several lessons to learn [jQuery](https://jquery.com/) and it's parts.

The examples use [Material Design](https://materializecss.com) for styling. This makes the examples look better but it also has some relation to real-world projects where the markup needs to be written as the framework requires it.

Each lesson contains a link to the task itself and may provide several solutions. The lessons will remove comments from previous lessons to be more readable. Each solution has an explanation why this approach has been chosen. Comments of previous solutions will be removed in the upcoming tasks and solutions.

### Table of contents

- [Preflight](#preflight)
  - [functions and arrow functions](#functions-and-arrow-functions)
  - [Event handlers](#event-handlers)
  - [`var` and `let`](#var-and-let)
  - [anonymous self calling functions](#anonymous-self-calling-functions)
  - [event delegation](#event-delegation)
- [Chapter one – basics](#chapter-one--basics)
  - [Lesson 1 – attaching the event handlers](#lesson-1--attaching-the-event-handlers)
   - [Lesson 2 – adding a counter](#lesson-2--adding-a-counter)
   - [Lesson 3 – improving the counter](#lesson-3--improving-the-counter)
   - [Lesson 4 – removing the buttons](#lesson-4--removing-the-buttons)
   - [Lesson 5 – reusability / marker class](#lesson-5--reusability--marker-class)
   - [Lesson 6 – reusability / only once](#lesson-6--reusability--only-once)
   - [Lesson 7 – making a jQuery plugin](#lesson-7--making-a-jquery-plugin)
- [Chapter two – tables](#chapter-two--tables)
  - [Lesson 1 – creating the table](#lesson-1--creating-the-table)
  - [Lesson 2 – enabling the inputs](#lesson-2--enabling-the-inputs)
  - [Lesson 3 – calculating the amount #1](#lesson-3--calculating-the-amount-1)
  - [Lesson 4 – calculating the amount #2](#lesson-4--calculating-the-amount-2)
  - [Lesson 5 – enabling the row checkboxes](#lesson-5--enabling-the-row-checkboxes)
  - [Lesson 6 – enabling the global checkbox](#lesson-6--enabling-the-global-checkbox)
 - [Chapter three – more tables](#chapter-three--more-tables)
	 - [Lesson 1 – group amounts](#lesson-1--group-amounts)

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

### `var`, `let` and `const`

The tutorials will make use of the `let` or `const` keyword to store local variables and constants.

Unfortunately `let` and `const` are not supported by IE so far. To read more about the differences try [this excellent MDN page for `let`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let) and [this one for `const`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const).

If you need to support IE, it is probably safe to replace `let` or `const` with `var`. <small>And cope with the unexpected 😈</small>

### Anonymous self calling functions

These are functions which are defined and called inline in the same place. One would ask: "why do I need them then?".

The answer to this question is simple: functions define their own namespace in javascript ("`closure scope`"). They as well have the advantage to allow variables to be passed. This allows us to be certain that a variable does not get changed inside the function if we do not change it ourselves.

    var foo = 'bar';
    var bar = function() {
      // do something
    };

will be declared on the global scope which would be the window most likely.
Hiding it inside an anonymous function won't do that. And the anonymous function itself is – anonymous and therefore not visible on the window scope as well.

    (function() {
      var foo = 'bar';
      var bar = function() {
        // do something
      };
    }());

Here the variables `foo` and `bar` are only known inside our anonymous function.

As said above arguments can be passed as well. We use this to protect our variables.

    (function($, undefined) {
      // do something
    }(jQuery));

In this example we use the shortcut `$` for jQuery. This prevents other plugins which might override the dollar variable. And we use `undefined` as a "variable" but not pass it as argument. So we can be sure that the keyword `undefined` is actually undefined. Why do we need the undefined part? Javascript allows some ugly things like `var undefined = 'foo';` where `undefined` becomes defined.

It is recommended to write every custom Javascript inside an anonymous function to not pollute the global scope and possibly get conflicts with other functions or variables with the same name. Everything which should be accessible from the window scope can be passed as argument.

    (function(myNamespace, undefined) {
      var text = 'yay';
      myNamespace.doStuff = () => console.log(text);
    }(window.myNamespace = window.myNamespace || {}));
    
    myNamespace.doStuff(); // writes 'yay' to the console
    console.log(myNamespace.text); // writes 'undefined' to the console since 'text' is not visible here.

What is done here is to pass the `myNamespace` object to the function. If `myNamespace` is not yet defined it will be defined by `window.myNamespace = window.myNamespace || {}` (the `or` does that). And the window will store the reference to our object.

### Event delegation

jQuery allows us to apply event handlers in multiple ways. The most common usage is to add them on specific elements

    <div id="container">
      <span>foo</span>
      <span>bar</span>
      <span>baz</span>
    </div>
    
    $('input', '#container').on('click', e => console.log($(e.currentTarget).text()));

The code above will apply the event handler to each of the `span` elements inside our container. This means that when we have many children the event handler will be added very many times. But we can also use

    $('#container').on('click', 'span', e => console.log($(e.currentTarget).text()));

to get the same result. With this solution the event handler will get attached only to the container and checks which element in it has caused the event. We reduce the event handlers attached and do not need to reattach events when the DOM inside the container has been changed.

## Chapter one – basics

In this chapter we well learn the basics of jQuery selectors and event handlers.
All the lessons are in a [CodePen collection](https://codepen.io/collection/AZEWGz/).

### Lesson 1 – attaching the event handlers

Comes in handy
- [Preflight / functions and arrow functions](#functions-and-arrow-functions)
- [Preflight / Event handlers](#event-handlers)

Write a script with jQuery which takes the entered text and prints it in a span below on button click.

Covered in this Lesson
- jQuery Selectors
- jQuery Event handling
- basic DOM manipulation

It is allowed to add tags, IDs or classes. Although the existing ones must be preserved.
The solution is possible without doing that.

An explanation is attached to each solution.
In this tutorial the solutions are ranked. Although all solutions will work, the first solution is the "worst" and the last solution is the "best". This has been done to provide the approach to the solution. Further lessons will base on the third solution.

#### Get to the code

- [Task – attaching the event handlers](https://codepen.io/mulithemuli/pen/JjPREzX)
- [Solution #1](https://codepen.io/mulithemuli/pen/yLBaMem)
- [Solution #2](https://codepen.io/mulithemuli/pen/pozEPGd)
- [Solution #3](https://codepen.io/mulithemuli/pen/WNeGOxX)

### Lesson 2 – adding a counter

Print the number of times the button has been clicked to the bottom of the page in a specified container.

Covered in this lesson
- Using local variables
- basic DOM manipulation

The area where the number of times clicked is defined. Local variable storage in the script has been reduced to a minimum.

#### Get to the code

- [Task – adding the counter](https://codepen.io/mulithemuli/pen/WNeGOaK)
- [Solution](https://codepen.io/mulithemuli/pen/bGbwROK)

### Lesson 3 – improving the counter

Only updating the number of counts when the text actually has changed.

Covered in this lesson
- typesafe comparisons

The change will be determined as previously but we need to check if the text has been changed.

#### Get to the code

- [Task – improving the counter](https://codepen.io/mulithemuli/pen/vYBXZMZ)
- [Solution](https://codepen.io/mulithemuli/pen/VwZKWOp)

### Lesson 4 – removing the buttons

The buttons are useful but not necessarily relevant to every user. We would like to hide (but not remove) the buttons and delegate the change of an input to the click of the button.

Covered in this lesson
- event delegation
- jQuery DOM manipulation

When JavaScript is active we would like to remove the button from the view but trigger its click action when the input has been changed.

#### Get to the code

- [Task – removing the buttons](https://codepen.io/mulithemuli/pen/VwZKWOp) (same as the solution from lesson 3)
- [Solution](https://codepen.io/mulithemuli/pen/XWrjayp)

### Lesson 5 – reusability / marker class

Comes in handy
- [Preflight / functions and arrow functions](#functions-and-arrow-functions)

Currently every button will be selected. It either does something since the container matches or it does nothing when the container does not contain the correct elements. So we would like to add some marker class to take control if the delegation and action should be added or not.

Covered in this lesson
- marker classes
- event delegation
- jQuery [`.each()`](https://api.jquery.com/each/) function

#### Get to the code

- [Task – reusability / marker class](https://codepen.io/mulithemuli/pen/KKPgjeB)
- [Solution](https://codepen.io/mulithemuli/pen/NWKRZOY)

### Lesson 6 – reusability / only once

We can now select specific sections of the page to be handled as we like. But what if the DOM gets updated by an event like an AJAX call? The new DOM should get the same event handling as the other parts but the existing parts should not get the same events attached twice.

Covered in this lesson
- remember marker classes
- using the jQuery [`.not()`](https://api.jquery.com/not/) filter

#### Get to the code

- [Task – reusability / only once](https://codepen.io/mulithemuli/pen/ExYgqXK)
- [Solution #1](https://codepen.io/mulithemuli/pen/xxKEvyd) (incomplete)
- [Solution #2](https://codepen.io/mulithemuli/pen/wvwowra)

### Lesson 7 – making a jQuery plugin

Comes in handy
- [Preflight / anonymous self calling functions](#anonymous-self-calling-functions)

Is it a solution which can be used by more than just us? To make it more convenient for the users we would like to create a jQuery plugin which does all this covered before.
This is a very basic jQuery plugin without options or methods to call. It just explains the basics. Making more advanced plugins will be covered in later lessons.

Covered in this lesson
- basic jQuery Plugin creation
- anonymous self calling functions

#### Get to the code

- [Task – making a jQuery plugin](https://codepen.io/mulithemuli/pen/ZEzBzPv)
- [Solution](https://codepen.io/mulithemuli/pen/OJLbLGM)

## Chapter two – tables

In this chapter we will create a table which supports some click actions to modify inputs.
The table itself has one column which contains a table itself. Each of the rows can be enabled for editing by a checkbox. There are additional checkboxes which allow the selection of all subtable entries in one row and one checkbox to enable all rows of the table and subtable.

### Lesson 1 – creating the table

This lesson has no task. It just shows how we create the table.

We pretend that the server sends the inputs enabled but we want to enable them when the checkbox gets enabled. So the inputs need to be disabled at first.

Covered in this lesson
- creating the table as the server would provide it
- applying some Material Design table classes to it

#### Get to the code

- [Task and Solution – creating the table](https://codepen.io/mulithemuli/pen/vYByEYm)

### Lesson 2 – enabling the inputs

Comes in handy
- [Preflight / event delegation](#event-delegation)

When the checkbox of the inner table is enabled we want to enable the input field and write the amount of the row to it. This solution uses the event delegation to add the event listener not to every checkbox but only once to the table and delegate the event to the changed checkbox.

Covered in this lesson
- Performing actions on checkbox changes
- Reading and writing values
- Event delegation

#### Get to the code

- [Task – enable the input fields](https://codepen.io/mulithemuli/pen/WNeovwb)
- [Solution](https://codepen.io/mulithemuli/pen/gOYLpry)

### Lesson 3 – calculating the amount #1

When the input gets enabled or disabled we have to update the total amount which is displayed above the table. Disclaimer: we use the German notation for numbers.

We will use [`Intl.NumberFormat`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NumberFormat) to format the numbers. The input type is still text as some browsers or frameworks can't handle other types. But there are other Javascript plugins to constrain the input of some fields which could be applied here as well.

Regular expressions will be used here to replace some characters before the calculation will be made. [RegEx Pal](https://www.regexpal.com/) is a good page to test the expressions.

Covered in this lesson
- handling change events (for the checkboxes)
- formatting inputs with RegEx
- formatting numbers with `Intl.NumberFormat`
- calculations

#### Get to the code

- [Task – calculating amounts](https://codepen.io/mulithemuli/pen/BaBppVp)
- [Solution](https://codepen.io/mulithemuli/pen/ZEzLLRR)

### Lesson 4 – calculating the amount #2

The total amount gets updated when we change the checkbox. But when the input gets changed nothing happens. We would like to add a handler which removes the format from the numbers in the inputs when focused. After the change has been made the number in the input should be formatted again. Disclaimer: we still use the German notation for numbers.

The calculation should be performed on every change but invalid inputs (like with letters) should be ignored in the calculation (as if the input is zero).

Covered in this lesson
- handling change events (for the inputs)
- modify values on actions
- formatting numbers with RegEx
- formatting numbers with `Intl.NumberFormat`

#### Get to the code

- [Task – calculating amounts with user inputs](https://codepen.io/mulithemuli/pen/LYPxWVV)
- [Solution](https://codepen.io/mulithemuli/pen/YzKNZXW)

### Lesson 5 – enabling the row checkboxes

As for now we have only focused on the innermost checkboxes and amounts. Now we would like to enable or disable the entire inner table when the row checkbox is changed.

When one of the innermost checkboxes is enabled the row checkbox should get checked as well. And when the row checkbox is checked every checkbox inside the row should be checked. If it is disabled everything inside should be disabled.

When the last inner checkbox becomes disabled the row checkbox needs to be disabled as well. Of course the total amount should be calculated here as well.

Covered in this lesson
- event delegation
- triggering events

#### Get to the code

- [Task – handling row checkbox changes](https://codepen.io/mulithemuli/pen/xxKgqpZ)
- [Solution](https://codepen.io/mulithemuli/pen/gOYgmoo)

### Lesson 6 – enabling the global checkbox

Same task as in lesson 5 but now for the global checkbox.

Since some of the functions will be used multiple times we would like to store them in variables to define them only once.

Covered in this lesson
- event delegation
- triggering events
- refactoring to reduce code duplication

#### Get to the code

- [Task – handling the global checkbox](https://codepen.io/mulithemuli/pen/gOYgmNK)
- [Solution](https://codepen.io/mulithemuli/pen/xxKgqvg)

## Chapter three – more tables

In this chapter we will do some more stuff with the table.

### Lesson 1 – group amounts

Based on the selected values in the table we want to display them in groups beneath.
We already have declared the variables to their proper types (`let` and `const`). The amount table has been updated and now includes an extra column which classifies the amount by a custom type.
You can play around with the given table and add other types of amounts to create a larger variety of examples. 

Covered in this lesson
- Creating new DOM elements and adding them
- Find specific values by DOM traversal
- Grouping and ordering these values

#### Get to the code

- [Task – create the grouped table](https://codepen.io/mulithemuli/pen/ExxoYMP)
- [Solution](https://codepen.io/mulithemuli/pen/LYYePwy)
