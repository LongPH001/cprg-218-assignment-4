async function getJoke() {
    const setupElement = document.getElementById('setup');
    const punchlineElement = document.getElementById('punchline');
  
    setupElement.textContent = 'Loading...';
    punchlineElement.textContent = '';
  
    try {
      const response = await fetch('https://official-joke-api.appspot.com/random_joke');
      const joke = await response.json();
  
      setupElement.textContent = joke.setup;
      punchlineElement.textContent = joke.punchline;
    } catch (error) {
      setupElement.textContent = 'Oops! Something went wrong.';
      punchlineElement.textContent = '';
      console.error('Error fetching joke:', error);
    }
  }
  