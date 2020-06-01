var matching_object = {}
var condition_object = {}
var previous_card = undefined
var result_count = 0
var stopwatch_count = 0
var start_button = document.getElementsByClassName("round-button")[0]
var email_value = ""
var channel = "public"
// console.log(start_button)
// start_button.addEventListener("click", start_game.bind(this, start_button), false)
// start_button.addEventListener("touchstart mousedown", start_game.bind(this, start_button), false)
$(start_button).on("click touchstart", function() {
    // Do things]start_game
    start_game()
    return false;
  });

//Email validation.
function ValidateEmail(inputText){
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(inputText.value.match(mailformat)){
        // document.form1.text1.focus();
        return true;
    }
    else{
        alert("You have entered an invalid email address!");
        // document.form1.text1.focus();
        return false;
    }
}


function generate_cells(parent){
    for(var i=0; i < numberOfCells; i++){
        var newDiv = document.createElement('div');
        newDiv.id=i;
        newDiv.isFlip=true
        newDiv.isShown=false
        condition_object[newDiv.id]=newDiv.isFlip
        newDiv.className = 'cell';
        newDiv.setAttribute("data-cell", "");
        var newI = document.createElement('div');
        newI.className=sliced_icons[i];
        newDiv.appendChild(newI);
        parent.appendChild(newDiv);
        // newDiv.addEventListener("click", click_action.bind(this, newDiv), false)
        // newDiv.addEventListener("touchstart mousedown", click_action.bind(this, newDiv), false)
        //https://stackoverflow.com/questions/7018919/how-to-bind-touchstart-and-click-events-but-not-respond-to-both
    }
    document.getElementById("main").appendChild(parent);

}

function generate_board() {
    //hide the leaderboard
    var el = document.getElementById("table")
    el.style.display = "none"
    el.style.visibility = "hidden"


    var toAdd = document.getElementById('board');
    var shuffled_icons = icons.shuffle()
    
    document.documentElement.style.setProperty('--columns-size', numberOfColumns);


    //setting top margin based on number of columns for mobile and pc.

    document.documentElement.style.setProperty('--margin-top', marginValue);
    document.documentElement.style.setProperty('--margin-top-mobile', marginValueMobile);
    
    sliced_icons = shuffled_icons.slice(0, numberOfCells/2).concat(shuffled_icons.slice(0, numberOfCells/2)).shuffle()
    matching_object_temp = sliced_icons.getDuplicates();

    for (var key in matching_object_temp){
        matching_object[matching_object_temp[key][0]]=matching_object_temp[key][1]
        matching_object[matching_object_temp[key][1]]=matching_object_temp[key][0]
    }
    // console.log(matching_object);
    generate_cells(toAdd)
}

function generate_handler( card ) {
    return function(event) { 
        click_action(card);
        return false;
    };
}

function click_action(card){

    toggle_card(card)
    if(previous_card != undefined && previous_card.id == matching_object[card.id]){
        condition_object[card.id] = false
        condition_object[previous_card.id] = false
        previous_card.isFlip = false
        card.isFlip = false
        previous_card = undefined
        result_count += 2
    }
    else if(previous_card != undefined && previous_card.id != matching_object[card.id] && previous_card.id != card.id && condition_object[card.id]==true){
        previous_card.isFlip = true
        toggle_card(previous_card)
        previous_card = undefined
        toggle_card(card)
    }
    else if (previous_card == undefined && condition_object[card.id]==true){
        previous_card = card
        previous_card.isFlip = false
    }
    if (result_count == numberOfCells){
        game_end()
    }

}



function toggle_card(card){ 

    if (card.isFlip && card.isShown==true){
        icon = card.firstChild
        icon.style.setProperty('--animate-duration', animation_duration);    
        icon.classList.remove('animate__animated', animation_in);
        icon.classList.add('animate__animated', animation_out);
        icon.addEventListener('animationend', () => {
            icon.style.opacity = "0";
        });
        card.isShown=false;
    }
    else if(card.isFlip && card.isShown==false){
        icon = card.firstChild
        icon.style.setProperty('--animate-duration', animation_duration);    
        icon.classList.remove('animate__animated', animation_out);
        icon.classList.add('animate__animated', animation_in);
        icon.addEventListener('animationend', () => {
            icon.style.opacity = "1";
        });
        card.isShown=true;
    }

}

function toggle_board(){
    for(var i=0; i < numberOfCells; i++){
        el = document.getElementById(i)
        $(el).on("touchstart click  ",  generate_handler( el ));

        icon = el.firstChild
        icon.classList.remove('animate__animated', animation_in);
        icon.classList.add('animate__animated', animation_out);
    }
    setTimeout(function(){ start_clock(); }, animation_duration.slice(0, -1)*1000)
    var el = document.getElementsByClassName("clockcontainer")[0]
    el.style.webkitFilter = "blur(0px)";   
     
}

function display_scoreBoard(){

    var el = document.getElementsByClassName("board")[0]
    el.style.webkitFilter = "blur(25px)";
    ReadUserData(channel)

}

function game_end(){
    stop_clock() 
    name = email_value.split("@")[0]
    score = document.getElementById("minute").innerHTML+":"+document.getElementById("second").innerHTML+":"+document.getElementById("millisecond").innerHTML
    writeUserData(email_value, name, score, channel, display_scoreBoard)
}


function start_game(){

    if (ValidateEmail(email)){
        email_value = document.getElementById("email").value
        var el = document.getElementsByClassName("container")[0] ;
        while ( el.firstChild ) el.removeChild( el.firstChild );
        el.remove()


        var el = document.getElementsByClassName("board")[0]
        el.style.webkitFilter = "blur(0px)";
        // generate_board()

        setTimeout(function(){ toggle_board(); }, flashScreenTIme)
    }
}


generate_board()

