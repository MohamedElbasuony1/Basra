var dick=[];
var player1card=[];
var player2card=[];
var playground=[];
var playgroundname=[]
var scoreplayer2=0;
var scoreplayer1=0;
var player1;
var player2;
var x;
var possibles=new Array();
var flag;
var flag2=true;
var w=0;
var score=0;

class card
{
    constructor (Source,val)
    {
        this.src=Source;
        this.name=val;
        //this.action=action;
    }
}
    
function load_dick() {
    for(var i=-3;i<=9;i++)
    {
          dick.push(new card("./cards/"+i+"_of_clubs.png",i));
          dick.push(new card("./cards/"+i+"_of_diamonds.png",i));
          dick.push(new card("./cards/"+i+"_of_hearts.png",i));
          dick.push(new card("./cards/"+i+"_of_spades.png",i));
    }
}   
      
function shuffle() {
    dick.sort(function () {
        return 0.5-Math.random();
    })
}
 
function getplayer_cards(array) {
   array.length=0;
   for(var i=0;i<4;i++)
   {
    array.push(dick.pop());
   }  
}

function getground_cards() {
    for(var i=0;i<4;i++)
    {
        var c=dick.pop();
        if (c.name==-3)
        {
          i--;
          dick.push(c);
          shuffle();
        }
        else
        {
            playground.push(c);
            playgroundname.push(c.name);
            var s=document.createElement('img');
            s.setAttribute('src',c.src);
            document.getElementById('ground').appendChild(s);
        }    
    }   
}

function combination(list1,array,target) {
    if (array.length == 0) {
        var sum=0;
        var list2=[];
        for(var i=0;i<list1.length;i++)
        {
            sum+=parseInt(list1.charAt(i));
            list2[i]=parseInt(list1.charAt(i));
        } 
        if(sum==target)
        {  
            possibles.push(list2);
        }
    }
    else {
        combination(list1 + array.charAt(0), array.substring(1, array.length),target);
        combination(list1, array.substring(1, array.length),target);
    }
}

function start() {
    document.getElementById('p1').innerText="score : "+0; 
    document.getElementById('p2').innerText="score : "+0; 
    document.getElementById('p3').innerText=40+" Cards"; 
    player1card=[];
    player2card=[];
    playground=[];
    playgroundname=[];
    scoreplayer2=0;
    document.getElementById('ground').childNodes.length=0;
    dick.length=0;
    var groundNode=document.getElementById('ground');
    while (groundNode.firstChild) 
    {
        groundNode.removeChild(groundNode.firstChild);
    }
    load_dick();
    shuffle();
    getplayer_cards(player1card);
    getplayer_cards(player2card);
    getground_cards();
    player1=document.querySelectorAll('#player1 img');
    player2=document.querySelectorAll('#player2 img');  
    for(var i=0;i<4;i++)
    {
        player1[i].style.display='inline-block' 
        player2[i].src=player2card[i].src;
        player2[i].style.display='inline-block';
    }
 }

 function roll() {
    x=0;
    for (var i=0;i<playground.length;i++) 
    {   
        document.getElementById('ground').removeChild(document.getElementById('ground').childNodes[0]); 
        x+=playground[i].name;
    }
  playground=[];
  playgroundname=[];
 }

function play(chosenCard,player){
flag2=!flag2;    
var len=playground.length;
if (len==0)
{
    playground.push(player[chosenCard]);
    playgroundname.push(player[chosenCard].name);
    var s=document.createElement('img');
    s.setAttribute('src',player[chosenCard].src);
    document.getElementById('ground').appendChild(s);
}
else if((player[chosenCard].name==7&&/diamonds/.test(player[chosenCard].src)))
 {
     roll();
     if (len==1 || x<=10)
      {
        score+=11+len;
      }
      else
      {
        score+=len+1;
      }
 }   
else if(player[chosenCard].name==-3) // Jack
    {
        score+=len+1;
        roll();
    }   
else if(playground[0].name==player[chosenCard].name && len==1)
    {
        document.getElementById('ground').removeChild(document.getElementById('ground').childNodes[0]); 
        playground.splice(0,1);  //i the postion i want to remove ,1 one element to be removed
        playgroundname.splice(0,1);
        score+=12;//10basra
    }     
else
    {
        flag=false;
        for (var i=0;i<playground.length;i++)
            {   
                if (playground[i].name==player[chosenCard].name)
                {
                    document.getElementById('ground').removeChild(document.getElementById('ground').childNodes[i]); 
                    playground.splice(i,1);
                    playgroundname.splice(i,1);  //i the postion i want to remove ,1 one element to be removed
                    score+=1;
                    i--; //3shan lma msa7t element men el playground el ba3do a5d mkano
                    flag=true;
                }
            }
        possibles=[];
        if(player[chosenCard].name > -1)
        {
            if(player[chosenCard].name==0)
            {
                combination("",playgroundname.join('').replace(/-3|-2|-1|0/g,''),10);                            
            }
            else
            combination("",playgroundname.join('').replace(/-3|-2|-1|0/g,''),player[chosenCard].name);
        }
        possibles.sort(function(a,b){return b.length - a.length});
        if(possibles.length!=0)
        {
             while(possibles.length!=0)
                {
                    for(var i = 0 ;i<possibles[0].length;i++)
                        {
                            var index=playgroundname.indexOf(possibles[0][i]);
                            document.getElementById('ground').removeChild(document.getElementById('ground').childNodes[index]); 
                            playground.splice(index,1);
                            playgroundname.splice(index,1);  //i the postion i want to remove ,1 one element to be removed
                            score+=1;
                        }
                    possibles=[];
                    if(player[chosenCard].name > -1)
                    {
                        if(player[chosenCard].name==0)
                        {
                            combination("",playgroundname.join('').replace(/-3|-2|-1|0/g,''),10);                            
                        }
                        else
                        combination("",playgroundname.join('').replace(/-3|-2|-1|0/g,''),player[chosenCard].name);
                    }
                    possibles.sort(function(a,b){return b.length - a.length});
                }
            flag=true;
        }
        if(!flag)
        {
            playground.push(player[chosenCard]);
            playgroundname.push(player[chosenCard].name);
            var s=document.createElement('img');
            s.setAttribute('src',player[chosenCard].src);
            document.getElementById('ground').appendChild(s);
        }
        else
        score+=1;    
    }
    
    if(!flag2)
    {
        player2[chosenCard].style.display='none';
        scoreplayer2+=score;
        document.getElementById('p2').innerText="score :"+scoreplayer2; 
        score=0;
        player1[w].setAttribute("src",player1card[w].src);
        setTimeout(function(){
            play(w,player1card);
            player1[w].setAttribute("src","./cards/facedown.png");
            player1[w].style.display='none';
            w++;
            scoreplayer1+=score;
            document.getElementById('p1').innerText="score :"+scoreplayer1;
            if(w==4 && dick.length!=0)
            {
                w=0;
                getplayer_cards(player1card);
                getplayer_cards(player2card);
                document.getElementById('p3').innerText=dick.length+" Cards";
                for(var i=0;i<4;i++)
                {
                    player1[i].style.display='inline-block' 
                    player2[i].src=player2card[i].src;
                    player2[i].style.display='inline-block';
                }
            }
        },2000);
    }
}

