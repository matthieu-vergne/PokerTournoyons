<?php
$game = $_REQUEST['Game']; //On récupère le nom de partie
$moveId = $_REQUEST['MoveId']; //On récupère le MoveId
$referee = $_REQUEST['Referee']; //On récupère l'URL de l'arbitre

// decision making
$value = mt_rand(1,3);

// send results
if ($referee=='') {
	$time = date('Y-m-d H:i:s', filemtime(__FILE__));
	$commit = htmlspecialchars(exec('git log -1 --pretty=format:"%h - %s"'));
	echo "$value<br/>($time - $commit)";
} else {
	$url = "$referee?Game=$game&MoveId=$moveId&Value=$value";
	fopen($url,"r");
}
?>