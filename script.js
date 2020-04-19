var progress=0;
var boss=0;

var view = document.getElementsByClassName("wrapper")[0];

x=document.documentElement.clientWidth/2-240;
y=document.documentElement.clientHeight/2-180;
view.style.left=""+x+"px";
view.style.top=""+y+"px";

function level(){
    if(mob.length==0) boss=0;
    if(boss==0) progress+=1;
    
    //white, grey
    if(progress%200==0 && progress<1100){
        createMob(480, Math.floor(Math.random() * 201)+80, progress, 0.5, function(px, py){
        color={};
        color.r=0;
        color.g=50;
        color.b=0;

        this.reload-=1;

        if(this.reload==0){
            var direction=aim(this.x, this.y, px, py);
            var rad=Math.sqrt(2)*this.size;
            createBullet(this.x+rad*Math.cos(direction*(Math.PI/180)),this.y+rad*Math.sin(direction*(Math.PI/180)), 360-direction, 3, 5, "mob", color);
            createBullet(this.x+rad*Math.cos(direction*(Math.PI/180)),this.y+rad*Math.sin(direction*(Math.PI/180)), 360-direction+3, 3, 5, "mob", color);
            createBullet(this.x+rad*Math.cos(direction*(Math.PI/180)),this.y+rad*Math.sin(direction*(Math.PI/180)), 360-direction-3, 3, 5, "mob", color);

            this.reload=30;
        }
    });
    }
    if(progress==1100){
        boss=1;
    }
    if(progress==1200 && boss==0){
        createMob(480, 180, 5000, 0, function(px, py){
        color={};
        color.r=0;
        color.g=0;
        color.b=50;

        this.reload-=1;

        if(this.reload==0){
            var direction=aim(this.x, this.y, px, py);
            var rad=Math.sqrt(2)*this.size;
            for(i=-20;i<=20;i+=2){
                createBullet(this.x+rad*Math.cos(direction*(Math.PI/180)),this.y+rad*Math.sin(direction*(Math.PI/180)), 360-direction+i, 7, 5, "mob", color);
            }
            
            if(this.numeric!=5){
                this.reload=5;
                this.numeric+=1;
            }else if(this.numeric==5){
                this.reload=70;
                this.numeric=0;
            }
        }
        
    },function(px, py){
        if(this.done==0){
            this.x-=1;
        }
        if(this.x==250){
            this.done=1;
        }
    }, 15, function(){this.numeric=0; this.done=0;});
        boss=1;
    }
    //black
    if(progress%350==0 && 1200<progress && progress<=2000){
        atk=function(px, py){
        color={};
        color.r=0;
        color.g=50;
        color.b=0;

        this.reload-=1;

        if(this.reload==0){
            var direction=aim(this.x, this.y, px, py);
            var rad=Math.sqrt(2)*this.size;
            createBullet(this.x+rad*Math.cos(direction*(Math.PI/180)),this.y+rad*Math.sin(direction*(Math.PI/180)), 360-direction, 8, 25, "mob", color);
            createBullet(this.x+rad*Math.cos(direction*(Math.PI/180)),this.y+rad*Math.sin(direction*(Math.PI/180)), 360-direction+1, 8, 25, "mob", color);
            createBullet(this.x+rad*Math.cos(direction*(Math.PI/180)),this.y+rad*Math.sin(direction*(Math.PI/180)), 360-direction-1, 8, 25, "mob", color);

            this.reload=30;
        }
    }
        walk=function(px, py){
        if(this.done==0){
            this.x-=1;
        }
        if(this.x==210+Math.floor(Math.random() * 61)){
            this.done=1;
        }else if(this.x==210){
            this.done=1;
        }
    }
        createMob(480, Math.floor(Math.random() * 61)+90, 900, 0,atk, walk,8,function(){this.done=0;});
        createMob(480, Math.floor(Math.random() * 61)+210, 900, 0,atk, walk,8,function(){this.done=0;});
    }
    //yellow
    if(progress%300==0 && 2000<progress && progress<=2600){
        atk=function(px, py){
        color={};
        color.r=0;
        color.g=50;
        color.b=0;

        this.reload-=1;

        if(this.reload==0){
            var direction=this.direction;
            var rad=Math.sqrt(2)*this.size;
            createBullet(this.x+rad*Math.cos(direction*(Math.PI/180)),this.y+rad*Math.sin(direction*(Math.PI/180)), 360-direction, 6, 15, "mob", color);
            createBullet(this.x+rad*Math.cos(direction*(Math.PI/180)),this.y+rad*Math.sin(direction*(Math.PI/180)), 360-direction+1, 6, 15, "mob", color);
            createBullet(this.x+rad*Math.cos(direction*(Math.PI/180)),this.y+rad*Math.sin(direction*(Math.PI/180)), 360-direction-1, 6, 15, "mob", color);

            this.reload=30;
        }
    }
        walk=function(px, py){
    var len = Math.sqrt((px-this.x)**2 + (py-this.y)**2);

    var direction=this.direction;

    s=this.speed;
    
    this.runTime-=1;
    if(this.runTime==0){
        if(this.form==0){
            this.form=1;
            this.runTime=30+Math.floor(Math.random() * 31);
            this.direction=aim(this.x, this.y, px, py);
        }else{
            this.form=0;
            this.runTime=20+Math.floor(Math.random() * 21);
        }
    }
            
    if(this.form==0) return 0;
            
    if(len>150){
        this.vx += s*0.2*Math.cos(direction*(Math.PI/180));
        this.vy += s*0.2*Math.sin(direction*(Math.PI/180));
    }else if(len>80){
        this.vx += s*0.15*Math.cos(direction*(Math.PI/180));
        this.vy += s*0.15*Math.sin(direction*(Math.PI/180));
    }else if(len>50){
        this.vx += s*0.1*Math.cos(direction*(Math.PI/180));
        this.vy += s*0.1*Math.sin(direction*(Math.PI/180));
    }else{
        //none
    }
}
        createMob(480,Math.floor(Math.random() * 61)+60, 1500, 1.2, atk, walk,5,function(){this.form=0; this.runTime=10; this.direction=180;},);
        createMob(480,Math.floor(Math.random() * 61)+150, 1500, 1.2, atk, walk,5,function(){this.form=0; this.runTime=10; this.direction=180;},);
        createMob(480,Math.floor(Math.random() * 61)+240, 1500, 1.2, atk, walk,5,function(){this.form=0; this.runTime=10; this.direction=180;},);
    }
    if((progress%400==0 && 2600<progress && progress<=3400)
      ||(progress%300==0 && 3400<progress && progress<4500)){
        atk=function(px, py){
        color={};
        color.r=0;
        color.g=50;
        color.b=0;

        this.reload-=1;

        if(this.reload==0){
            var direction=this.direction;
            var rad=Math.sqrt(2)*this.size;
            createBullet(this.x+rad*Math.cos(direction*(Math.PI/180)),this.y+rad*Math.sin(direction*(Math.PI/180)), 360-direction, 6, 15, "mob", color);
            createBullet(this.x+rad*Math.cos(direction*(Math.PI/180)),this.y+rad*Math.sin(direction*(Math.PI/180)), 360-direction+1, 6, 15, "mob", color);
            createBullet(this.x+rad*Math.cos(direction*(Math.PI/180)),this.y+rad*Math.sin(direction*(Math.PI/180)), 360-direction-1, 6, 15, "mob", color);

            this.reload=30;
        }
    };
        walk=function(px, py){
    var len = Math.sqrt((px-this.x)**2 + (py-this.y)**2);

    var direction=this.direction;

    s=this.speed;
    
    this.runTime-=1;
    if(this.runTime==0){
        if(this.form==0){
            this.form=1;
            this.runTime=30+Math.floor(Math.random() * 31);
            this.direction=aim(this.x, this.y, px, py);
        }else{
            this.form=0;
            this.runTime=20+Math.floor(Math.random() * 21);
        }
    }
            
    if(this.form==0) return 0;
            
    if(len>150){
        this.vx += s*0.2*Math.cos(direction*(Math.PI/180));
        this.vy += s*0.2*Math.sin(direction*(Math.PI/180));
    }else if(len>80){
        this.vx += s*0.15*Math.cos(direction*(Math.PI/180));
        this.vy += s*0.15*Math.sin(direction*(Math.PI/180));
    }else if(len>50){
        this.vx += s*0.1*Math.cos(direction*(Math.PI/180));
        this.vy += s*0.1*Math.sin(direction*(Math.PI/180));
    }else{
        //none
    }
};
        createMob(480,Math.floor(Math.random() * 61)+60, 1500, 1.2, atk, walk, 5,function(){this.form=0; this.runTime=10; this.direction=180;});
        createMob(480,Math.floor(Math.random() * 61)+150, 1500, 1.2, atk, walk, 5,function(){this.form=0; this.runTime=10; this.direction=180;});
        createMob(480,Math.floor(Math.random() * 61)+240, 1500, 1.2, atk, walk,5,function(){this.form=0; this.runTime=10; this.direction=180;});
        createMob(0,Math.floor(Math.random() * 61)+60, 1500, 1.2, atk, walk, 5,function(){this.form=0; this.runTime=10; this.direction=180;});
        createMob(0,Math.floor(Math.random() * 61)+150, 1500, 1.2, atk, walk, 5,function(){this.form=0; this.runTime=10; this.direction=180;});
        createMob(0,Math.floor(Math.random() * 61)+240, 1500, 1.2, atk, walk, 5,function(){this.form=0; this.runTime=10; this.direction=180;});
    }
    if(progress==4500){
        boss=1;
    }
    if(progress%125==0 && 4500<progress && progress<=5200){
        atk=function(px, py){
        color={};
        color.r=0;
        color.g=50;
        color.b=0;

        this.reload-=1;

        if(this.reload==0){
            var direction=this.direction;
            var rad=Math.sqrt(2)*this.size;
            createBullet(this.x+rad*Math.cos(direction*(Math.PI/180)),this.y+rad*Math.sin(direction*(Math.PI/180)), 360-direction, 6, 15, "mob", color);
            createBullet(this.x+rad*Math.cos(direction*(Math.PI/180)),this.y+rad*Math.sin(direction*(Math.PI/180)), 360-direction+1, 6, 15, "mob", color);
            createBullet(this.x+rad*Math.cos(direction*(Math.PI/180)),this.y+rad*Math.sin(direction*(Math.PI/180)), 360-direction-1, 6, 15, "mob", color);

            this.reload=30;
        }
    };
        walk=function(px, py){
    var len = Math.sqrt((px-this.x)**2 + (py-this.y)**2);

    var direction=this.direction;

    s=this.speed;
    
    this.runTime-=1;
    if(this.runTime==0){
        if(this.form==0){
            this.form=1;
            this.runTime=30+Math.floor(Math.random() * 31);
            this.direction=aim(this.x, this.y, px, py);
        }else{
            this.form=0;
            this.runTime=20+Math.floor(Math.random() * 21);
        }
    }
            
    if(this.form==0) return 0;
            
    if(len>150){
        this.vx += s*0.2*Math.cos(direction*(Math.PI/180));
        this.vy += s*0.2*Math.sin(direction*(Math.PI/180));
    }else if(len>80){
        this.vx += s*0.15*Math.cos(direction*(Math.PI/180));
        this.vy += s*0.15*Math.sin(direction*(Math.PI/180));
    }else if(len>50){
        this.vx += s*0.1*Math.cos(direction*(Math.PI/180));
        this.vy += s*0.1*Math.sin(direction*(Math.PI/180));
    }else{
        //none
    }
};
        init=function(){this.form=0; this.runTime=10; this.direction=180;};
        createMob(480,90,5000, 2, atk, walk, 5, init);
        createMob(480,180,5000, 2, atk, walk, 5, init);
        createMob(480,270,5000, 2, atk, walk, 5, init);
        createMob(0,90,5000, 2, atk, walk, 5, init);
        createMob(0,180,5000, 2, atk, walk, 5, init);
        createMob(0,270,5000, 2, atk, walk, 5, init);
    }
    //blue
    if(progress%75==0 && 5200<progress && progress<=6000){
        atk=function(px, py){
        color={};
        color.r=0;
        color.g=50;
        color.b=0;

        this.reload-=1;

        if(this.reload==0){
            var direction=this.direction;
            var rad=Math.sqrt(2)*this.size;
            createBullet(this.x+rad*Math.cos(direction*(Math.PI/180)),this.y+rad*Math.sin(direction*(Math.PI/180)), 360-direction, 6, 15, "mob", color);
            createBullet(this.x+rad*Math.cos(direction*(Math.PI/180)),this.y+rad*Math.sin(direction*(Math.PI/180)), 360-direction+1, 6, 15, "mob", color);
            createBullet(this.x+rad*Math.cos(direction*(Math.PI/180)),this.y+rad*Math.sin(direction*(Math.PI/180)), 360-direction-1, 6, 15, "mob", color);

            this.reload=30;
        }
    };
        walk=function(px, py){
    var len = Math.sqrt((px-this.x)**2 + (py-this.y)**2);

    var direction=this.direction;

    s=this.speed;
    
    this.runTime-=1;
    if(this.runTime==0){
        if(this.form==0){
            this.form=1;
            this.runTime=30+Math.floor(Math.random() * 31);
            this.direction=aim(this.x, this.y, px, py);
        }else{
            this.form=0;
            this.runTime=20+Math.floor(Math.random() * 21);
        }
    }
            
    if(this.form==0) return 0;
            
    if(len>150){
        this.vx += s*0.2*Math.cos(direction*(Math.PI/180));
        this.vy += s*0.2*Math.sin(direction*(Math.PI/180));
    }else if(len>80){
        this.vx += s*0.15*Math.cos(direction*(Math.PI/180));
        this.vy += s*0.15*Math.sin(direction*(Math.PI/180));
    }else if(len>50){
        this.vx += s*0.1*Math.cos(direction*(Math.PI/180));
        this.vy += s*0.1*Math.sin(direction*(Math.PI/180));
    }else{
        //none
    }
};
        init=function(){this.form=0; this.runTime=10; this.direction=180;};
        createMob(480,90,7000, 2.5, atk, walk, 5, init);
        createMob(480,180,7000, 2.5, atk, walk, 5, init);
        createMob(480,270,7000, 2.5, atk, walk, 5, init);
        createMob(0,90,7000, 2.5, atk, walk, 5, init);
        createMob(0,180,7000, 2.5, atk, walk, 5, init);
        createMob(0,270,7000, 2.5, atk, walk, 5, init);
    }if(progress==6001){
        boss=1;
    }
    
    if(progress==6050){
        atk=function(px, py){
        color={};
        color.r=100;
        color.g=-50;
        color.b=-50;

        this.reload-=1;

        if(this.reload==0){
            var direction=this.direction;
            var rad=Math.sqrt(2)*this.size;
            createBullet(this.x+rad*Math.cos(direction*(Math.PI/180)),this.y+rad*Math.sin(direction*(Math.PI/180)), 360-direction, 3, 50, "mob", color);

            this.reload=15;
        }
    };
        walk=function(px, py){
    var len = Math.sqrt((px-this.x)**2 + (py-this.y)**2);

    var direction=this.direction;

    s=this.speed;
    
    this.runTime-=1;
    if(this.runTime==0){
        if(this.form==0){
            this.form=1;
            this.runTime=30+Math.floor(Math.random() * 31);
            this.direction=aim(this.x, this.y, px, py);
        }else{
            this.form=0;
            this.runTime=20+Math.floor(Math.random() * 21);
        }
    }
            
    if(this.form==0) return 0;
            
    if(len>150){
        this.vx += s*0.2*Math.cos(direction*(Math.PI/180));
        this.vy += s*0.2*Math.sin(direction*(Math.PI/180));
    }else if(len>80){
        this.vx += s*0.15*Math.cos(direction*(Math.PI/180));
        this.vy += s*0.15*Math.sin(direction*(Math.PI/180));
    }else if(len>50){
        this.vx += s*0.1*Math.cos(direction*(Math.PI/180));
        this.vy += s*0.1*Math.sin(direction*(Math.PI/180));
    }else{
        //none
    }
};
        stay=function(px, py){};
        init_head_l=function(){this.form=0; this.runTime=10; this.direction=180;}
        init_head_r=function(){this.form=0; this.runTime=10; this.direction=0;}
        init_head_u=function(){this.form=0; this.runTime=10; this.direction=90;}
        init_head_d=function(){this.form=0; this.runTime=10; this.direction=270;}
        for(i=5; i<=355; i+=10){
            createMob(475,i,14000, 2.5, atk, stay, 3, init_head_l);
            createMob(5,i,14000, 2.5, atk, stay, 3, init_head_r);
        }
        for(i=5; i<475; i+=10){
            createMob(i,5,14000, 2.5, atk, stay, 3, init_head_u);
            createMob(i,355,14000, 2.5, atk, stay, 3, init_head_d);
        }
    }if(progress==6051){
        boss=1;
    }
}

