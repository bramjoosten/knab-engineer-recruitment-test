<?php

$API_KEY = '127ad382-3615-4987-b190-08711ec6962d';
$url = 'https://pro-api.coinmarketcap.com';

parse_str($_SERVER['QUERY_STRING'], $incoming_params);

// build the request URL
$outgoing_request = "{$url}{$incoming_params['path']}"; 

// remove path for outgoing request
unset($incoming_params['path']);

// query string encode the parameters
// $filtered_qs = http_build_query($incoming_params); 
$filtered_qs = http_build_query($incoming_params); 

// attach filtered query params
$outgoing_request .= "?{$filtered_qs}";


$headers = [
  'Accepts: application/json',
  'Accept-Encoding: deflate, gzip',
  'X-CMC_PRO_API_KEY: 127ad382-3615-4987-b190-08711ec6962d'
];

// echo $outgoing_request;
$curl = curl_init(); // Get cURL resource

// Set cURL options
curl_setopt_array($curl, array(
  CURLOPT_URL => $outgoing_request,            // set the request URL
  CURLOPT_HTTPHEADER => $headers,     // set the headers 
  CURLOPT_RETURNTRANSFER => 1         // ask for raw response instead of bool
));

$response = curl_exec($curl); // Send the request, save the response



if ( ! function_exists('gzdecode'))
{
    /**
     * Decode gz coded data
     * 
     * http://php.net/manual/en/function.gzdecode.php
     * 
     * Alternative: http://digitalpbk.com/php/file_get_contents-garbled-gzip-encoding-website-scraping
     * 
     * @param string $data gzencoded data
     * @return string inflated data
     */
    function gzdecode($data) 
    {
        // strip header and footer and inflate

        return gzinflate(substr($data, 10, -8));
    }
}
echo gzdecode($response);
curl_close($curl); // Close request

// enable_cors();

function enable_cors() {
  // Allow from any origin
  if (isset($_SERVER['HTTP_ORIGIN'])) {
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    header('Access-Control-Allow-Credentials: true');;
    header('Access-Control-Max-Age: 86400');	// cache for 1 day
  } else {
    header('accept-encoding: gzip/deflate');
    header("Access-Control-Allow-Origin: *");
    header('Access-Control-Allow-Credentials: true');;
    header('Access-Control-Max-Age: 86400');	// cache for 1 day
  }

  // Access-Control headers are received during OPTIONS requests
  if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    echo "REQUEST_METHOD == 'options' ";
    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
      header("Access-Control-Allow-Methods: GET, POST, OPTIONS");		 

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
      header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");

    exit(0);
  }
}

// ini_set('display_startup_errors', 1);
//     ini_set('display_errors', 1);
// 	error_reporting(-1);
?>