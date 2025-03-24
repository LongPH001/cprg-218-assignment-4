async function getJoke() {
    const setupElement = document.getElementById('setup');
    const punchlineElement = document.getElementById('punchline');
  
    setupElement.textContent = 'Loading...';
    punchlineElement.textContent = '';
  
    try {
      const response = await fetch('https://official-joke-api.appspot.com/random_joke');
      const joke = await response.json();
  
      // Clear text before typing
      setupElement.textContent = '';
      punchlineElement.textContent = '';
  
      // Typing animation function
      await typeText(setupElement, joke.setup, 40);
      await new Promise(resolve => setTimeout(resolve, 600)); // small pause before punchline
      await typeText(punchlineElement, joke.punchline, 50);
    } catch (error) {
      setupElement.textContent = 'Oops! Something went wrong.';
      punchlineElement.textContent = '';
      console.error('Error fetching joke:', error);
    }
  }
  
  async function typeText(element, text, speed) {
    for (let i = 0; i < text.length; i++) {
      element.textContent += text.charAt(i);
      await new Promise(resolve => setTimeout(resolve, speed));
    }
  }
  