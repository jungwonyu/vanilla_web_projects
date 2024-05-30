document.addEventListener('DOMContentLoaded', () => {
  const get = (target, parent = document) => parent.querySelector(target);
  const video = document.getElementById('video');
  const container = get('.container');
  const playBtn = get('.play');
  const pauseBtn = get('.pause');
  const stopBtn = get('.stop');
  const timeStamp = get('.timeStamp');
  const progressbar = get('.progressbar');
  const dot = get('.dot', progressbar);

  playBtn.addEventListener('click', () => play());
  pauseBtn.addEventListener('click', () => pause());
  stopBtn.addEventListener('click', () => stop());
  video.addEventListener('timeupdate', () => timeUpdate());
  dot.addEventListener('mousedown', () => progress());

  play = () => {
    video.play();
    container.classList.add('isPlaying');
  };

  pause = () => {
    video.pause();
    container.classList.remove('isPlaying');
  };

  stop = () => {
    video.pause();
    video.currentTime = 0;
    timeStamp.innerText = '0:00';
    container.classList.remove('isPlaying');
    dot.style.left = '0%';
  };

  timeUpdate = () => {
    const minutes = Math.floor(video.currentTime / 60);
    let seconds = Math.floor(video.currentTime % 60);

    seconds < 10 && (seconds = '0' + seconds);
    timeStamp.innerText = `${minutes}:${seconds}`;
    dot.style.left = `${(video.currentTime / video.duration) * 100}%`;

    if (video.ended) {
      clearInterval(timer);
      container.classList.remove('isPlaying');
    }
  };

  progress = () => {
    const rect = progressbar.getBoundingClientRect();
    const max = progressbar.offsetWidth;

    const move = (e) => {
      let left = e.clientX - rect.left;
      left < 0 && (left = 0);
      left > max && (left = max);
      dot.style.left = `${left}px`;
      video.currentTime = (left / max) * video.duration;
    };

    const up = () => {
      document.removeEventListener('mousemove', move);
      document.removeEventListener('mouseup', up);
    };

    document.addEventListener('mousemove', move);
    document.addEventListener('mouseup', up);
  }
});
