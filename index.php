<?php
/**************************************\
           INITIAL SETTING
\**************************************/
function error_handler($code, $message, $file, $line)
{
    if (0 == error_reporting())
    {
        return;
    }
    throw new ErrorException($message, 0, $code, $file, $line);
}

function exception_handler($exception) {
	echo "Une erreur est survenue : ".$exception;
	if (defined('TESTING_FEATURE')) {
		echo "<br/><br/>".TESTING_FEATURE;
	}
	phpinfo();
}

set_error_handler("error_handler");
set_exception_handler('exception_handler');
error_reporting(E_ALL);
ini_set('display_errors', '1');

include_once('Format.php');
include_once('card.php');

/**************************************\
           PARAMETERS READING
\**************************************/
$getParameter = function($name) {return isset($_REQUEST[$name]) ? $_REQUEST[$name] : null;};

$gains = array();
$gains[1] = $getParameter('Gain1');
$gains[2] = $getParameter('Gain2');
$game = $getParameter('Game');
$tray = $getParameter('Tray');
$turn = $getParameter('Turn');
$moves = array();
$moves[1] = $getParameter('Move1');
$moves[2] = $getParameter('Move2');
$moveId = $getParameter('MoveId');
$opponent = $getParameter('Opponent');
$referee = $getParameter('Referee');
$set = $getParameter('Set');
$timeout = $getParameter('TimeOut');

$rank = substr($tray, 0, 2);
$player = (($rank+1) % 2)+1;
$resultedTurns = substr($tray, 2, 2);
$step = substr($tray, 4, 1);
$cards = array();
$cards[1][1] = new Card(substr($tray, 5, 2));
$cards[1][2] = new Card(substr($tray, 7, 2));
$cards[2][1] = new Card(substr($tray, 9, 2));
$cards[2][2] = new Card(substr($tray, 11, 2));
$betStart = strpos($tray, 'M');
$trayCards = array();
for($i = 13 ; $i < $betStart ; $i += 2) {
	$trayCards[] = new Card(substr($tray, $i, 2));
}
$isFirstToBet = substr($tray, $betStart + 1, 1) == '?';
$betStart += $isFirstToBet ? 2 : 1;
$bets = array();
$split = explode('-', substr($tray, $betStart));
$bets[1] = $split[0];
$bets[2] = $split[1];

/**************************************\
                  GAME
\**************************************/
$login = 'tester';
$value = mt_rand(0, 5);

/**************************************\
                 RESULTS
\**************************************/
if ($referee == null) {
	$time = date('Y-m-d H:i:s', filemtime(__FILE__));
	$commit = htmlspecialchars(exec('git log -1 --pretty=format:"%h - %s"'));
	$source = $_SERVER['QUERY_STRING'];
	echo "Gains: ".print_r($gains, true)."<br/>";
	echo "Game: $game<br/>";
	echo "Rank: $rank (player $player)<br/>";
	echo "Resulted turns: $resultedTurns<br/>";
	echo "Step: $step<br/>";
	echo "Cards 1: ".Format::arrayToString($cards[1])."<br/>";
	echo "Cards 2: ".Format::arrayToString($cards[2])."<br/>";
	echo "Tray cards: ".Format::arrayToString($trayCards)."<br/>";
	echo "First to bet? ".($isFirstToBet ? 'Yes' : 'No')."<br/>";
	echo "Bets: ".print_r($bets, true)."<br/>";
	echo "Turn: $turn<br/>";
	echo "Moves: ".print_r($moves, true)."<br/>";
	echo "Move ID: $moveId<br/>";
	echo "Opponent: $opponent<br/>";
	echo "Set: $set<br/>";
	echo "Timeout: $timeout<br/>";
	echo "<br/>";
	echo "Value: $value<br/>";
	echo "<br/>";
	echo "($time - $commit)<br/>";
	echo "Source: $source<br/>";
} else {
	$url = "$referee?Game=$game&MoveId=$moveId&Login=$login&Value=$value";
	fopen($url,"r");
}
?>