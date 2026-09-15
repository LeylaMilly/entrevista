
const CONFIG = {
    productName: 'Domine a Sua Entrevista de Emprego — Curso e Método',
    price: '197 MT',
    whatsappNumber: '258874449125',
    checkoutUrl: 'https://entrevista.cursosmoz.shop/checkout',
    breakpoint: 700,
    modalCloseLabel: 'Fechar modal'
};
const $ = (s, r = document) => r.querySelector(s),
    $$ = (s, r = document) => [...r.querySelectorAll(s)];
$('#priceDisplay').innerHTML = CONFIG.price.replace(/\s*MT\b/, ' <small>MT</small>');
$('#mobilePrice').textContent = CONFIG.price;
$('#year').textContent = new Date().getFullYear();
const header = $('#header');
const onScroll = () => header.classList.toggle('scrolled', scrollY > 15);
onScroll();
addEventListener('scroll', onScroll, {
    passive: true
});

const headerHeight = header.offsetHeight;
const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) {
    e.target.classList.add('show');
    io.unobserve(e.target)
    }
}), {
    threshold: .11,
    rootMargin: '0px 0px -30px'
});
$$('.reveal').forEach(e => io.observe(e));
const cursor = $('#cursor');
addEventListener('pointermove', e => {
    const isHoverCapable = window.matchMedia('(hover: hover)').matches;
    if (isHoverCapable && window.innerWidth > CONFIG.breakpoint) {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px'
    }
}, {
    passive: true
});
const book = $('#book');
book.addEventListener('pointermove', e => {
    if (window.innerWidth < 800) return;
    const r = book.getBoundingClientRect(),
    x = ((e.clientX - r.left) / r.width - .5) * 2,
    y = ((e.clientY - r.top) / r.height - .5) * 2;
    book.style.transform = `translateY(-5px) rotateX(${y*-5}deg) rotateY(${x*7-4}deg)`
});
book.addEventListener('pointerleave', () => book.style.transform = '');
(function initShots() {
    const stage = $('#shotsStage');
    if (!stage) return;
    const items = $$('.shot', stage);
    const dotsWrap = $('#shotsDots');
    const total = items.length;
    let current = 0;
    let autoplayId = null;

    items.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.setAttribute('aria-label', `Ir para testemunho ${i + 1}`);
    dot.addEventListener('click', () => { goTo(i); restartAutoplay() });
    dotsWrap.appendChild(dot);
    });
    const dots = $$('button', dotsWrap);

    function layout() {
    const narrow = window.innerWidth <= 700;
    const spacing = narrow ? 108 : 168;
    items.forEach((item, i) => {
        let offset = i - current;
        if (offset > total / 2) offset -= total;
        if (offset < -total / 2) offset += total;
        const abs = Math.abs(offset);
        const scale = abs === 0 ? 1 : abs === 1 ? .78 : abs === 2 ? .6 : .45;
        const opacity = abs === 0 ? 1 : abs === 1 ? .6 : abs === 2 ? .3 : 0;
        const z = 10 - abs;
        item.style.zIndex = z;
        item.style.opacity = opacity;
        item.style.pointerEvents = abs > 2 ? 'none' : 'auto';
        item.style.transform = `translate(-50%,-50%) translateX(${offset * spacing}px) scale(${scale})`;
        item.classList.toggle('is-active', offset === 0);
    });
    dots.forEach((d, i) => d.classList.toggle('is-active', i === current));
    }

    function goTo(i) {
    current = ((i % total) + total) % total;
    layout();
    if (modal.classList.contains('open')) showModal(current);
    }
    function next() { goTo(current + 1) }
    function prev() { goTo(current - 1) }

    items.forEach((item, i) => item.addEventListener('click', () => {
    goTo(i);
    showModal(i);
    }));
    $('#shotsPrev').addEventListener('click', () => { prev(); restartAutoplay() });
    $('#shotsNext').addEventListener('click', () => { next(); restartAutoplay() });

    function startAutoplay() { autoplayId = setInterval(next, 3200) }
    function stopAutoplay() { clearInterval(autoplayId) }
    function restartAutoplay() { stopAutoplay(); startAutoplay() }
    stage.addEventListener('mouseenter', stopAutoplay);
    stage.addEventListener('mouseleave', startAutoplay);

    // Fullscreen modal that keeps advancing through the same carousel
    const modal = $('#shotModal'), modalImg = $('#shotModalImg'), modalCount = $('#shotModalCount');
    function showModal(i) {
    const src = $('img', items[i]).getAttribute('src');
    modalImg.setAttribute('src', src);
    modalCount.textContent = `${i + 1} / ${total}`;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
    }
    function closeModal() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
    restartAutoplay();
    }
    $('#shotModalClose').addEventListener('click', closeModal);
    $('#shotModalPrev').addEventListener('click', () => goTo(current - 1));
    $('#shotModalNext').addEventListener('click', () => goTo(current + 1));
    modal.addEventListener('click', e => { if (e.target === modal) closeModal() });
    addEventListener('keydown', e => {
    if (!modal.classList.contains('open')) return;
    if (e.key === 'Escape') closeModal();
    if (e.key === 'ArrowRight') goTo(current + 1);
    if (e.key === 'ArrowLeft') goTo(current - 1);
    });

    addEventListener('resize', layout, { passive: true });
    layout();
    startAutoplay();
})();
$$('.faq-btn').forEach(btn => btn.addEventListener('click', () => {
    const item = btn.parentElement,
    a = $('.answer', item),
    open = item.classList.contains('open');
    $$('.faq-item.open').forEach(x => {
    x.classList.remove('open');
    $('.answer', x).style.maxHeight = null
    });
    if (!open) {
    item.classList.add('open');
    a.style.maxHeight = a.scrollHeight + 'px'
    }
}));
let lastFocusedElement;
const modal = $('#modal'),
    close = () => {
    modal.classList.remove('open');
    document.body.classList.remove('modal-open');
    modal.setAttribute('aria-hidden', 'true');
    // restore focus to the element that had it before opening
    if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
        lastFocusedElement.focus();
    }
},
    open = () => {
    lastFocusedElement = document.activeElement;
    modal.classList.add('open');
    document.body.classList.add('modal-open');
    modal.setAttribute('aria-hidden', 'false');
    // focus first interactive element inside the modal
    const focusable = modal.querySelectorAll('a[href], button:not([disabled]), input, textarea, select');
    if (focusable.length) {
        focusable[0].focus();
    }
};
$$('[data-buy]').forEach(b => b.addEventListener('click', open));
$('#close').addEventListener('click', close);
modal.addEventListener('click', e => {
    if (e.target === modal) close()
});
addEventListener('keydown', e => {
    if (e.key === 'Escape') close()
});
$('#checkoutLink').addEventListener('click', e => {
    e.preventDefault();
    if (CONFIG.checkoutUrl) {
    location.href = CONFIG.checkoutUrl;
    return;
    }
    if (CONFIG.whatsappNumber) {
    const msg = encodeURIComponent(`Olá. Tenho interesse no curso “${CONFIG.productName}”.`);
    window.open(`https://wa.me/${CONFIG.whatsappNumber}?text=${msg}`, '_blank', 'noopener');
    close();
    return;
    }
    close();
    setTimeout(() => alert(
    `O botão está pronto para ligação ao checkout.

Configure CONFIG.checkoutUrl ou CONFIG.whatsappNumber no JavaScript antes de publicar.`
    ), 150);
});
$$('a[href^="#"]').forEach(a => a.addEventListener('click', e => {
    const id = a.getAttribute('href'),
    t = id && $(id);
    if (!t) return;
    e.preventDefault();
    scrollTo({
    top: t.getBoundingClientRect().top + scrollY - headerHeight,
    behavior: 'smooth'
    })
}));