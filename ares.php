<?php
declare(strict_types=1);

/**
 * Backend API pre Úlohu č. 3 - ARES Bridge
 * Verzia: PRO (Strict Typing, HTTP Status Codes)
 */

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');

// Pomocná funkcia pre vrátenie chýb so správnym HTTP kódom
function sendError(string $message, int $httpCode = 400): void {
    http_response_code($httpCode);
    echo json_encode(['error' => $message]);
    exit;
}

$icoParam = $_GET['ico'] ?? '';

// Sanitizácia: Odstránenie všetkého okrem číslic
$ico = preg_replace('/\D/', '', $icoParam);

if (strlen($ico) !== 8) {
    sendError('Neplatný formát IČO. Vyžaduje sa presne 8 číslic.', 400);
}

// REST Endpoint ARES
$url = "https://ares.gov.cz/ekonomicke-subjekty-v-be/rest/ekonomicke-subjekty/" . $ico;

$options = [
    "http" => [
        "header"  => "Accept: application/json\r\n",
        "method"  => "GET",
        "timeout" => 10,
        "ignore_errors" => true // Aby sme mohli spracovať aj 404 od ARES
    ]
];

$context = stream_context_create($options);
$response = @file_get_contents($url, false, $context);

if ($response === false) {
    sendError('Zlyhala komunikácia so serverom ARES.', 503);
}

// Skontrolujeme hlavičky z ARES odpovede pre zachytenie 404 (Nenájdené)
if (isset($http_response_header) && strpos($http_response_header[0], '404') !== false) {
    sendError('Subjekt s týmto IČO sa v registri nenachádza.', 404);
}

// Úspešná odpoveď
http_response_code(200);
echo $response;