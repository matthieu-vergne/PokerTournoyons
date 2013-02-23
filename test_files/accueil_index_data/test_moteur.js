var IsJoueur1=true;
var IsLocalhost=false;
var LaValeur;
var LePlateau='';
var MoveId=0;
var Phase1=true;
var Params=new Array();
var QueryNoms=new Array();
var QueryValeurs=new Array();
var QueryNombre=0;
var Tour=0;
var UnGain1='';
var UnGain2='';
var UnMove1='';
var UnMove2='';

var Valeur='';

function AffichePlateau() {
	LePlateau=document.getElementById("Plateau").value;
	if (LePlateau=='') {alert(MOT_PLATEAU)}
	else {
		VersInterface('')
	}
}

function AfficheRetour(First) {
	if (JeuMoteur==4 && Tour==1) {//premier tour de NAVALE
		if (First) {
			VersInterface('Gain1='+document.getElementById("Retour").value)
		} else {
			VersInterface('Gain2='+document.getElementById("Retour").value)	
		}
	
	} else {
		if (First) {
			VersInterface('Move1='+document.getElementById("Retour").value)
		} else {
			VersInterface('Move2='+document.getElementById("Retour").value)	
		}
	}
}

function Ajout(Nom,Valeur) {
	QueryNombre=0;
	Existe=false;
	LeQuery=document.getElementById("Query").value
	if (LeQuery.indexOf('=') > 0) {
		Params = LeQuery.split('&');  
		QueryNombre=Params.length
		for (i = 0; i < QueryNombre; i++) {  
			Paire = Params[i].split('=');  
			QueryNoms[i]=Paire[0]
			if (Paire[0].toLowerCase()==Nom.toLowerCase()) {
				Existe=true
				QueryValeurs[i]=Valeur
			} else {
				QueryValeurs[i]=Paire[1]; 
			}
		}
	}
	if (!Existe) {
		QueryNoms[QueryNombre]=Nom
		QueryValeurs[QueryNombre]=Valeur
		QueryNombre++
	}
	LeQuery=''
	for (i = 0; i < QueryNombre; i++) {  
		if (i > 0) {LeQuery+='&'}
		LeQuery+=QueryNoms[i]+'='+QueryValeurs[i]
	}
	document.getElementById("Query").value=LeQuery
}

function AppelMoteur(Premier,Partie) {
	REVERSI=8;
	if (JeuMoteur==3) {//CHIFOUMI
		MoveId++
		URLsrc=URLMoteur+'?Game='+Partie+'&Turn='+MoveId+'&MoveId='+MoveId+'&Referee=';
		document.getElementById("MontreURL").value=URLsrc;	
		document.getElementById("Moteur").src=URLsrc;
	} else {
		Move='';
		if (Premier) {if (UnMove2!='') {Move='&Move2='+UnMove2}} else {if (UnMove1!='') {Move='&Move1='+UnMove1}}
		UnPlateau=document.getElementById("Plateau").value;
		if (JeuMoteur==REVERSI) {//MASTERMIND
			Taille1=UnPlateau.indexOf('***')
			if (Taille1 > 0) {
				Taille2=UnPlateau.length-Taille1-3
				LePlateau1Chaine=UnPlateau.substr(0,Taille1)
				LePlateau2Chaine=UnPlateau.substr(Taille1+3)
			} else {
				LePlateau1Chaine=UnPlateau
				LePlateau2Chaine=''
			}
			if (LePlateau1Chaine.length==LePlateau2Chaine.length) {UnPlateau=LePlateau1Chaine} else {UnPlateau=LePlateau2Chaine}	
			alert(UnPlateau)
		}
		if (UnPlateau=='' && JeuMoteur!=REVERSI) {
			alert(MOT_PLATEAU)}
		else {					
			MoveId++;
			if (JeuMoteur==4) //NAVALE
				{Gains=''} else {Gains='&Gain1='+UnGain1+'&Gain2='+UnGain2}
			URLsrc=URLMoteur+'?Game='+Partie+Move+Gains+'&Turn='+Tour+'&MoveId='+MoveId+'&Referee=&Tray='+UnPlateau;
			document.getElementById("MontreURL").value=URLsrc;	
			document.getElementById("Moteur").src=URLsrc;
		}
	}
}

