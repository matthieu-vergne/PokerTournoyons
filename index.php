<?php
//Entrées
$Partie=$_REQUEST['Game']; //On récupère le nom de partie
$MoveId=$_REQUEST['MoveId']; //On récupère le MoveId
$Arbitre=$_REQUEST['Referee']; //On récupère l'URL de l'arbitre
//Elaboration du jeu
$Valeur=mt_rand(1,3);
//On choisit son coup
//Sorties : On construit l'URL cible
if ($Arbitre=='') {print $Valeur;} else {
$URL=$Arbitre.'?Game='.$Partie.'&MoveId='.$MoveId.'&Value='.$Valeur;
fopen($URL,"r"); }
//On transmet à l'arbitre
//si fopen pose problème, essayer readfile()
?>