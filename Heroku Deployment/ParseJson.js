carCoords = [-3.5,- 0.15,- 6.5];
startPos = [-3.5, 3, -16];
submitEnable = true;
//letterSelectPos = [-3.5, 0.3, -14];
increment = 1.5;
letterscaleFactor = 1;
textGeometryString = "font:Fonts/helvetiker_regular.typeface.json;height:0;size:1;style:italic;weight:bold;value:";
apiUrl = "https://jumble-bumbleapi.herokuapp.com/level";
levelTextAttrib = "bevelEnabled:true;bevelSize:0.04;bevelThickness:0.04;curveSegments:1;font:Fonts/exo2BlackItalic.typeface.json;height:0;size:1;style:italic;weight:bold;value:";
scoreAwardedText = "font:Fonts/helvetiker_regular.typeface.json;height:0;size:0.5;style:italic;weight:bold;value:yey ... u've got [score]";
scoreStaticText = "value: SCORE \n [score];\
color: #ffffff;\
shader: msdf;\
opacity: 0.9;\
align: center;\
wrapCount: 40;\
font:https://raw.githubusercontent.com/etiennepinchon/aframe-fonts/master/fonts/montserrat/Montserrat-Regular.json";
levelText = "LEVEL  ";
currentLevel = 1;
scaleFactor = 0.1;
counter = 1;
startWordPos = [-3.5, 0.3, -14];
levelthreshhold = 2;
wordIncrement = 1.5;
letterIndex = 1;
wordCounter = 0;
scoreThreshhold = 10;
i = 0;
var arr = [];
var objArr = [];
var wordArr = [];
var submitWord = "";
var gameScore = 0;
var choosenWords = [];


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
function ResetCoOrdinateReference()
{
    startPos = [carCoords[0], carCoords[1] + 3.15, carCoords[2] - 9.5];
    console.log("Start Pos" +startPos);
    level = document.querySelector('#level-text');
    levelCoords = [carCoords[0] - 6.5, carCoords[1] + 1.35, carCoords[2] - 3.5];
    level.setAttribute('position', { x: levelCoords[0], y: levelCoords[1], z: levelCoords[2] });
    
    
    fireRing = document.querySelector("#fire-ring");
    fireRingCoords = [carCoords[0] + 13.5, carCoords[1] + 1.65, carCoords[2] - 4.5];
    fireRing.setAttribute('position', { x: fireRingCoords[0], y: fireRingCoords[1], z: fireRingCoords[2] });
    
    
    submitText = document.querySelector("#submit-text");
    submitTextCoords = [carCoords[0] + 4, carCoords[1] + 7.15, carCoords[2] - 9.5];
    submitText.setAttribute('position', { x: submitTextCoords[0], y: submitTextCoords[1], z: submitTextCoords[2] });


    clearbutton = document.querySelector("#clear-button");
    clearbutton.setAttribute('position', { x: carCoords[0], y: carCoords[1] + 7.15 , z: carCoords[2] - 9.5 });

    wrongWord = document.querySelector("#wrong-word");
    wrongWord.setAttribute('position', { x: carCoords[0], y: carCoords[1] + 9.15, z: carCoords[2] - 9.5});

    wrongWord = document.querySelector("#right-word");
    wrongWord.setAttribute('position', { x: carCoords[0], y: carCoords[1] + 9.15, z: carCoords[2] - 9.5 });

    choosenWord = document.querySelector("#already-choosen-word");
    choosenWord.setAttribute('position', { x: carCoords[0] - 1, y: carCoords[1] + 9.15, z: carCoords[2] - 9.5 });
    

}
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

function AnimateNextLevel()
{
    var pedestal = document.querySelector('#pedestal-1');
    pedestal.emit('fallclick');
    var rig = document.querySelector('#rig');
    rig.emit('fallclick');
    rig.emit('level2');
    var pedestal2 = document.querySelector('#pedestal-2');
    pedestal2.setAttribute('visible', 'true');
    var road2 = document.querySelectorAll('.road-2');
    for (var i = 0; i < road2.length; i++)
    {
        road2[i].setAttribute('visible', 'true');
    }
    setTimeout(() => {
        RenderLevel2();
    }, 7000);
   
}

