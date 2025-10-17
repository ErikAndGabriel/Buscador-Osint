<?php
// Arquivo PHP para consultas que requerem backend
// Pode ser usado para consultas mais complexas ou para evitar problemas de CORS

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $tipo = $data['tipo'] ?? '';
    $parametro = $data['parametro'] ?? '';
    
    switch ($tipo) {
        case 'cep':
            // Consulta CEP via backend
            $url = "https://viacep.com.br/ws/{$parametro}/json/";
            break;
            
        case 'cnpj':
            // Consulta CNPJ via backend
            $url = "https://receitaws.com.br/v1/cnpj/{$parametro}";
            break;
            
        case 'ip':
            // Consulta IP via backend
            $url = "http://ip-api.com/json/{$parametro}";
            break;
            
        case 'mac':
            // Consulta MAC via backend
            $url = "https://api.maclookup.app/v2/macs/{$parametro}";
            break;
            
        default:
            echo json_encode(['error' => 'Tipo de consulta não suportado']);
            exit;
    }
    
    $response = file_get_contents($url);
    echo $response;
} else {
    echo json_encode(['error' => 'Método não permitido']);
}
?>
