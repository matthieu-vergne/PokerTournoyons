<?php
//Entrées
$game = $_REQUEST['Game']; //On récupère le nom de partie
$moveId = $_REQUEST['MoveId']; //On récupère le MoveId
$referee = $_REQUEST['Referee']; //On récupère l'URL de l'arbitre

//Elaboration du jeu
$value = mt_rand(1,3);

//On choisit son coup

//Sorties : On construit l'URL cible
$url = "$referee?Game=$game&MoveId=$moveId&Value=$value";

//On transmet à l'arbitre
if ($referee=='') {
	print $value;
} else {
	fopen($url,"r");
}
//si fopen pose problème, essayer readfile()
?>