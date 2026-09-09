const CONFIG = {
    productName: 'Domine a Sua Entrevista de Emprego — Curso e Método',
    price: '299 MT',
    whatsappNumber: '',
    checkoutUrl: '',
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
$$('.magnetic').forEach(b => {
    b.addEventListener('pointermove', e => {
    const r = b.getBoundingClientRect();
    b.style.transform =
        `translate(${(e.clientX-r.left-r.width/2)*.055}px,${(e.clientY-r.top-r.height/2)*.055-3}px)`
    });
    b.addEventListener('pointerleave', () => b.style.transform = '')
});
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