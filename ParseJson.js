startPos = [-3.5, 3, -16];
increment = 1.5;
letterscaleFactor = 1;
textGeometryString = "font:Fonts/helvetiker_regular.typeface.json;height:0;size:1;style:italic;weight:bold;value:";
apiUrl = "http://localhost:5000/level";
levelTextAttrib = "bevelEnabled:true;bevelSize:0.04;bevelThickness:0.04;curveSegments:1;font:Fonts/exo2BlackItalic.typeface.json;height:0;size:1;style:italic;weight:bold;value:";
levelText = "LEVEL  ";
currentLevel = 1;
scaleFactor = 0.1;
counter = 1;
startWordPos = [-3.5 , 0.3 ,-14];
wordIncrement = 1.5;
letterIndex = 1;
wordCounter = 0;
i = 0;
var arr = [];
var objArr = [];
var wordArr = [];
var submitWord = "";
var gameScore = 0;

// function onClickLetter(letter,position)
// {
//     console.log(letter);
//     wposx = startWordPos[0];
//     wposy = startWordPos[1];
//     wposz = startWordPos[2];
//     letterIndex = letterIndex + 1;
//     base = document.createElement('a-entity');
//     base.setAttribute("position", { x: posx, y: posy, z: posz });
//     base.setAttribute("text-geometry", textGeometryString + letter);
//     base.setAttribute("material", "shader:flat;color:white")
//     base.setAttribute("visible", true);
//     base.setAttribute("id",wordCounter);
//     wordCounter = wordCounter + 1;
//     base.setAttribute("event-set__Click","visible: false");

//     return base;
// }

function ShowLetter(letter,position)
{
    
    console.log(letter);
    posx = startPos[0] + (position - 1) * increment;
    posy = startPos[1];
    posz = startPos[2];
    wposx = startWordPos[0] ;
    wposy = startWordPos[1];
    wposz = startWordPos[2];
    
    base = document.createElement('a-entity');
    // base.setAttribute("class","jumbleSelector");
    base.setAttribute("position", { x: posx, y: posy, z: posz });
    base.setAttribute("text-geometry", textGeometryString + letter);
    base.setAttribute("material", "shader:flat;color:white")
    base.setAttribute("visible", true);
    base.setAttribute("id",counter);
    arr[counter] = posx;
    counter = counter + 1;
    //base.setAttribute("event-set__click","visible:true; position : " + positionFunction()   + " " + wposy + " " + wposz );
    base.setAttribute("on-click-letter","");
    return base;
}

AFRAME.registerComponent('on-click-letter', {
    update: function(){
        this.el.addEventListener('click', function (evt) {
            // this.setAttribute('visible',false);
            this.setAttribute('position',{x:-3.5 - i, y:0.3, z:-14});
            wordArr[letterIndex] = this.getAttribute("id");
            letterIndex += 1;
            i -= increment;
        });
    }
});


AFRAME.registerComponent('on-click-clear',{
    update: function(){
        this.el.addEventListener('click', function (evt) {
            i = 0;
            for(j=1;j < arr.length;j++){
                var ele = document.getElementById(j);
                ele.setAttribute('position',{x:arr[j], y:3, z:-16});
            }
        });
    }
});

AFRAME.registerComponent('on-click-submit',{
    update: function(){
        this.el.addEventListener('click', function (evt) {
            submitWord = "";
            for(j=1 ; j<wordArr.length;j++){
                var ele = document.getElementById(wordArr[j]).getAttribute("text-geometry");
                var val = ele.value;
                submitWord = submitWord.concat(val);
            }
            wordArr = [];
            letterIndex = 1;
            flag = 0;
            score = 0;
            for(x in objArr){
                var temp = objArr[x]["word"].toUpperCase();
                if( temp === submitWord){
                    score = objArr[x]["score"];
                    flag = 1;
                }
            }
            if (flag == 1){
                gameScore += parseInt(score);
                console.log(gameScore);
            }
            // else{
            //     // console.log(submitWord);
            //     // console.log("invalid");
            // }
        });
    }
});