//get canvas
let canvas= document.getElementById("main");
//get drawing object
let dw = canvas.getContext("2d");

canvas.width=480;
canvas.height=360;

//"keys" is a variable(dictionary) that records key pressed
//90=[z] 37=left arrow 38=up arrow 39=right arrow 40=down arro
var keys={90:false, 37:false, 38:false, 39:false, 40:false,
         48:false, 49:false, 50:false, 51:false, 52:false,
         53:false, 54:false, 55:false, 56:false, 57:false,
         16:false};

//window thread that calls the function when key up or down
//for new keys pressed, it makes the value from the specific key be true
window.onkeyup = function(e) { keys[e.keyCode] = false;}
//respectively, it goes false
window.onkeydown = function(e) {keys[e.keyCode] = true; if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {e.preventDefault();}}

//check if a specific button is pressed
function isPressed(e){
    //the parameter excepted to be a string: "up" "down" "left" "right" "z"
    return keys[
        {"up":38,
        "down":40,
        "left":37,
        "right":39,
        "z":90,
        "0":48,
        "1":49,
        "2":50,
        "3":51,
        "4":52,
        "5":53,
        "6":54,
        "7":55,
        "8":56,
        "9":57,
        "shift":16
        }[e]
    ]
}

//clean all lines and circles from the canvas
function cleanScreen(x0=0, y0=0, x1=canvas.width, y1=canvas.height){
    //dw.clearRect method
    dw.clearRect(0, 0, canvas.width, canvas.height);
}

