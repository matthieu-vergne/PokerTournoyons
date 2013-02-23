<?php
class Card {
	const T_SPADE = 'S';
	const T_CLUB = 'C';
	const T_HEART = 'H';
	const T_DIAMOND = 'D';
	
	const V_2 = '2';
	const V_3 = '3';
	const V_4 = '4';
	const V_5 = '5';
	const V_6 = '6';
	const V_7 = '7';
	const V_8 = '8';
	const V_9 = '9';
	const V_10 = 'T';
	const V_JACK = 'J';
	const V_QUEEN = 'Q';
	const V_KING = 'K';
	const V_AS = 'A';// specifications
	const V_AS2 = '1';// tester
	
	const UNKNOWN = '?';
	
	public function __construct($code) {
		if (strlen($code) != 2) {
			throw new Exception("Invalid card code: $code");
		}
		$this->setType($code[0]);
		$this->setRank($code[1]);
	}
	
	private $type = null;
	private function setType($type) {
		switch($type) {
			case Card::T_SPADE:
			case Card::T_CLUB:
			case Card::T_HEART:
			case Card::T_DIAMOND:
			case Card::UNKNOWN:
				$this->type = $type;
				break;
			default:
				throw new Exception("Invalid card type: $type");
		}
	}
	
	public function getType() {
		return $this->type;
	}
	
	private $rank = null;
	private function setRank($rank) {
		switch($rank) {
			case Card::V_2:
			case Card::V_3:
			case Card::V_4:
			case Card::V_5:
			case Card::V_6:
			case Card::V_7:
			case Card::V_8:
			case Card::V_9:
			case Card::V_10:
			case Card::V_JACK:
			case Card::V_QUEEN:
			case Card::V_KING:
			case Card::V_AS:
			case Card::V_AS2:
			case Card::UNKNOWN:
				$this->rank = $rank;
				break;
			default:
				throw new Exception("Invalid card rank: $rank");
		}
	}
	
	public function getRank() {
		return $this->rank;
	}
	
	public function __toString() {
		return $this->type.$this->rank;
	}
}
?>