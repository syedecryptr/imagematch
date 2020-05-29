var matching_object = {}
var condition_object = {}
var previous_card = undefined
var result_count = 0
var start_button = document.getElementsByClassName("round-button")[0]
console.log(start_button)
start_button.addEventListener("click", start_game.bind(this, start_button), false)

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
        newDiv.addEventListener("click", click_action.bind(this, newDiv), false)
        document.body.appendChild(parent);
    }
}

function generate_board() {
    
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
    else if(previous_card != undefined && previous_card.id != matching_object[card.id] && previous_card.id != card.id){
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
        console.log("Game complete")
    }

}



function toggle_card(card){
    icon = card.firstChild
    icon.style.setProperty('--animate-duration', animation_duration);

    if (card.isFlip && card.isShown==true){
        icon.classList.remove('animate__animated', animation_in);
        icon.classList.add('animate__animated', animation_out);
        icon.addEventListener('animationend', () => {
            icon.style.opacity = "0";
        });
        card.isShown=false;
    }
    else if(card.isFlip && card.isShown==false){
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
        icon = el.firstChild
        icon.classList.remove('animate__animated', animation_in);
        icon.classList.add('animate__animated', animation_out);
        icon.addEventListener('animationend', () => {
            icon.style.opacity = "0";
        });
    }
}

function start_game(){


    var el = document.getElementsByClassName("container")[0] ;
    while ( el.firstChild ) el.removeChild( el.firstChild );
    el.remove()

    // var el = document.getElementsByClassName("board")[0] ;
    // while ( el.firstChild ) el.removeChild( el.firstChild );


    var el = document.getElementsByClassName("board")[0]
    el.style.webkitFilter = "blur(0px)";
    // generate_board()

    setTimeout(function(){ toggle_board(); }, flashScreenTIme)
}

generate_board()

