<?php header('Access-Control-Allow-Origin: *'); echo json_encode( json_decode(file_get_contents("Handbook.json"),true) );