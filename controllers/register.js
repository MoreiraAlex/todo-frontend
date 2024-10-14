document.getElementById('register-form').addEventListener('submit', async function (e) {
    e.preventDefault();
  
    const username = document.getElementById('username').value.toLowerCase();
    const password = document.getElementById('password').value;
  
    if (!username || !password) {
      alert('Por favor, preencha todos os campos.');
      return;
    }
  
    try {
      const response = await fetch('http://localhost:3000/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        alert('Registro realizado com sucesso! Agora você pode fazer login.');
        window.location.href = 'login.html';
      } else {
        alert(`Erro: ${data.message}`);
      }
    } catch (error) {
      alert('Erro ao registrar usuário, tente novamente mais tarde.');
      console.error('Erro:', error);
    }
  });
  