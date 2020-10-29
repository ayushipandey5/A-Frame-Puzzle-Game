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
        }
});

AFRAME.registerComponent('listener-2', {
    update: function(){
        //add behaviour for mouse enter (or gaze enter)
        this.el.addEventListener('mouseenter', function (evt) {
            var text2 = document.querySelector('#text2');  
            text2.setAttribute('troika-text',"value:OPTIONS; color:#540D6E;fontSize : 1.3;font: /Fonts/outrun_future/Outrun_future.otf");                
        });
        this.el.addEventListener('mouseleave', function (evt) {
            var text2 = document.querySelector('#text2');  
            text2.setAttribute('troika-text',"value:OPTIONS; color:#000000;fontSize : 1.3;font: /Fonts/outrun_future/Outrun_future.otf");                
        });
    }
});

AFRAME.registerComponent('listener-3', {
    update: function(){
        //add behaviour for mouse enter (or gaze enter)
        this.el.addEventListener('mouseenter', function (evt) {
            var text3 = document.querySelector('#text3');  
            text3.setAttribute('troika-text',"value:HELP; color:#540D6E;fontSize : 1.3;font: /Fonts/outrun_future/Outrun_future.otf");                
        });
        this.el.addEventListener('mouseleave', function (evt) {
            var text3 = document.querySelector('#text3');  
            text3.setAttribute('troika-text',"value:HELP; color:#000000;fontSize : 1.3;font: /Fonts/outrun_future/Outrun_future.otf");                
        });
    }
});