function AppelMoteurPlateau() {	
	AppelMoteur(IsJoueur1,'TEST')
}

function ChoixPlateau() {
	Choix=document.getElementById('LePlateau').value;
	if (Choix == '') {
		document.getElementById("MontreURL").value="";	
		document.getElementById("Moteur").src="about:blank";	
		document.getElementById("Query").value	='';
		document.getElementById('Plateau').value='';
		VersInterface('Method=None');
	} else { 
		document.getElementById('Plateau').value=Choix;
		Rang=document.getElementById('LePlateau').selectedIndex;
		UnGain1=ChaineTabGain1[Rang-1];if (UnGain1=="") {Ote('Gain1')} else {Ajout('Gain1',UnGain1)}
		UnGain2=ChaineTabGain2[Rang-1];if (UnGain2=="") {Ote('Gain2')} else {Ajout('Gain2',UnGain2)}	
		UnMove1=ChaineTabMove1[Rang-1];if (UnMove1=="") {Ote('Move1')} else {IsJoueur1=false;Ajout('Move1',UnMove1)}
		UnMove2=ChaineTabMove2[Rang-1];if (UnMove2=="") {Ote('Move2')} else {IsJoueur1=true;Ajout('Move2',UnMove2)}	
		Tour=ChaineTabTurn[Rang-1];
		Phase1=true;
		AffichePlateau()
	}
}




function Ote(Nom) {
	Existe=false;
	QueryNombre=0;
	LeQuery=document.getElementById("Query").value
	if (LeQuery.indexOf('=') > 0) {
		if (LeQuery.indexOf('&') <= 0) {
			Paire = LeQuery.split('=');		
			if (Paire[0].toLowerCase()==Nom.toLowerCase()) {
				document.getElementById("Query").value=''
			}
		} else {
			Params = LeQuery.split('&');  
			QueryNombre=Params.length
			for (i = 0; i < QueryNombre; i++) {  
				Paire = Params[i].split('=');  
				if (Paire[0].toLowerCase()==Nom.toLowerCase()) {
					QueryOte=i					
					Existe=true;
				} else {
					QueryNoms[i]=Paire[0]
					QueryValeurs[i]=Paire[1]; 
				}
			}
		}
	}
	if (Existe) {
		LeQuery=''
		if (QueryNombre>0) {
			for (i = 0; i < QueryNombre; i++) {  
				if (i != QueryOte) {
					if (LeQuery!='') {LeQuery+='&'}
					LeQuery+=QueryNoms[i]+'='+QueryValeurs[i]
				}
			}
		}
		document.getElementById("Query").value=LeQuery
	}
}

function RepercuteRetourMoteur() {
	if (IsLocalhost) {
		LeRetour=document.getElementById('Moteur').contentWindow.document.body.innerHTML
		if ( LeRetour != '') {
			LaValeur=LeRetour	
			document.getElementById('Retour').value=LaValeur
			if (JeuMoteur==4 && Tour==1) {//premier tour de NAVALE
				if (IsJoueur1) {UnGain1=LaValeur} else {UnGain1=LaValeur}
			} else {
				if (IsJoueur1) {UnMove1=LaValeur} else {UnMove2=LaValeur}
			}
		}
	} else {alert(MessNotLocal)}
}

function RepercuteSaisiePlateau() {
	if (IsLocalhost) {
		if (LePlateau=='') {alert(MOT_PLATEAU)}
		else {	
			LePlateau=window.frames[0].Webmaster('tray')	
			document.getElementById('Plateau').value=LePlateau
		}
	} else {alert(MessNotLocal)}
}

function VersInterface(UneQuery) {
	LaQuery=document.getElementById("Query").value
	if (LaQuery == '') {
		LaQuery=UneQuery
	} else {
		if (UneQuery!='') {LaQuery+='&'+UneQuery}
	}
	if (LaQuery != '') {LaQuery+='&'}
	URL=URLInterface+'?TestMoteur=Oui&'+LaQuery+'Tray='+LePlateau
	document.getElementById("Interface").src=URL;
}

function WebTest() {
	LePlateau=document.getElementById("Plateau").value;
	if (LePlateau=='') {alert(MOT_PLATEAU)}
	else {	
		if (IsJoueur1) {UneQuery='Input=One'} else {UneQuery='Input=Two'}
		VersInterface(UneQuery+'&webtest=oui')}
}