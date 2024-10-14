document.getElementById('login-form').addEventListener('submit', async function (e) {
    e.preventDefault(); 
  
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
  
    if (!username || !password) {
      alert('Por favor, preencha todos os campos.');
      return;
    }
  
    try {
      const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        localStorage.setItem('authorization', data.token);
        alert('Login realizado com sucesso!');
        window.location.href = 'dashboard.html'; 
      } else {
        alert(`Erro: ${data.message}`);
      }
    } catch (error) {
      alert('Erro ao realizar login, tente novamente mais tarde.');
      console.error('Erro:', error);
    }
  });
  