//make dw starts drawing
function penDown(){
    dw.beginPath();
}
//make dw stops drawing
function penUp(){
    dw.closePath();
}
//update lines to screen
function update(){
    dw.stroke()
}

//code that initialize the player
{   
    //empty object
    var player={};
    //class name
    player.class="player";
    //coordinate
    player.x=50;
    player.y=50;
    //velocity
    player.vx=0;
    player.vy=0;
    //movement speed
    player.speed=1;
    //toward at
    player.head="right";
    //health
    player.health=500;
    player.maxHealth=500;
    
    player.healthBuff=0;
    
    player.gunUnlocked=1;
    gunSelect('a');
}

//an array that records all bullet
var bullet=[];
var mob=[];

function default_attack(px, py){
    color={};
    color.r=0;
    color.g=50;
    color.b=0;

    this.reload-=1;

    if(this.reload==0){
        var direction=aim(this.x, this.y, px, py);
        var rad=Math.sqrt(2)*this.size;
        createBullet(this.x+rad*Math.cos(direction*(Math.PI/180)),
                    this.y+rad*Math.sin(direction*(Math.PI/180)), 360-direction, 5, 20, "mob", color);

        this.reload=20;
    }
}
function default_walk(px, py){
    var len = Math.sqrt((px-this.x)**2 + (py-this.y)**2);

    var direction=aim(this.x, this.y, px, py);

    s=this.speed;

    if(len>150){
        this.vx += s*0.2*Math.cos(direction*(Math.PI/180));
        this.vy += s*0.2*Math.sin(direction*(Math.PI/180));
    }else if(len>80){
        this.vx += s*0.15*Math.cos(direction*(Math.PI/180));
        this.vy += s*0.15*Math.sin(direction*(Math.PI/180));
    }else if(len>50){
        this.vx += s*0.1*Math.cos(direction*(Math.PI/180));
        this.vy += s*0.1*Math.sin(direction*(Math.PI/180));
    }else{
        //none
    }
}

