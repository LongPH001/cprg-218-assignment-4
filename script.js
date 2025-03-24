async function getJoke() {
    const setupElement = document.getElementById('setup');
    const punchlineElement = document.getElementById('punchline');
  
    setupElement.textContent = 'Loading...';
    punchlineElement.textContent = '';
  
    try {
      const response = await fetch('https://official-joke-api.appspot.com/random_joke');
      const joke = await response.json();
  
      // Clear old joke
      setupElement.textContent = '';
      punchlineElement.textContent = '';
  
      // Typing animations with faster speed
      await typeText(setupElement, joke.setup, 20);
      await new Promise(resolve => setTimeout(resolve, 500)); // short pause
      await typeText(punchlineElement, joke.punchline, 25);
  
      // Add pop effect
      punchlineElement.classList.add('pop');
      setTimeout(() => {
        punchlineElement.classList.remove('pop');
      }, 400);
  
      // Play laughing sound immediately after punchline
      playLaughSound();
  
    } catch (error) {
      setupElement.textContent = 'Oops! Something went wrong.';
      punchlineElement.textContent = '';
      console.error('Error fetching joke:', error);
    }
  }
  
  // Function to type text letter by letter
  async function typeText(element, text, speed) {
    for (let i = 0; i < text.length; i++) {
      element.textContent += text.charAt(i);
      await new Promise(resolve => setTimeout(resolve, speed));
    }
  }
  
  // Play laughing sound effect — reliable source
  function playLaughSound() {
    const audio = new Audio('https://cdn.pixabay.com/audio/2022/03/15/audio_25b0ed47c4.mp3'); 
    audio.volume = 0.4;
    audio.play().catch(error => console.error("Audio play blocked:", error));
  }
  