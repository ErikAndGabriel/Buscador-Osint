// Painel principal do sistema

document.addEventListener('DOMContentLoaded', function() {
    // Verificar se o usuário está logado
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
        window.location.href = 'login.html';
        return;
    }
    
    // Exibir nome do usuário
    document.getElementById('userName').textContent = user.name;
    
    // Navegação entre abas
    const navLinks = document.querySelectorAll('.nav-link');
    const tabContents = document.querySelectorAll('.tab-content');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remover classe active de todos os links
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Adicionar classe active ao link clicado
            this.classList.add('active');
            
            // Esconder todos os conteúdos
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Mostrar conteúdo correspondente
            const target = this.getAttribute('data-target');
            document.getElementById(target).classList.add('active');
        });
    });
    
    // Botão de logout
    document.getElementById('logoutBtn').addEventListener('click', function() {
        localStorage.removeItem('user');
        window.location.href = 'index.html';
    });
    
    // Consulta de CEP
    document.getElementById('cepBtn').addEventListener('click', async function() {
        const cepInput = document.getElementById('cepInput').value;
        const resultDiv = document.getElementById('cepResult');
        
        if (!validateCEP(cepInput)) {
            showError(resultDiv, 'CEP inválido. Digite 8 números.');
            return;
        }
        
        showLoading(resultDiv);
        const data = await consultarCEP(cepInput.replace(/\D/g, ''));
        
        if (data.error) {
            showError(resultDiv, data.error);
        } else {
            resultDiv.innerHTML = formatResult(data);
        }
    });
    
    // Consulta de CNPJ
    document.getElementById('cnpjBtn').addEventListener('click', async function() {
        const cnpjInput = document.getElementById('cnpjInput').value;
        const resultDiv = document.getElementById('cnpjResult');
        
        if (!validateCNPJ(cnpjInput)) {
            showError(resultDiv, 'CNPJ inválido. Digite 14 números.');
            return;
        }
        
        showLoading(resultDiv);
        const data = await consultarCNPJ(cnpjInput.replace(/\D/g, ''));
        
        if (data.error) {
            showError(resultDiv, data.error);
        } else {
            resultDiv.innerHTML = formatResult(data);
        }
    });
    
    // Consulta de IP
    document.getElementById('ipBtn').addEventListener('click', async function() {
        const ipInput = document.getElementById('ipInput').value;
        const resultDiv = document.getElementById('ipResult');
        
        if (!validateIP(ipInput)) {
            showError(resultDiv, 'IP inválido.');
            return;
        }
        
        showLoading(resultDiv);
        const data = await consultarIP(ipInput);
        
        if (data.error) {
            showError(resultDiv, data.error);
        } else {
            resultDiv.innerHTML = formatResult(data);
        }
    });
    
    // Consulta de MAC
    document.getElementById('macBtn').addEventListener('click', async function() {
        const macInput = document.getElementById('macInput').value;
        const resultDiv = document.getElementById('macResult');
        
        if (!validateMAC(macInput)) {
            showError(resultDiv, 'MAC Address inválido.');
            return;
        }
        
        showLoading(resultDiv);
        const data = await consultarMAC(macInput);
        
        if (data.error) {
            showError(resultDiv, data.error);
        } else {
            resultDiv.innerHTML = formatResult(data);
        }
    });
    
    // Consulta de Whois
    document.getElementById('whoisBtn').addEventListener('click', async function() {
        const whoisInput = document.getElementById('whoisInput').value;
        const resultDiv = document.getElementById('whoisResult');
        
        if (!whoisInput) {
            showError(resultDiv, 'Digite um domínio.');
            return;
        }
        
        showLoading(resultDiv);
        const data = await consultarWhois(whoisInput);
        
        if (data.error) {
            showError(resultDiv, data.error);
        } else {
            resultDiv.innerHTML = formatResult(data);
        }
    });
    
    // Consulta de DDD
    document.getElementById('dddBtn').addEventListener('click', async function() {
        const dddInput = document.getElementById('dddInput').value;
        const resultDiv = document.getElementById('dddResult');
        
        if (!validateDDD(dddInput)) {
            showError(resultDiv, 'DDD inválido. Digite 2 números.');
            return;
        }
        
        showLoading(resultDiv);
        const data = await consultarDDD(dddInput.replace(/\D/g, ''));
        
        if (data.error) {
            showError(resultDiv, data.error);
        } else {
            resultDiv.innerHTML = formatResult(data);
        }
    });
    
    // Consulta de BIN
    document.getElementById('binBtn').addEventListener('click', async function() {
        const binInput = document.getElementById('binInput').value;
        const resultDiv = document.getElementById('binResult');
        
        if (!validateBIN(binInput)) {
            showError(resultDiv, 'BIN inválido. Digite os 6 primeiros dígitos do cartão.');
            return;
        }
        
        showLoading(resultDiv);
        const data = await consultarBIN(binInput.replace(/\D/g, ''));
        
        if (data.error) {
            showError(resultDiv, data.error);
        } else {
            resultDiv.innerHTML = formatResult(data);
        }
    });
    
    // Consulta de Usuário
    document.getElementById('usuarioBtn').addEventListener('click', async function() {
        const usuarioInput = document.getElementById('usuarioInput').value;
        const resultDiv = document.getElementById('usuarioResult');
        
        if (!usuarioInput) {
            showError(resultDiv, 'Digite um nome de usuário.');
            return;
        }
        
        showLoading(resultDiv);
        const data = await consultarUsuario(usuarioInput);
        
        if (data.error) {
            showError(resultDiv, data.error);
        } else {
            let html = '<h3>Resultados da busca:</h3>';
            for (const [site, result] of Object.entries(data)) {
                if (result !== 'Não encontrado') {
                    html += `<div class="result-item"><span class="result-key">${site}:</span> <span class="result-value"><a href="${result}" target="_blank">${result}</a></span></div>`;
                } else {
                    html += `<div class="result-item"><span class="result-key">${site}:</span> <span class="result-value">${result}</span></div>`;
                }
            }
            resultDiv.innerHTML = html;
        }
    });
});
