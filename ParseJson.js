startPos = [-3.5, 2, -16];
increment = 1.5;
letterscaleFactor = 1;
textGeometryString = "font:Fonts/helvetiker_regular.typeface.json;height:0;size:1;style:italic;weight:bold;value:";
apiUrl = "http://localhost:5000/level";
levelTextAttrib = "bevelEnabled:true;bevelSize:0.04;bevelThickness:0.04;curveSegments:1;font:Fonts/exo2BlackItalic.typeface.json;height:0;size:1;style:italic;weight:bold;value:";
levelText = "LEVEL  ";
currentLevel = 1;
scaleFactor = 0.1;
function ShowLetter(letter,position)
{
    
    console.log(letter);
    posx = startPos[0] + (position - 1) * increment;
    posy = startPos[1];
    posz = startPos[2];
    base = document.createElement('a-entity');
    base.setAttribute("position", { x: posx, y: posy, z: posz });
    base.setAttribute("text-geometry", textGeometryString + letter);
    base.setAttribute("material", "shader:flat;color:white")
    base.setAttribute("visible", true);
    return base;
}
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
    UpdateLevelText(currentLevel);
    //console.log(jsonString);
    //var objects = jQuery.parseJSON(jsonString);
    var numberOfLetters = objects["JumbleLetters"].length;
    if (numberOfLetters % 2 == 0) {
        startPos[0] = - ((numberOfLetters * increment) / 2);
        console.log(startPos);
    }
    else {
        startPos[0] = - increment * (numberOfLetters / 2);
        console.log(startPos);
    }
    for(var i = 0; i < objects["JumbleLetters"].length; i++)
    {
        console.log(objects["JumbleLetters"][i]);
        CreateLetter(objects["JumbleLetters"][i].toUpperCase(), i + 1);
    }
});