// AFRAME.registerComponent('on-click-letter', {
//     update: function(){
//         //add behaviour for mouse enter (or gaze enter)
//         this.el.addEventListener('mouseenter', function (evt) {
//             var text3 = document.querySelector('#text3');  
//             console.log(this);
//             this.el.setAttribute('position',{x:-2.5 , y:0.3, z:-14});
//         });
//         this.el.addEventListener('mouseleave', function (evt) {
//             var text3 = document.querySelector('#text3');  
//             text3.setAttribute('troika-text',"value:HELP; color:#000000;fontSize : 1.3;font: /Fonts/outrun_future/Outrun_future.otf");                
//         });
//     }
// });

// function positionFunction(){
//     var pos;
//     var count = 0;
//     var el = document.getElementById(i); 
//     for(i = 1;i < 11; i++){
//         if(( != null) && (document.getElementById(i).position.y == 0.3)){
//             count += 1;
//         }
//     }
//     pos = -2.5 + increment*count;
//     return pos;
// }



// var class_selector = document.getElementsByClassName("jumbleSelector");
// console.log(class_selector.id);
// class_selector.onClick = function() {myFunction()};

// function myFunction() {
//     console.log("clicked");
//}


// AFRAME.registerComponent('letters',{
//     init:function(){
//         // let base = document.createElement('#letter-c');
//         // base.setAttribute('position',"-4 1 -7");
//         // //base.setAttribute('color', "red");
//         // base.setAttribute('obj-model','obj: #letter-c-obj; mtl: #letter-c-mtl')
//         // console.log(this.data);
//         // //sphere.setAttribute('color',this.data.sphereColor);
//         // this.el.appendChild(base);
//     }
// });

// AFRAME.registerComponent('on-click-letter',{

//     init : function(){
//         document.addEventListener('click',function(){
//         el.visible = false;
//     });
// }
// });



function CreateLetter(letter, position)
{
    console.log(letter);
    console.log(position);
    //letterId = letterIdentifier + letter;
    var el = document.querySelector("#display-letters");
    console.log(el);
    //el.setAttribute('obj-model', { obj: objPath + letter + ".obj" })
    letterElement = ShowLetter(letter, position);
    console.log(letterElement);
    el.appendChild(letterElement);
}

function GetJsonFromApi(level)
{
    response = "";
        $.ajax({
            type: 'GET',
            dataType: 'json',
            async: false,
            cache : false,
            url: apiUrl + level,
            timeout: 5000,
             success: function(data, textStatus ){
                //console.log(data);
                response = data;
             },
            fail: function (xhr, textStatus, errorThrown)
            {
                console.log('request failed');
            },
        });
    // return a;
    return response;
}
function UpdateLevelText(level)
{
    var el = document.querySelector("#level-text");
    el.setAttribute('text-geometry', levelTextAttrib + levelText + level);
    
}
$(document).ready(function ()
{
    //CreateLetter("a", 1);
    //CreateLetter("b", 2);
    //CreateLetter("b", 2);
    //CreateLetter("c", 3);
    //ShowLetter("a", 1);
    //ShowLetter("b", 2);
    var objects = GetJsonFromApi(currentLevel);
    objArr = objects["Words"];
    UpdateLevelText(currentLevel);
    //console.log(jsonString);
    //var objects = jQuery.parseJSON(jsonString);
    var numberOfLetters = objects["JumbleLetters"].length;
    if (numberOfLetters % 2 == 0) {
        startPos[0] = - ((numberOfLetters * increment) / 2);
        startWordPos[0] = - ((numberOfLetters * increment) / 2);
        console.log(startPos);
        console.log(startWordPos);
    }
    else {
        startPos[0] = - increment * (numberOfLetters / 2);
        startWordPos[0] = - increment * (numberOfLetters / 2);
        console.log(startPos);
        console.log(startWordPos);
    }
    for(var i = 0; i < objects["JumbleLetters"].length; i++)
    {
        console.log(objects["JumbleLetters"][i]);
        CreateLetter(objects["JumbleLetters"][i].toUpperCase(), i + 1);
    }
});




