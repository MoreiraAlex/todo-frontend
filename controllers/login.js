document.getElementById('login-form').addEventListener('submit', async function (e) {
    e.preventDefault(); 
  
    const username = document.getElementById('username').value.toLowerCase();
    const password = document.getElementById('password').value;
    const loginButton = document.getElementById('login-button');
  
    if (!username || !password) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    loginButton.disabled = true;    
  
    try {
      const response = await fetch('https://todo-backend-a972.onrender.com/auth/login', {
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
    } finally {
      loginButton.disabled = false;
    }
  });
  