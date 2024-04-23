const animationDuration = 3000;
const frameDuration = 1000 / 60;

const totalFrames = Math.round(animationDuration / frameDuration);

const easeOutQuad = t => t * (2 - t);

const animateCountUp = el => {
    let frame = 0;
    const countTo = parseInt(el.innerHTML, 10);
    const counter = setInterval(() => {
        frame++;
        const progress = (t => t * (2 - t))(frame / totalFrames);
        const currentCount = Math.round(countTo * progress);

        if (parseInt(el.innerHTML, 10) !== currentCount) {
            el.innerHTML = currentCount.toLocaleString();
        }

        if (frame === totalFrames) {
            clearInterval(counter);
        }
    }, frameDuration);
};

document.querySelectorAll('.stat .value').forEach(target => animateCountUp(target));

let observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('show')) {
            entry.target.classList.add('show');
        }
    })
}, {
    rootMargin: '0px',
    threshold: 0.3
});

for (const target of document.querySelectorAll('section:not(#header):not(#hero)'))
    observer.observe(target);