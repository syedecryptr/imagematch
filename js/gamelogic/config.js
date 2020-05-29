var numberOfColumns = 4
//setting total number of cells based on odd or even number of columns
if (numberOfColumns%2==0)
    var numberOfCells = numberOfColumns*numberOfColumns
else
    var numberOfCells = numberOfColumns*(numberOfColumns+1)

var animation_duration = '0.5s'
var animation_in = 'animate__flipInY'
var animation_out = 'animate__flipOutY'
var marginValueMobile =  Math.ceil(1/(6*numberOfColumns)*800)+"%";
var marginValue = Math.ceil(1/(6*numberOfColumns)*100)+"%"

//this time is in miliseconds
var flashScreenTIme=5000
