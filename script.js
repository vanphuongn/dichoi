window.onload = function () {
  // canvas init
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");

  // canvas dimensions
  var W = window.innerWidth;
  var H = window.innerHeight;
  canvas.width = W;
  canvas.height = H;

  // snowflake particles
  var mp = 25; // max particles
  var particles = [];
  for (var i = 0; i < mp; i++) {
    particles.push({
      x: Math.random() * W, // x-coordinate
      y: Math.random() * H, // y-coordinate
      r: Math.random() * 4 + 1, // radius
      d: Math.random() * mp, // density
    });
  }

  // Lets draw the flakes
  function draw() {
    ctx.clearRect(0, 0, W, H);

    ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
    ctx.beginPath();
    for (var i = 0; i < mp; i++) {
      var p = particles[i];
      ctx.moveTo(p.x, p.y);
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2, true);
    }
    ctx.fill();
    update();
  }

  // Function to move the snowflakes
  var angle = 0;
  function update() {
    angle += 0.01;
    for (var i = 0; i < mp; i++) {
      var p = particles[i];
      p.y += Math.cos(angle + p.d) + 1 + p.r / 2;
      p.x += Math.sin(angle) * 2;

      // Sending flakes back from the top when it exits
      if (p.x > W + 5 || p.x < -5 || p.y > H) {
        if (i % 3 > 0) {
          particles[i] = { x: Math.random() * W, y: -10, r: p.r, d: p.d };
        } else {
          if (Math.sin(angle) > 0) {
            particles[i] = { x: -5, y: Math.random() * H, r: p.r, d: p.d };
          } else {
            particles[i] = { x: W + 5, y: Math.random() * H, r: p.r, d: p.d };
          }
        }
      }
    }
  }

  // animation loop
  setInterval(draw, 33);
};

function yesClick() {
  var message = "Bạn gái đã đồng ý đi chơi";

  var token = '1677444880:AAHC0UgHkuf0Y7NqsubVJSN4Q0WpPfFOYb8';
  var chat_id = "662991734";
  var url = 'https://api.telegram.org/bot${token}/sendMessage?chat_id=${chat_id}text=${message}&parse_mode=html';

  $.ajax({
    url: 'https://api.telegram.org/bot' + token + '/sendMessage',
    method: 'POST',
    data: { chat_id: chat_id, text: message },
    success: function () {
      // alert('your message has been sent!');
    }
  });

  alert("Phương đã nhận được câu trả lời, tối thứ 6 chơi em nhé!");
}

function noHover() {
  var x = Math.floor(Math.random() * window.innerWidth);
  var y = Math.floor(Math.random() * window.innerHeight);
  document.getElementById("btnNo").style.left = x + "px";
  document.getElementById("btnNo").style.top = y + "px";
}
