# Lesson 6 – reusability / only once

We can now select specific sections of the page to be handled as we like. But what if the DOM gets updated by an event like an AJAX call? The new DOM should get the same event handling as the other parts but the existing parts should not get the same events attached twice.

Covered in this lesson
- remember marker classes
- using the jQuery [`.not()`](https://api.jquery.com/not/) filter
