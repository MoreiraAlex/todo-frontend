document.getElementById('login-form').addEventListener('submit', async function (e) {
    e.preventDefault(); 
  
    const username = document.getElementById('username').value.toLowerCase();
    const password = document.getElementById('password').value;
  
    if (!username || !password) {
      alert('Por favor, preencha todos os campos.');
      return;
    }
  
    try {
      const response = await fetch('http://18.230.152.7:3000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        localStorage.setItem('token', data.token);
        window.location.href = 'index.html'; 
      } else {
        alert(`Erro: ${data.message}`);
      }
    } catch (error) {
      alert('Erro ao realizar login, tente novamente mais tarde.');
      console.error('Erro:', error);
    }
  });
  