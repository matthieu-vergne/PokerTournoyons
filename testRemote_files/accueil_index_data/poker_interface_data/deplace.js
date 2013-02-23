//emprunt� au g�nial site-du-zero http://www.siteduzero.com voir http://b2moo.free.fr/tutorials/mouse/win_6.htm, puis adapt� � nos besoins
var dragged = null;
var dX, dY;
var dragged_object_id='';

function start_drag(objet,event)
{
  if( objet.max) return; //on quitte la fonction
  dragged = objet;
  dragged_object_id=objet.id
  event.returnValue = false;
  if( event.preventDefault ) event.preventDefault();
	
	//Coordonn�es de la souris
  var x = event.clientX + (document.documentElement.scrollLeft + document.body.scrollLeft);
  var y = event.clientY + (document.documentElement.scrollTop + document.body.scrollTop);
	

	//Coordonn�es de l'�l�ment
  var eX = 0;
  var eY = 0;
  var element = objet;
  do
  {
    eX += element.offsetLeft;
    eY += element.offsetTop;
    element = element.offsetParent;
	} while( element && getCssStyleValue(element, 'position') != 'absolute');

	//Calcul du d�calage
  dX = x - eX;
  dY = y - eY;
  //Private_Prends_Calque(objet.id)//fonction de l'appellant
}


function drag_onmousemove(event) 
{
  if( dragged!=null ) 
  {
	var x = event.clientX + (document.documentElement.scrollLeft + document.body.scrollLeft);
	
		//On applique le d�calage
		x -= dX;

	//Move_Souris(event)
		Min=BaseMise+Math.ceil((TLMISE*MiseInit)/100)
		if (x < Min) {x=Min}
		if (x > BaseMise+TLMISE) {x=BaseMise+TLMISE}
		MiseSaisie=Math.floor((100*(x-BaseMise))/TLMISE)
		AfficheCurseurMise(MiseSaisie)
   // dragged.style.position = 'absolute';
    //dragged.style.left = x + 'px';

  }
}

function drag_onmouseup(event){
	dragged = null; //On arr�te le drag&drop
	if (!event) event = window.event;
	if (event.target) elsrc = event.target;
	else if (event.srcElement) elsrc = event.srcElement; 
	if (elsrc != undefined) {
		OffCurseur()
	} 
}

function addEvent(obj,event,fct){
  if( obj.attachEvent)
     obj.attachEvent('on' + event,fct);
  else
     obj.addEventListener(event,fct,true);
}

function getCssStyleValue(element /*element html*/, style/*style recherch�*/)
{
  if( element.currentStyle )
  {
    return element.currentStyle[style];
  }
  else
  {
    return window.getComputedStyle(element,null).getPropertyValue(style);
  }
}

function drag_onmousedown (event)
{
  var target = event.target || event.srcElement;
  
  //On commence par trouver la fen�tre elle-m�me
  var fenetre = target;
  while( fenetre)
  {
    if( fenetre.className && fenetre.className.match(/\bwindow-base\b/g) )
    {
       break; //On arr�te la boucle
    }
		fenetre = fenetre.parentNode;
  }
  if( !fenetre) //Si on est sorti de la boucle mais qu'on a trouv� aucune fen�tre, on abandonne
    return;

  //Maintenant, on part � la recherche d'un bouton d�clencheur
  var element = target;
  while(element)
  {
    if( element.className){
      if( element.className.match(/\bwindow-move\b/g))
      {
        start_drag(fenetre, event);
        break;
      }
    }
	element = element.parentNode;
  }

	//Mettre au premier plan
	var elements = document.getElementsByTagName('*'); //On r�cup�re tous les �l�ments de la page
	var zIndex = 0;
	for( var i=0; i < elements.length; i++)
	{
					zIndex = Math.max(zIndex,elements[i].style.zIndex);
	}
	fenetre.style.zIndex = zIndex + 1; //toujours plus haut que le plus haut 
}
addEvent(document,'mousedown',drag_onmousedown);
addEvent(document,'mousemove',drag_onmousemove);
addEvent(document,'mouseup',drag_onmouseup);