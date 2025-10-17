// Sistema de autenticação simples (em produção, usar backend seguro)

// Verificar se o usuário está logado
function checkAuth() {
    const user = localStorage.getItem('user');
    if (!user && window.location.pathname.endsWith('painel.html')) {
        window.location.href = 'login.html';
    }
}

// Registrar novo usuário
document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.getElementById('registerForm');
    const loginForm = document.getElementById('loginForm');
    
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            
            // Validações básicas
            if (password !== confirmPassword) {
                showMessage('As senhas não coincidem', 'error');
                return;
            }
            
            if (password.length < 6) {
                showMessage('A senha deve ter pelo menos 6 caracteres', 'error');
                return;
            }
            
            // Verificar se o usuário já existe
            const users = JSON.parse(localStorage.getItem('users') || '[]');
            const userExists = users.find(user => user.email === email);
            
            if (userExists) {
                showMessage('Este e-mail já está cadastrado', 'error');
                return;
            }
            
            // Registrar novo usuário
            const newUser = {
                id: Date.now(),
                name,
                email,
                password: btoa(password) // Em produção, usar hash seguro
            };
            
            users.push(newUser);
            localStorage.setItem('users', JSON.stringify(users));
            
            showMessage('Cadastro realizado com sucesso!', 'success');
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 1500);
        });
    }
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            // Verificar credenciais
            const users = JSON.parse(localStorage.getItem('users') || '[]');
            const user = users.find(user => user.email === email && user.password === btoa(password));
            
            if (user) {
                // Login bem-sucedido
                localStorage.setItem('user', JSON.stringify({
                    id: user.id,
                    name: user.name,
                    email: user.email
                }));
                
                showMessage('Login realizado com sucesso!', 'success');
                setTimeout(() => {
                    window.location.href = 'painel.html';
                }, 1000);
            } else {
                showMessage('E-mail ou senha incorretos', 'error');
            }
        });
    }
});

// Mostrar mensagens
function showMessage(message, type) {
    const messageDiv = document.getElementById('message');
    messageDiv.textContent = message;
    messageDiv.className = `message ${type}`;
    messageDiv.style.display = 'block';
    
    setTimeout(() => {
        messageDiv.style.display = 'none';
    }, 5000);
}

// Verificar autenticação ao carregar a página
checkAuth();