//create new mob
function createMob(x, y, health=100, speed=1, attackFunction=default_attack, walkFunction=default_walk, size=5, initialization=function(){}){
    var node={};
    node.class="mob";
    
    node.x=x;
    node.y=y;
    
    node.size=size;
    
    node.vx=0;
    node.vy=0;
    
    node.health=health;
    node.maxHealth=health;
    
    node.speed=speed;
    
    node.reload=1;

    node.attack=attackFunction;

    node.walk=walkFunction;
    
    node.init=initialization;
    
    node.init();
    
    mob.push(node);
}

//create new bullet
function createBullet(x, y, degree, speed, damage=10, author="player", color=player.gun.color){
    //empty new node
    var node={};
    //class name
    node.class="bullet";
    //initial coordinate
    node.x=x;
    node.y=y;
    //face at
    node.degree=degree;
    //bullet speed
    node.speed=speed;
    //health
    node.health=100;
    
    node.damage=damage;
    
    node.author=author;
    
    //color
    node.color={};
    
    //color in rgb
    node.color.r=color.r;
    node.color.g=color.g;
    node.color.b=color.b;
    
    //record this node into the array
    bullet.push(node);
}

//draw a bullet using parameter x,y coordinate, health and color
//x,y:number, health:1~100, color: object with attribute: r, g, b
function drawBullet(x, y, health, color){
    //normal bullet
    if(health>=40){
        theme=50;
    }
    //dying bullet
    else{
        theme=health*1.25;
    }
    
    //shorten name
    r_=color.r;
    g_=color.g;
    b_=color.b;
    
    //set fill style
    dw.fillStyle="rgba("+(55+(r_-g_/3-b_/3)+2*theme)
                        +","+(55+(g_-r_/3-b_/3)+2*theme)
                        +","+(55+(b_-r_/3-g_/3)+2*theme)
                        +","+(theme/50)+")";
    
    //set stroke style same with fill style
    dw.strokeStyle=dw.fillStyle;
    
    //prepare
    penDown();
    dw.lineWidth=1;
    
    //draw circle
    dw.arc(x,y,3,0,Math.PI*2);
    
    //fill
    dw.fill();
    
    //pen up
    penUp();
    
    //update stroke
    update();
}

