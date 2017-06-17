$(document).ready(function () {

  canvas();

});

function canvas() {
  var Particle, particleCount, particles, sketch, z, context;

  sketch = Sketch.create({
    container: document.getElementById('home')
  });


  particles = [];

  particleCount = 750;
  sketch.strokeStyle = 'hsla(' + random(0, 120) + ', 100%, 47%, 1)';
  
  var time = setInterval(function () {
    sketch.strokeStyle = 'hsla(' + random(0, 120) + ', 100%, 47%, 1)';
  }, 2000);

  sketch.globalCompositeOperation = 'lighter';

  Particle = function () {
    this.x = random(sketch.width);
    this.y = random(sketch.height, sketch.height * 2);
    this.vx = 0;
    this.vy = -random(1, 10) / 5;
    this.radius = this.baseRadius = 1;
  };

  Particle.prototype = {
    update: function () {
      var dist, distx, disty, radius;
     
      dist = sqrt(distx * distx + disty * disty);
  
      this.vx += (random(100) - 50) / 1000;
      this.vy -= random(1, 20) / 10000;
      this.x += this.vx;
      this.y += this.vy;
      
    },
    render: function () {
      sketch.beginPath();
      sketch.arc(this.x, this.y, this.radius, 0, TWO_PI);
      sketch.closePath();
      sketch.fillStyle = 'hsla(' + this.hue + ', 60%, 40%, 0.5)';
      sketch.fill();
      return sketch.stroke();
    }
  };

  z = particleCount;

  while (z--) {
    particles.push(new Particle());
  }

  sketch.clear = function () {
    return sketch.clearRect(0, 0, sketch.width, sketch.height);
  };

  sketch.update = function () {
    var i, results;
    i = particles.length;
    results = [];
    while (i--) {
      results.push(particles[i].update());
    }
    return results;
  };

  sketch.draw = function () {
    var i, results;
    i = particles.length;
    results = [];
    while (i--) {
      results.push(particles[i].render());
    }
    return results;
  };

  $(window).resize(function () {
    particles = [];
    sketch.strokeStyle = 'hsla(' + random(0, 120) + ', 100%, 47%, 1)';
    z = particleCount;
    while (z--) {
      particles.push(new Particle());
    }
  });

}
