# This is a CUSTOM version. IT WON'T WORK FOR YOUR DATA!

Visit the original circlepackeR from jeromefroe to get the working one:  

R htmlwidget for circle packing visualization, for more information please visit the [main page](http://jeromefroe.github.io/circlepackeR/).

**Changes and compatibility in relation to the original**  
This version of circlepacker uses D3.js version 4.9.1 instead of 3.5.6. This change was made for single children to also have a padding in relation to their parents. Which was not available in the previous one.

**The JSON is expected to have the following data:**  
*fill: Whith the hex color of the children.
*title: A text string for each children to be displayed on hovering
*biblio: A text string for each children to be displayed on hovering in a second line.