//draw character
function drawCharacter(x=player.x, y=player.y, id="player", health=player.health, maxHealth=player.maxHealth, size=6){
    dw.lineWidth=2;
    penDown();

    if(id=="player"){
        dw.strokeStyle="#d3d3d3";
        dw.moveTo(x-10,y-12);
        dw.lineTo(x+10,y-12);
        update();
        
        penDown();
        dw.strokeStyle="#ff0000";
        dw.moveTo(x-10,y-12);
        dw.lineTo(x-10+health/maxHealth*20,y-12);
        update();
    }else{
        dw.strokeStyle="#d3d3d3";
        dw.moveTo(x-5*(size/5),y-12*(size/5));
        dw.lineTo(x+5*(size/5),y-12*(size/5));
        update();

        penDown();
        dw.strokeStyle="#ff0000";
        dw.moveTo(x-5*(size/5),y-12*(size/5));
        dw.lineTo(x+(-5+health/maxHealth*10)*(size/5),y-12*(size/5));
        update();
    }

    penUp();
    update();
    
    //pen down
    penDown();
    
    if(id=="player"){
        dw.fillStyle="rgba("+(player.gun.color.r+165)+","+
                        (player.gun.color.g+165)+","+
                        (player.gun.color.b+165)+",1)";
    }else{
        dw.fillStyle="#ff5900";
    }
    
    //draw
    r=size;
    dw.lineWidth=0;
    
    dw.strokeStyle=dw.fillStyle;
    dw.arc(x, y, r, 0, 2*Math.PI);
    
    dw.fill();
    penUp();
    
    //update
    update();
}

//function that draws and updates bullet
function updateBullet(){
    //iteration by index
    for(index=0; index<bullet.length; index++){
        //draw bullet
        drawBullet(bullet[index].x,
                   bullet[index].y,
                   bullet[index].health,
                   bullet[index].color);
        
        //get speed
        speed=bullet[index].speed;
        
        //change on x,y
        vx=speed*Math.cos(bullet[index].degree*(Math.PI/180));
        vy=-speed*Math.sin(bullet[index].degree*(Math.PI/180));
        
        //move bullet
        bullet[index].x+=vx;
        bullet[index].y+=vy;
        
        //decrease health
        bullet[index].health-=3;
        
        //if left/right edge is touched
        if(bullet[index].x<0 || bullet[index].x>480){
            //reflect
            bullet[index].degree=(180-bullet[index].degree);
            
            //get new change on x,y
            vx=speed*Math.cos(bullet[index].degree*(Math.PI/180));
            vy=-speed*Math.sin(bullet[index].degree*(Math.PI/180));
            
            //move
            bullet[index].x+=vx;
            bullet[index].y+=vy;
            
            //decrease health
            bullet[index].health-=8;
            
        }
        //if top/bottom edge is touched
        else if(bullet[index].y<0 || bullet[index].y>360){
            //reflect
            bullet[index].degree=(360-bullet[index].degree);
            
            //get new change on x,y
            vx=speed*Math.cos(bullet[index].degree*(Math.PI/180));
            vy=-speed*Math.sin(bullet[index].degree*(Math.PI/180));
            
            //move
            bullet[index].x+=vx;
            bullet[index].y+=vy;
            
            //decrease health
            bullet[index].health-=8;
        }
        
        //delete bullet if its health is non-positive
        if(bullet[index].health<=0){
            //delete this element
            bullet.splice(index,1);
            
            //decrease the index by 1, so that
            //in next iteration, the index won't change
            index--;
        }
    }
}

