const categoryTitles = {
    'Any': '🎲 Random Joke',
    'Programming': '💻 Programming Joke',
    'Misc': '🌀 Miscellaneous Joke',
    'Pun': '🤣 Pun Joke',
    'Spooky': '👻 Spooky Joke',
    'Christmas': '🎄 Christmas Joke'
  };
  
  async function getJoke(category = 'Any') {
    const setupElement = document.getElementById('setup');
    const punchlineElement = document.getElementById('punchline');
    const categoryTitleElement = document.getElementById('joke-category-title');
  
    // 1️⃣ Update the category title right away when the button is clicked:
    categoryTitleElement.textContent = categoryTitles[category] || 'Joke';
  
    // 2️⃣ Show a loading message for setup and clear punchline
    setupElement.textContent = 'Loading...';
    punchlineElement.textContent = '';
  
    // 3️⃣ Continue with the fetch and joke rendering...
    try {
      const response = await fetch(`https://v2.jokeapi.dev/joke/${category}?blacklistFlags=nsfw,religious,political,racist,sexist,explicit`);
      const joke = await response.json();
  
      setupElement.textContent = '';
      punchlineElement.textContent = '';
  
      if (joke.type === 'single') {
        await typeText(setupElement, joke.joke, 20);
        setupElement.classList.add('fade-in');
        playLaughSound();
      } else if (joke.type === 'twopart') {
        await typeText(setupElement, joke.setup, 20);
        setupElement.classList.add('fade-in');
        await new Promise(resolve => setTimeout(resolve, 700));
        await typeText(punchlineElement, joke.delivery, 25);
        punchlineElement.classList.add('pop');
        playLaughSound();
        setTimeout(() => {
          punchlineElement.classList.remove('pop');
        }, 400);
      } else {
        setupElement.textContent = 'No joke found!';
      }
  
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
  
  function playLaughSound() {
    const audio = new Audio('https://longph001.github.io/cprg-218-assignment-4/sounds/laugh.wav');
    audio.volume = 0.4;
    audio.play().catch(err => console.error('Audio play blocked:', err));
  }
  
  function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
  }
  