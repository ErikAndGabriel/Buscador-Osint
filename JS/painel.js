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
            showError(resultDiv, 'CEP inválido.
