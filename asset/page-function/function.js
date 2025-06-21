window.onscroll = function () {
    const navbar = document.querySelector('.navbar');
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
        navbar.classList.add('sticky');
    } else {
        navbar.classList.remove('sticky');
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');


    window.addEventListener('scroll', () => {
        let scrollPos = window.scrollY + 50;
        sections.forEach(section => {
            if (scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
                const title = section.querySelector('.section-title');
                if (title) {
                    title.classList.add('active');
                }

                const aboutText = section.querySelector('.about-text p');
                if (aboutText) {
                    aboutText.classList.add('active');
                }

                const portfolioItems = section.querySelectorAll('.portfolio-item');
                portfolioItems.forEach(item => {
                    item.classList.add('active');
                });

                const skillCategories = section.querySelectorAll('.skill-category');
                skillCategories.forEach(category => {
                    category.classList.add('active');
                });

                const contactItems = section.querySelectorAll('.contact-item');
                contactItems.forEach(item => {
                    item.classList.add('active');
                });
            }
        });
    });
});
let currentIndexs = 0;



const config = {
    numSpheres: 20,
    minSize: 50,
    maxSize: 250,
    minSpeed: 0.0005,
    maxSpeed: 0.001,
    depth: 1000,
    mouseInfluence: 0.1,
    colorTransitionSpeed: 0.005,
    colorIntensity: 0.8
};

const scene = document.getElementById('scene');
const spheres = [];
let mouseX = 0;
let mouseY = 0;
let windowWidth = window.innerWidth;
let windowHeight = window.innerHeight;

function getRandomColor() {
    const colorType = Math.floor(Math.random() * 3);

    let r = Math.floor(Math.random() * 100) + 155;
    let g = Math.floor(Math.random() * 100) + 155;
    let b = Math.floor(Math.random() * 100) + 155;

    switch (colorType) {
        case 0: 
            g = Math.floor(g * 0.7);
            b = Math.floor(b * 0.7);
            break;
        case 1: 
            r = Math.floor(r * 0.7);
            b = Math.floor(b * 0.7);
            break;
        case 2: 
            r = Math.floor(r * 0.7);
            g = Math.floor(g * 0.7);
            break;
    }

    return {
        r, g, b,
        targetR: Math.floor(Math.random() * 100) + 155,
        targetG: Math.floor(Math.random() * 100) + 155,
        targetB: Math.floor(Math.random() * 100) + 155,
        hue: Math.random() * 360
    };
}


function initSpheres() {
    for (let i = 0; i < config.numSpheres; i++) {
        createSphere();
    }
}

function createSphere() {
    const sphere = document.createElement('div');
    sphere.className = 'sphere';

    const size = Math.random() * (config.maxSize - config.minSize) + config.minSize;
    const x = Math.random() * windowWidth;
    const y = Math.random() * windowHeight;
    const z = Math.random() * config.depth - config.depth / 2;

    const rotationX = Math.random() * Math.PI * 2;
    const rotationY = Math.random() * Math.PI * 2;
    const rotationZ = Math.random() * Math.PI * 2;
    const speedX = (Math.random() * (config.maxSpeed - config.minSpeed) + config.minSpeed) * (Math.random() > 0.5 ? 1 : -1);
    const speedY = (Math.random() * (config.maxSpeed - config.minSpeed) + config.minSpeed) * (Math.random() > 0.5 ? 1 : -1);
    const speedZ = (Math.random() * (config.maxSpeed - config.minSpeed) + config.minSpeed) * (Math.random() > 0.5 ? 1 : -1);

    const color = getRandomColor();

    sphere.style.width = `${size}px`;
    sphere.style.height = `${size}px`;

    const sphereData = {
        element: sphere,
        size,
        x, y, z,
        rotationX, rotationY, rotationZ,
        speedX, speedY, speedZ,
        color
    };

    spheres.push(sphereData);
    scene.appendChild(sphere);

    updateSpherePosition(sphereData);
    updateSphereColor(sphereData);
}

