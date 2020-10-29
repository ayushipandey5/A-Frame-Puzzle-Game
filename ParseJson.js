startPos = [-4, 1, -7];
increment = 2;
letterscaleFactor = 1;
letterIdentifier = "#letter-";
scaleFactor = 0.1;
function ShowLetter(letter,position)
{
    letterId = letterIdentifier + letter;
    posx = startPos[0] + (position - 1) * increment;
    posy = startPos[1];
    posz = startPos[2];
    console.log(letterId);
    var el = document.querySelector(letterId);
    let scale = el.getAttribute("scale").clone() // clone the scale vector
    scale.multiplyScalar(scaleFactor);
    el.setAttribute("scale", scale);
    el.setAttribute("position", { x: posx, y: posy, z: posz });
    el.setAttribute("visible",true);
}
AFRAME.registerComponent('hello-world', {
    init: function () {
      console.log('Hello, World!');
    }
  });
$(document).ready(function ()
{
    ShowLetter("a", 1);
    ShowLetter("b", 2);
    var obj = jQuery.parseJSON( '{\
        "CurrentLevel": "2",\
        "PointsToNextLevel": "40",\
        "JumbledLetters": ["A", "N", "A", "G", "R", "A", "M"],\
        "TotalAnswers": "52",\
        "Words": [{\
            "word": "Alphabet",\
            "Score": "50"\
        }, {\
            "Word": "Aeroplane",\
            "Score": "46"\
        }, {\
            "Word": "Bet",\
            "Score": "30"\
        }]\
    }' );
    console.log()
});