function RenderLevel2()
{
    startPos = [-4, 13, -57];
    carCoords = [-3.5, 11.4, -53.5];
    ResetCoOrdinateReference();
    choosenWords = [];
    currentLevel = currentLevel + 1;
    counter = 1;
    document.querySelector("#display-letters").innerHTML = '';
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
    submitEnable = true;
    // gameScore = 0;
}

function IncrementLevel()
{
    var el = document.querySelector("#level-word");
    el.setAttribute('visible', true);
    setTimeout(() => {
        el.setAttribute('visible', false);
        AnimateNextLevel();
    }, 5000);
}

AFRAME.registerComponent('on-click-letter', {
    update: function(){
        this.el.addEventListener('click', function (evt) {
            // this.setAttribute('visible',false);
            this.setAttribute('position',{x:carCoords[0] - i, y:carCoords[1] + 0.45, z:carCoords[2] - 7.5});
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
                ele.setAttribute('position',{x:arr[j], y:carCoords[1] + 3.15, z: carCoords[2] - 9.5});
            }
        });
    }
});
function UpdateScore(score)
{
    var el = document.querySelector("#score-text");
    scoreTextModified = scoreStaticText.replace("[score]", score);
    el.setAttribute("text", scoreTextModified);
}
AFRAME.registerComponent('on-click-submit',{
    update: function(){
        this.el.addEventListener('click', function (evt)
        {
            if (submitEnable) {
                submitEnable = false;
                submitWord = "";
                for (j = 1; j < wordArr.length; j++) {
                    var ele = document.getElementById(wordArr[j]).getAttribute("text-geometry");
                    var val = ele.value;
                    submitWord = submitWord.concat(val);
                }
                wordArr = [];
                letterIndex = 1;
                flag = 0;
                score = 0;
                for (x in objArr) {
                    var temp = objArr[x]["word"].toUpperCase();
                    if (temp === submitWord.toUpperCase()) {
                        score = objArr[x]["score"];
                        flag = 1;
                        break;
                    }
                }
                if (flag == 1) {
                    for (i in choosenWords)
                    {
                        if (choosenWords[i].toUpperCase() === submitWord.toUpperCase())
                        {
                            choosenObj = document.querySelector("#already-choosen-word");
                            choosenObj.setAttribute('visible', true);
                            setTimeout(() => {
                                choosenObj.setAttribute('visible', false);
                                submitEnable = true;
                            }, 5000);
                            el = document.querySelector("#clear-button");
                            el.click();
                            return;
                        }
                    }


                    choosenWords.push(submitWord);
                    gameScore += parseInt(score);
                    var rightel = document.querySelector("#right-word");
                    UpdateScore(gameScore);
                    rightText = scoreAwardedText.replace("[score]", score);
                    if (gameScore > scoreThreshhold && currentLevel < 2) {
                        el = document.querySelector("#clear-button");
                        el.click();
                        IncrementLevel();
                    }
                    else {
                        rightel.setAttribute('text-geometry', rightText);
                        rightel.setAttribute('visible', true);
                        setTimeout(() => {
                            rightel.setAttribute('visible', false);
                            submitEnable = true;
                        }, 5000);
                       
                        el = document.querySelector("#clear-button");
                        el.click();
                    }
                }
                else {
                    var time = 0;
                    var el = document.querySelector("#wrong-word");
                    el.setAttribute('visible', true);
                    setTimeout(() => {
                        el.setAttribute('visible', false);
                        submitEnable = true;
                    }, 5000);
                    el.click();
                }
                // else{
                //     // console.log(submitWord);
                //     // console.log("invalid");
                // }
            }
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

function ClearLetters()
{
    var el = document.querySelector("#display-letters");
    el.innerHTML = '';
}

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
    ResetCoOrdinateReference();
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
    //ClearLetters()
});