function updateSpherePosition(sphere) {
    sphere.element.style.transform = `
        translate3d(${sphere.x}px, ${sphere.y}px, ${sphere.z}px)
        rotateX(${sphere.rotationX}rad)
        rotateY(${sphere.rotationY}rad)
        rotateZ(${sphere.rotationZ}rad)
`;

    const scale = (config.depth + sphere.z) / config.depth;
    sphere.element.style.width = `${sphere.size * scale}px`;
    sphere.element.style.height = `${sphere.size * scale}px`;

    const opacity = 0.2 + (0.6 * scale);
    sphere.element.style.opacity = Math.min(opacity, 0.8);
}

function updateSphereColor(sphere) {
    sphere.color.r += (sphere.color.targetR - sphere.color.r) * config.colorTransitionSpeed;
    sphere.color.g += (sphere.color.targetG - sphere.color.g) * config.colorTransitionSpeed;
    sphere.color.b += (sphere.color.targetB - sphere.color.b) * config.colorTransitionSpeed;

    if (Math.abs(sphere.color.r - sphere.color.targetR) < 2 &&
        Math.abs(sphere.color.g - sphere.color.targetG) < 2 &&
        Math.abs(sphere.color.b - sphere.color.targetB) < 2) {
        sphere.color.targetR = Math.floor(Math.random() * 100) + 155;
        sphere.color.targetG = Math.floor(Math.random() * 100) + 155;
        sphere.color.targetB = Math.floor(Math.random() * 100) + 155;
    }

    sphere.color.hue = (sphere.color.hue + 0.2) % 360;

    sphere.element.style.background = `
radial-gradient(
  circle at 30% 30%, 
  rgba(${sphere.color.r}, ${sphere.color.g}, ${sphere.color.b}, 0.9), 
  rgba(${sphere.color.r * 0.6}, ${sphere.color.g * 0.6}, ${sphere.color.b * 0.6}, 0.6) 70%, 
  rgba(${sphere.color.r * 0.3}, ${sphere.color.g * 0.3}, ${sphere.color.b * 0.3}, 0.3) 90%
)
`;

    sphere.element.style.boxShadow = `
0 0 ${10 + (Math.sin(Date.now() * 0.001) + 1) * 10}px 
rgba(${sphere.color.r}, ${sphere.color.g}, ${sphere.color.b}, 0.5)
`;
}

function animateSpheres() {
    spheres.forEach(sphere => {
        sphere.x += sphere.speedX * 50;
        sphere.y += sphere.speedY * 50;
        sphere.z += sphere.speedZ * 50;

        sphere.x += (mouseX - windowWidth / 2) * config.mouseInfluence * (sphere.z / config.depth);
        sphere.y += (mouseY - windowHeight / 2) * config.mouseInfluence * (sphere.z / config.depth);

        sphere.rotationX += sphere.speedX * 0.5;
        sphere.rotationY += sphere.speedY * 0.5;
        sphere.rotationZ += sphere.speedZ * 0.5;

        if (sphere.x < -sphere.size) sphere.x = windowWidth + sphere.size;
        if (sphere.x > windowWidth + sphere.size) sphere.x = -sphere.size;
        if (sphere.y < -sphere.size) sphere.y = windowHeight + sphere.size;
        if (sphere.y > windowHeight + sphere.size) sphere.y = -sphere.size;
        if (sphere.z < -config.depth / 2) sphere.z = config.depth / 2;
        if (sphere.z > config.depth / 2) sphere.z = -config.depth / 2;

        updateSpherePosition(sphere);
        updateSphereColor(sphere);
    });

    requestAnimationFrame(animateSpheres);
}

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

window.addEventListener('resize', () => {
    windowWidth = window.innerWidth;
    windowHeight = window.innerHeight;
});

initSpheres();
animateSpheres();



