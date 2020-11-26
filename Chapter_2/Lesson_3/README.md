# Lesson 3 – calculating the amount #1  
  
When the input gets enabled or disabled we have to update the total amount which is displayed above the table.
Disclaimer: we use the German notation for numbers.  
  
We will use
[`Intl.NumberFormat`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NumberFormat)
to format the numbers. The input type is still text as some browsers or frameworks can't handle other types. But there
are other Javascript plugins to constrain the input of some fields which could be applied here as well.  
  
Regular expressions will be used here to replace some characters before the calculation will be made.
[RegEx Pal](https://www.regexpal.com/) is a good page to test the expressions.  
  
## Covered in this lesson

- handling change events (for the checkboxes)  
- formatting inputs with RegEx  
- formatting numbers with `Intl.NumberFormat`  
- calculations  
  
## Get to the code  
  
- [Task – calculating amounts](https://codepen.io/mulithemuli/pen/BaBppVp)  
- [Solution](https://codepen.io/mulithemuli/pen/ZEzLLRR)  
