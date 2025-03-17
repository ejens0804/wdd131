// script.js

// Music recommendations object
const recommendations = {
    focus: [
      { title: "Lo-Fi Beats", file: "music/Ambient-Lo-Fi-Beat.wav" },
      { title: "Instrumental Chillhop", file: "music/Flames.wav" },
      { title: "Relaxing Beats for Focus", file: "music/HoliznaCC0 - When Time Called Me Darling ( Lofi, Relaxing, Chill).mp3" }
    ],
    relax: [
      { title: "Classical Piano", file: "music/Alex-Productions - Classical Piano Instrumental _ Gentle Piano.mp3" },
      { title: "White Noise with Chimes", file: "music/Chimes White noise.mp3" },
      { title: "Nature Sounds", file: "music/nature-sounds.mp3" }
    ],
    energy: [
      { title: "Upbeat Electronic", file: "music/Alex-Productions - Electronic Dance Upbeat.mp3" },
      { title: "Upbeat Pop", file: "music/Lowtone Music - Upbeat Pop.mp3" },
      { title: "Motivational Rock", file: "music/Alex-Productions - Powerful Rock motivational _ Hard As Steel.mp3" }
    ]
  };
  

  // DOM Elements
  const moodForm = document.getElementById("mood-form");
  const resultsDiv = document.getElementById("recommendation-results");
  const audioPlayer = document.createElement("audio");
  audioPlayer.controls = true;
  audioPlayer.classList.add("custom-audio"); // Add custom class for styling
  
  // Event Listener
  moodForm.addEventListener("submit", function (e) {
    e.preventDefault();
  
    const selectedMood = document.querySelector("input[name='mood']:checked");
  
    if (selectedMood) {
      displayRecommendations(selectedMood.value);
    } else {
      resultsDiv.innerHTML = `<p>Please select a mood to see suggestions!</p>`;
    }
  });


  // Display function
  function displayRecommendations(mood) {
    const moodRecs = recommendations[mood];
  
    let output = `<h3>Recommended Playlists:</h3><ul>`;
    moodRecs.forEach((rec) => {
      output += `<li>🎵 ${rec}</li>`;
    });
    output += `</ul>`;
  
    resultsDiv.innerHTML = output;
  }
function changeBackgroundColor(mood) {
    const body = document.body;
    const form = document.getElementById("mood-form");
    let color;
    switch (mood) {
        case 'focus':
            color = '#f0f8ff'; // Light blue
            break;
        case 'relax':
            color = '#e6e6fa'; // Lavender
            break;
        case 'energy':
            color = '#ffefd5'; // Papaya whip
            break;
        default:
            color = '#ffffff'; // White
    }
    body.style.backgroundColor = color;
    form.style.backgroundColor = color;
}

function displayRecommendations(mood) {
    const moodRecs = recommendations[mood];

    let output = `<h3>Recommended Playlists:</h3><ul>`;
    moodRecs.forEach((rec) => {
        output += `<li>🎵 ${rec}</li>`;
    });
    output += `</ul>`;

    resultsDiv.innerHTML = output;
    changeBackgroundColor(mood);
}



  
  // Display function
  function displayRecommendations(mood) {
    const moodRecs = recommendations[mood];
  
    let output = `<h3>Recommended Playlists:</h3><ul>`;
    moodRecs.forEach((rec, index) => {
      output += `<li><button class="play-btn" data-file="${rec.file}">🎵 ${rec.title}</button></li>`;
    });
    output += `</ul>`;
  
    resultsDiv.innerHTML = output;
    resultsDiv.appendChild(audioPlayer);
  
    // Add event listeners to buttons
    document.querySelectorAll(".play-btn").forEach((btn) => {
      btn.addEventListener("click", function () {
        const file = this.getAttribute("data-file");
        audioPlayer.src = file;
        audioPlayer.play();
      });
    });
  }