function aim(x, y, gx, gy){
    var dx=gx-x;
    var dy=gy-y;

    var direction;

    if(dx!=0){
        if(dx<0){
            direction=180+Math.atan(dy/dx)*(180/Math.PI);
        }else{
            direction=Math.atan(dy/dx)*(180/Math.PI);
        }
    }else{
        if(dy>=0) direction=90;
        else direction=270;
    }

    return direction;
}

function updateMob(){
    for(index=0; index<mob.length; index++){
        drawCharacter(mob[index].x, mob[index].y, "mob", mob[index].health, mob[index].maxHealth, mob[index].size);
        
        m=mob[index];

        m.walk(player.x, player.y);
        
        
        //physic
        m.x+=m.vx;
        m.y+=m.vy;
        
        m.vx*=0.9;
        m.vy*=0.9;

        //attack with bullet
        m.attack(player.x, player.y);
        
        //check if damage
        for(i=0;i<bullet.length;i++){
            b=bullet[i];
            if (b.author=="mob") continue;
            if(Math.sqrt((m.x-b.x)**2+(m.y-b.y)**2)<4+m.size){
                m.health-=b.damage;
                bullet.splice(i, 1);
                i--;
            }
        }
        
        //delete of mob
        if(m.health<=0){
            mob.splice(index,1);
            index--;
        }
        
    }
}

function updateCharacter(){
    drawCharacter();

    for(i=0;i<bullet.length;i++){
        b=bullet[i];
        if (b.author=="player") continue;
        if(Math.sqrt((player.x-b.x)**2+(player.y-b.y)**2)<9){
            player.health-=b.damage;
            player.healthBuff=0;
            bullet.splice(i, 1);
            i--;
        }
    }
    
    player.healthBuff+=1;
    
    if(player.healthBuff>=5*(player.maxHealth-player.health)){
        player.health*=1.01;
        if(player.health>player.maxHealth){
            player.health=player.maxHealth;
        }
    }

}

//check if up or down arrow key pressed
function verticalInput(){
    //if up arrow key pressed
    if (isPressed("up")){
        player.vy-=player.speed;
    }
    
    //if down arrow key pressed
    if (isPressed("down")){
        player.vy+=player.speed;
    } 
}

//check if left or right arrow key pressed
function horizonalInput(){
    //if left arrow key pressed
    if (isPressed("left")){
        player.head="left";
        player.vx-=player.speed;
    }
    
    //if right arrow key pressed
    if (isPressed("right")){
        player.head="right";
        player.vx+=player.speed;
    }
}

//decrease the buff of gun shooting if the buff is non-zero
function reload(){
    if(player.gun.bullet==0 && player.gun.reload>=1){
        player.gun.reload-=1;
    }
    else if(player.gun.bullet==0){
        player.gun.bullet=player.gun.maxBullet;
    }
}

//when the gun does shoot event, the reloading buff set to maxium
function refill(){
    player.gun.reload=player.gun.maxReload;
}

//if the gun is filled and the player pressed [z]
function filled(){
    return isPressed("z")&&player.gun.bullet>=1;
}

//check if left or right arrow key pressed and head toward the direction
function checkHeading(){
    if (isPressed("left")){
        player.head="left";
    }
    if (isPressed("right")){
        player.head="right";
    }
}

//physic check
function physicCheck(){
    //player's position x, y change by vx, vy
    player.x+=player.vx;
    player.y+=player.vy;
    
    //lower vx, vy
    player.vx*=0.8;
    player.vy*=0.8;
    
    //check if any of the edges is touched
    if(player.x+7>480){
        player.vx*=-1;
        player.x=473;
    }if(player.x-7<0){
        player.vx*=-1;
        player.x=7;
    }if(player.y+7>360){
        player.vy*=-1;
        player.y=353;
    }if(player.y-7<0){
        player.vy*=-1;
        player.y=7;
    }
}

function gunAlterInput(){
    for(i=0;i<10;i++){
        if (isPressed(""+i)){
            gunSelect([
                "j","a","b","c","d","e","f","g","h","i"
            ][i])
        }
    }
}

//check all player's input
function checkInput(){
    gunAlterInput();
    
    //check if up or down arrow key pressed
    verticalInput();
    
    //decrease reloading buff
    reload();
    
    //if the player's pressing [z] and the reloading buff is zero.
    if (filled()){
        //check if the player should change direction
        checkHeading();
        
        //head right
        if(player.head=="right"){
            //use the player's gun method
            player.gun.shoot("right");
            
            //recoil
            player.vx-=player.gun.recoil;

        }
        
        //head left
        if(player.head=="left"){
            //use the player's gun method
            player.gun.shoot("left");

            //recoil
            player.vx+=player.gun.recoil;

        }
        
        //set the reload buff to maxium
        player.gun.bullet-=1;
        if (player.gun.bullet==0){
            refill();
        }
        
    }
    else if(player.gun.reload<player.gun.maxReload){
        //if the player don't want to shoot, or the reload buff isn't zero yet
        
        //check left and right arrow keys input
        horizonalInput();
    }
}

