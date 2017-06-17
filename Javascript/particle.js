$(document).ready(function () {

  canvas();

});

function canvas() {
  var Particle, particleCount, particles, sketch, z, context;

  sketch = Sketch.create({
    container: document.getElementById('canvas')
  });


  particles = [];

  particleCount = 300;
  sketch.strokeStyle = 'hsla(' + random(0, 120) + ', 100%, 47%, 1)';
  sketch.fillStyle = 'hsla(' + random(0, 120)  + ', 100%, 47%, 1)';
  
  var time = setInterval(function () {
    sketch.strokeStyle = 'hsla(' + random(0, 120) + ', 100%, 47%, 1)';
    sketch.fillStyle = 'hsla(' + random(0, 120)  + ', 100%, 47%, 1)';
  }, 2000);

  sketch.globalCompositeOperation = 'lighter';

  Particle = function () {
    this.x = random(sketch.width);
    this.y = random(sketch.height, sketch.height * 2);
    this.vx = 0;
    this.vy = -random(1, 10) / 5;
    this.radius = this.baseRadius = 5;
    this.maxRadius = 30;
    this.threshold = 150;
    return this.hue = random(180, 240);
  };

  Particle.prototype = {
    update: function () {
      var dist, distx, disty, radius;
      dist = sqrt(distx * distx + disty * disty);
      if (dist < this.threshold) {
        radius = this.baseRadius + ((this.threshold - dist) / this.threshold) * this.maxRadius;
        this.radius = radius > this.maxRadius ? this.maxRadius : radius;
      } else {
        this.radius = this.baseRadius;
      }
      this.vx += (random(100) - 50) / 1000;
      this.vy -= random(1, 20) / 10000;
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < -this.maxRadius || this.x > sketch.width + this.maxRadius || this.y < -this.maxRadius) {
        this.x = random(sketch.width);
        this.y = random(sketch.height + this.maxRadius, sketch.height * 2);
        this.vx = 0;
        return this.vy = -random(1, 10) / 5;
      }
    },
    render: function () {
      sketch.beginPath();
      sketch.arc(this.x, this.y, this.radius, 0, TWO_PI);
      sketch.closePath();
      sketch.fillStyle = 'hsla(' + random(0, 120)  + ', 100%, 47%, 1)';
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
