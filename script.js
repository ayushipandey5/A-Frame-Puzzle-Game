// var scene = document.querySelector("a-scene");
// if(scene.hasLoaded) {
//     text();
//   } else {
//     scene.addEventListener('loaded', text);
// }
AFRAME.registerComponent('listener-1', {
        update: function(){
            //add behaviour for mouse enter (or gaze enter)
            this.el.addEventListener('mouseenter', function (evt) {
                var text1 = document.querySelector('#text1');  
                text1.setAttribute('troika-text',"value:START; color:#540D6E;fontSize : 1.3;font: /Fonts/outrun_future/Outrun_future.otf");                
            });
            this.el.addEventListener('mouseleave', function (evt) {
                var text1 = document.querySelector('#text1');  
                text1.setAttribute('troika-text',"value:START; color:#000000;fontSize : 1.3;font: /Fonts/outrun_future/Outrun_future.otf");                
            });
            this.el.addEventListener('click', function (evt) {
                document.location.href = "index.html";               
            });

        }
});

AFRAME.registerComponent('listener-3', {
    update: function(){
        //add behaviour for mouse enter (or gaze enter)
        this.el.addEventListener('mouseenter', function (evt) {
            var text3 = document.querySelector('#text3');  
            text3.setAttribute('troika-text',"value:HOW TO PLAY; color:#540D6E;fontSize : 1.3;font: /Fonts/outrun_future/Outrun_future.otf");
            var instructions = document.querySelector('#instructions');
            var howtoplaythisgame = document.querySelector("#howtoplaythisgame");
            howtoplaythisgame.setAttribute("visible","true");
            instructions.setAttribute("visible","true");
            var text1 = document.querySelector('#text1');
            text1.setAttribute("visible","false");
        });
        this.el.addEventListener('mouseleave', function (evt) {
            var text3 = document.querySelector('#text3');  
            text3.setAttribute('troika-text',"value:HOW TO PLAY; color:#000000;fontSize : 1.3;font: /Fonts/outrun_future/Outrun_future.otf");
            var instructions = document.querySelector('#instructions');
            var howtoplaythisgame = document.querySelector("#howtoplaythisgame");
            howtoplaythisgame.setAttribute("visible","false");  
            instructions.setAttribute("visible","false");    
            var text1 = document.querySelector('#text1');
            text1.setAttribute("visible","true");
        });
    }
});

AFRAME.registerComponent('trigger', {
    init: function () {
        var pp = document.querySelector('#rig');
        pp.setAttribute('animation',"property: position; to: 11 3.5 -12.5; dur: 4000; easing: easeInOutCubic;");
      setTimeout(() => {
        var cam_car = document.querySelector('#cam_car');
        cam_car.setAttribute('animation', "property: position; delay: 5000; to: -3.5 -0.15 -6.5; dur: 4500; easing: linear;")
      }, 300);
    }
  });

// AFRAME.registerComponent('level1', {
//     init: function(){
//         this.el.addEventListener('mouseenter', function (evt) {
//             var pedestal = document.querySelector('#pedestal-1');
//             pedestal.emit('fallclick');
//             var rig = document.querySelector('#rig');
//             rig.emit('fallclick');
//             rig.emit('level2');
//             var pedestal2 = document.querySelector('#pedestal-2');
//             pedestal2.setAttribute('visible','true');
//             var road2 = document.querySelectorAll('.road-2');
//             for (var i=0; i < road2.length; i++) {
//                 road2[i].setAttribute('visible','true');
//             }
//         });
//     }
// });
