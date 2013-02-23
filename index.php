<?php
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

$getParameter = function($name) {return isset($_REQUEST[$name]) ? $_REQUEST[$name] : null;};

$gain1 = $getParameter('Gain1');
$gain2 = $getParameter('Gain2');
$game = $getParameter('Game');
$tray = $getParameter('Tray');
$turn = $getParameter('Turn');
$move1 = $getParameter('Move1');
$move2 = $getParameter('Move2');
$moveId = $getParameter('MoveId');
$opponent = $getParameter('Opponent');
$referee = $getParameter('Referee');
$set = $getParameter('Set');
$timeout = $getParameter('TimeOut');


// decision making
$login = 'tester';
$value = mt_rand(1,3);

// send results
if ($referee == null) {
	$time = date('Y-m-d H:i:s', filemtime(__FILE__));
	$commit = htmlspecialchars(exec('git log -1 --pretty=format:"%h - %s"'));
	$source = $_SERVER['QUERY_STRING'];
	echo "Value: $value<br/>";
	echo "<br/>";
	echo "($time - $commit)<br/>";
	echo "Source: $source<br/>";
} else {
	$url = "$referee?Game=$game&MoveId=$moveId&Login=$login&Value=$value";
	fopen($url,"r");
}
?>