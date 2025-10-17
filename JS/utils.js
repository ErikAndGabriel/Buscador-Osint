// Funções utilitárias

// Formatar dados para exibição
function formatData(data) {
    if (typeof data === 'object') {
        return JSON.stringify(data, null, 2);
    }
    return data;
}

// Validar CEP
function validateCEP(cep) {
    cep = cep.replace(/\D/g, '');
    return /^[0-9]{8}$/.test(cep);
}

// Validar CNPJ
function validateCNPJ(cnpj) {
    cnpj = cnpj.replace(/\D/g, '');
    return /^[0-9]{14}$/.test(cnpj);
}

// Validar IP
function validateIP(ip) {
    const ipRegex = /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    return ipRegex.test(ip);
}

// Validar MAC Address
function validateMAC(mac) {
    const macRegex = /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/;
    return macRegex.test(mac);
}

// Validar DDD
function validateDDD(ddd) {
    ddd = ddd.replace(/\D/g, '');
    return /^[0-9]{2}$/.test(ddd);
}

// Validar BIN
function validateBIN(bin) {
    bin = bin.replace(/\D/g, '');
    return /^[0-9]{6}$/.test(bin);
}

// Mostrar loading
function showLoading(element) {
    element.innerHTML = '<div class="loading">Consultando...</div>';
}

// Mostrar erro
function showError(element, message) {
    element.innerHTML = `<div class="error">${message}</div>`;
}

// Formatar resultado
function formatResult(data) {
    let html = '';
    
    if (typeof data === 'object') {
        for (const [key, value] of Object.entries(data)) {
            if (value && typeof value !== 'object') {
                const formattedKey = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
                html += `<div class="result-item"><span class="result-key">${formattedKey}:</span> <span class="result-value">${value}</span></div>`;
            }
        }
    } else {
        html = `<div class="result-item">${data}</div>`;
    }
    
    return html || '<div class="result-item">Nenhum dado encontrado</div>';
}