//this function is usually called as a html button event
function gunSelect(gunType){
    //these are different gun types
    
    //white
    if(gunType=='a' && player.gunUnlocked>=1){
        player.gun={};
        player.gun.maxReload=60;
        player.gun.reload=60;
        player.gun.recoil=0;
        player.gun.bullet=0;
        player.gun.maxBullet=3;
        
        player.gun.color={};
        player.gun.color.r=200;
        player.gun.color.g=200;
        player.gun.color.b=200;
        player.gun.shoot=function(e){
            if (e=="right"){
                createBullet(player.x+13, player.y-5, 5, 10, 60);
                createBullet(player.x+13, player.y, 0, 10, 60);
                createBullet(player.x+13, player.y+5, 355, 10, 60);
            }else{
                createBullet(player.x-13, player.y-5, 175, 10, 60);
                createBullet(player.x-13, player.y, 180, 10, 60);
                createBullet(player.x-13, player.y+5, 185, 10, 60);
            }
        }
        
    }
    
    //grey
    if(gunType=='b' && player.gunUnlocked>=2){
        player.gun={};
        player.gun.maxReload=20;
        player.gun.reload=20;
        player.gun.recoil=2;
        player.gun.bullet=0;
        player.gun.maxBullet=1;
        
        player.gun.color={};
        player.gun.color.r=80;
        player.gun.color.g=80;
        player.gun.color.b=80;
        player.gun.shoot=function(e){
            if (e=="right"){
                createBullet(player.x+13, player.y-5, 1, 12, 120);
                createBullet(player.x+13, player.y, 0, 12, 120);
                createBullet(player.x+13, player.y+5, 359, 12, 120);
            }else{
                createBullet(player.x-13, player.y-5, 179, 12, 120);
                createBullet(player.x-13, player.y, 180, 12, 120);
                createBullet(player.x-13, player.y+5, 181, 12, 120);
            }
        }
        
    }
    
    //black
    if(gunType=='c' && player.gunUnlocked>=3){
        player.gun={};
        player.gun.maxReload=50;
        player.gun.reload=50;
        player.gun.recoil=8;
        player.gun.bullet=0;
        player.gun.maxBullet=1;
        
        player.gun.color={};
        player.gun.color.r=-200;
        player.gun.color.g=-200;
        player.gun.color.b=-200;
        player.gun.shoot=function(e){
            if (e=="right"){
                createBullet(player.x+13, player.y, 0, 19, 300);
                createBullet(player.x+13, player.y, 0, 20, 500);
                createBullet(player.x+13, player.y, 0, 21, 300);
            }else{
                createBullet(player.x-13, player.y, 180, 19, 300);
                createBullet(player.x-13, player.y, 180, 20, 500);
                createBullet(player.x-13, player.y, 180, 21, 300);
            }
        }
        
    }
    
    //yellow
    if(gunType=='d' && player.gunUnlocked>=4){
        player.gun={};
        player.gun.maxReload=20;
        player.gun.reload=20;
        player.gun.recoil=1;
        player.gun.bullet=0;
        player.gun.maxBullet=1;
        
        player.gun.color={};
        player.gun.color.r=100;
        player.gun.color.g=50;
        player.gun.color.b=-50;
        player.gun.shoot=function(e){
            if (e=="right"){
                createBullet(player.x+13, player.y, 0, 29, 2000);
            }else{
                createBullet(player.x-13, player.y, 180, 29, 2000);
            }
        }
        
    }
    
    //pink
    if(gunType=='e' && player.gunUnlocked>=5){
        player.gun={};
        player.gun.maxReload=15;
        player.gun.reload=15;
        player.gun.recoil=6;
        player.gun.bullet=0;
        player.gun.maxBullet=1;
        
        player.gun.color={};
        player.gun.color.r=90;
        player.gun.color.g=-10;
        player.gun.color.b=-5;
        player.gun.shoot=function(e){
            if (e=="right"){
                createBullet(player.x+13, player.y-9, 45, 9, 2000);
                createBullet(player.x+13, player.y-5, 23, 9, 2000);
                createBullet(player.x+13, player.y, 0, 9, 2000);
                createBullet(player.x+13, player.y+5, 337, 9, 2000);
                createBullet(player.x+13, player.y+9, 315, 9, 2000);
            }else{
                createBullet(player.x-13, player.y-9, 135, 9, 2000);
                createBullet(player.x-13, player.y-5, 157, 9, 2000);
                createBullet(player.x-13, player.y, 180, 9, 2000);
                createBullet(player.x-13, player.y+5, 203, 9, 2000);
                createBullet(player.x-13, player.y+9, 225, 9, 2000);
            }
        }
        
    }
    
    //green
    if(gunType=='f' && player.gunUnlocked>=6){
        player.gun={};
        player.gun.maxReload=10;
        player.gun.reload=10;
        player.gun.recoil=3;
        player.gun.bullet=0;
        player.gun.maxBullet=1;

        player.gun.color={};
        player.gun.color.r=50;
        player.gun.color.g=50;
        player.gun.color.b=-50;
        player.gun.shoot=function(e){
            if (e=="right"){
                createBullet(player.x+13, player.y-9, 45, 7, 3000);
                createBullet(player.x+13, player.y-5, 23, 7, 3000);
                createBullet(player.x+13, player.y, 0, 7, 3000);
                createBullet(player.x+13, player.y+5, 337, 7, 3000);
                createBullet(player.x+13, player.y+9, 315, 7, 3000);
            }else{
                createBullet(player.x-13, player.y-9, 135, 7, 3000);
                createBullet(player.x-13, player.y-5, 157, 7, 3000);
                createBullet(player.x-13, player.y, 180, 7, 3000);
                createBullet(player.x-13, player.y+5, 203, 7, 3000);
                createBullet(player.x-13, player.y+9, 225, 7, 3000);
            }
        }
    }
    
    //blue
    if(gunType=='g' && player.gunUnlocked>=7){
        player.gun={};
        player.gun.maxReload=30;
        player.gun.reload=30;
        player.gun.recoil=0;
        player.gun.bullet=0;
        player.gun.maxBullet=4;
        
        player.gun.color={};
        player.gun.color.r=-25;
        player.gun.color.g=-25;
        player.gun.color.b=0;
        player.gun.shoot=function(e){
            createBullet(player.x+13, player.y-5, 23, 12, 4000);
            createBullet(player.x+13, player.y, 0, 12, 4000);
            createBullet(player.x+13, player.y+5, 337, 12, 4000);
            createBullet(player.x-13, player.y-5, 157, 12, 4000);
            createBullet(player.x-13, player.y, 180, 12, 4000);
            createBullet(player.x-13, player.y+5, 203, 12, 4000);
        }
    }
    
    //purple
    if(gunType=='h' && player.gunUnlocked>=8){
        player.gun={};
        player.gun.maxReload=3;
        player.gun.reload=3;
        player.gun.recoil=2;
        player.gun.bullet=0;
        player.gun.maxBullet=1;
        
        player.gun.color={};
        player.gun.color.r=40;
        player.gun.color.g=-10;
        player.gun.color.b=40;
        player.gun.shoot=function(e){
            if (e=="right"){
                createBullet(player.x+13, player.y-9, 45, 6, 5000);
                createBullet(player.x+13, player.y, 0, 6, 5000);
                createBullet(player.x+13, player.y+9, 315, 6, 5000);
            }else{
                createBullet(player.x-13, player.y-9, 135, 6, 5000);
                createBullet(player.x-13, player.y, 180, 6, 5000);
                createBullet(player.x-13, player.y+9, 225, 6, 5000);
            }
        }
    }
    
    //dark red
    if(gunType=='i' && player.gunUnlocked>=9){
        player.gun={};
        player.gun.maxReload=60;
        player.gun.reload=60;
        player.gun.recoil=2;
        player.gun.bullet=0;
        player.gun.maxBullet=3;
        
        player.gun.color={};
        player.gun.color.r=-100;
        player.gun.color.g=-200;
        player.gun.color.b=-200;
        player.gun.shoot=function(e){
            if (e=="right"){
                for(i=5; i<15; i++){
                    createBullet(player.x+13, player.y-9, 1, i, 1000);
                    createBullet(player.x+13, player.y, 0, i, 1000);
                    createBullet(player.x+13, player.y+9, 359, i, 1000);
                }
            }else{
                for(i=5; i<15; i++){
                    createBullet(player.x-13, player.y-9, 179, i, 1000);
                    createBullet(player.x-13, player.y, 180, i, 1000);
                    createBullet(player.x-13, player.y+9, 181, i, 1000);
                }
            }
        }
    }

    //orange
    if(gunType=='j' && player.gunUnlocked>=10){
        player.gun={};
        player.gun.maxReload=1;
        player.gun.reload=1;
        player.gun.recoil=-3;
        player.gun.bullet=0;
        player.gun.maxBullet=15;
        
        player.gun.color={};
        player.gun.color.r=100;
        player.gun.color.g=-24;
        player.gun.color.b=-110;
        player.gun.shoot=function(e){
            if (e=="right"){
                createBullet(player.x+13, player.y, 0, 0, 5000);
                createBullet(player.x+13, player.y, 0, 0, 5000);
                createBullet(player.x+13, player.y, 0, 0, 5000);
            }else{
                createBullet(player.x-13, player.y, 180, 0, 5000);
                createBullet(player.x-13, player.y, 180, 0, 5000);
                createBullet(player.x-13, player.y, 180, 0, 5000);
            }
        }
        
    }
}

function tickSection(){
    level();
    
    if(progress==1){
        document.getElementById('a').style.opacity=1;
    }

    
    if(progress%1000==450 && progress<9000){
        document.getElementById(
            'abcdefghij'[1+(progress-450)/1000]
            ).style.opacity=1;
        player.gunUnlocked+=1;
    }
}

//mainloop, refresh every 0.03 second
function refresh(){
    if(player.health<=0){
        cleanScreen();

        for(i=0;i<10;i++){
            document.getElementById(
                'abcdefghij'[i]
                ).style.opacity=0;
        }

        player.gunUnlocked=0;

        clearInterval(thread);
        return 0;
    }

    tickSection();
    
    //clean all strokes in the canvas
    cleanScreen();
    
    //draw main character
    updateCharacter();
    
    //check keyboard inputs
    checkInput();
    
    //check character's physic
    physicCheck();
   
    //update bullet
    updateBullet();
    
    //update mob
    updateMob();
}

var thread=setInterval(refresh, 30);

function cheat(){
    player.maxHealth=100000;
    player.health=100000;
    player.gunUnlocked=10;
    for(i=0;i<10;i++){
        document.getElementById(
            'abcdefghij'[i]
            ).style.opacity=1;
    }
    gunSelect("i");
}