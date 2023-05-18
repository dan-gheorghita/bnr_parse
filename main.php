<?php
$xmlDoc = new DOMDocument();
$xmlDoc->load("https://www.bnr.ro/nbrfxrates.xml");
$intros = $xmlDoc->getElementsByTagName("Rate");

class template{
    public $date;
    public $rates = array();
}
$object = new template();
$date_elem = $xmlDoc->getElementsByTagName("Cube") ;
$date = $date_elem[0] -> getAttribute('date');
$object -> date = $date; 
foreach( $intros as $intro ) {
     $attribute = $intro ->getAttribute('currency');
     if($intro ->getAttribute('multiplier'))
        $object -> rates[] = array('currency' => $attribute ,'multiplier' => $intro ->getAttribute('multiplier'), 'value' =>$intro ->nodeValue);
     else $object -> rates[] = array('currency' => $attribute ,'value'=>$intro ->nodeValue);
    }

$json = json_encode($object );
print_r($json);
?>