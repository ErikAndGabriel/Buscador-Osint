// Funções de consulta para as APIs

// Consulta de CEP
async function consultarCEP(cep) {
    try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();
        
        if (data.erro) {
            return { error: 'CEP não encontrado' };
        }
        
        return data;
    } catch (error) {
        return { error: 'Erro ao consultar CEP' };
    }
}

// Consulta de CNPJ
async function consultarCNPJ(cnpj) {
    try {
        const response = await fetch(`https://receitaws.com.br/v1/cnpj/${cnpj}`);
        const data = await response.json();
        
        if (data.status === 'ERROR') {
            return { error: data.message || 'CNPJ não encontrado' };
        }
        
        return data;
    } catch (error) {
        return { error: 'Erro ao consultar CNPJ' };
    }
}

// Consulta de IP
async function consultarIP(ip) {
    try {
        const response = await fetch(`http://ip-api.com/json/${ip}`);
        const data = await response.json();
        
        if (data.status === 'fail') {
            return { error: data.message || 'IP não encontrado' };
        }
        
        return data;
    } catch (error) {
        return { error: 'Erro ao consultar IP' };
    }
}

// Consulta de MAC Address
async function consultarMAC(mac) {
    try {
        const response = await fetch(`https://api.maclookup.app/v2/macs/${mac}`);
        const data = await response.json();
        
        if (data.error) {
            return { error: data.error };
        }
        
        return data;
    } catch (error) {
        return { error: 'Erro ao consultar MAC Address' };
    }
}

// Consulta de Whois (simulada)
async function consultarWhois(domain) {
    try {
        // Em produção, usar API de whois real
        return {
            domain: domain,
            status: 'Ativo',
            created: '2020-01-01',
            expires: '2025-01-01',
            registrar: 'Registrar Example',
            nameservers: ['ns1.example.com', 'ns2.example.com']
        };
    } catch (error) {
        return { error: 'Erro ao consultar Whois' };
    }
}

// Consulta de DDD
async function consultarDDD(ddd) {
    try {
        // API simulada - em produção usar API real
        const dddData = {
            '11': { estado: 'São Paulo', cidades: ['São Paulo', 'Guarulhos', 'Osasco'] },
            '21': { estado: 'Rio de Janeiro', cidades: ['Rio de Janeiro', 'Niterói', 'Duque de Caxias'] },
            '31': { estado: 'Minas Gerais', cidades: ['Belo Horizonte', 'Contagem', 'Betim'] },
            '41': { estado: 'Paraná', cidades: ['Curitiba', 'Londrina', 'Maringá'] },
            '51': { estado: 'Rio Grande do Sul', cidades: ['Porto Alegre', 'Caxias do Sul', 'Pelotas'] }
        };
        
        if (dddData[ddd]) {
            return dddData[ddd];
        } else {
            return { error: 'DDD não encontrado' };
        }
    } catch (error) {
        return { error: 'Erro ao consultar DDD' };
    }
}

// Consulta de BIN
async function consultarBIN(bin) {
    try {
        const response = await fetch(`https://lookup.binlist.net/${bin}`);
        if (!response.ok) {
            return { error: 'BIN não encontrado' };
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        return { error: 'Erro ao consultar BIN' };
    }
}

// Consulta de Usuário (simulada)
async function consultarUsuario(usuario) {
    try {
        // Simulação de consulta em múltiplos sites
        const sites = [
            'Facebook', 'Instagram', 'Twitter', 'LinkedIn', 'GitHub',
            'YouTube', 'Reddit', 'Pinterest', 'TikTok', 'Snapchat',
            'WhatsApp', 'Telegram', 'Discord', 'Twitch', 'Spotify',
            'Netflix', 'Amazon', 'Google', 'Yahoo', 'Microsoft',
            'Apple', 'Dropbox', 'Evernote', 'Slack', 'Trello',
            'WordPress', 'Blogger', 'Medium', 'Quora', 'Stack Overflow'
        ];
        
        const results = {};
        
        sites.forEach(site => {
            // Simulação aleatória de resultados
            const exists = Math.random() > 0.7;
            results[site] = exists ? `https://${site.toLowerCase()}.com/${usuario}` : 'Não encontrado';
        });
        
        return results;
    } catch (error) {
        return { error: 'Erro ao consultar usuário' };
    }
}
