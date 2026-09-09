# Final Site Checklist

The following report summarizes a thorough review of the current static site.

## 1. File‑level observations
| File | Size | Notes |
|------|------|-------|
| `index.html` | ~6 KB | All tags are balanced, alt attributes present for images, and the page loads without JavaScript errors in the console. |
| `script.js` | ~2 KB | No syntax errors. The only potential runtime issue is the empty `CONFIG.whatsappNumber`; see Section 3. |
| `style.css` | ~12 KB | All referenced classes are used except for `.magnetic`. |

## 2. Dead / Unused Code
- **JavaScript**: The selector `$$('.magnetic')` attaches a pointer‑move handler, but there are no elements with the class `magnetic` in the markup. This listener will never run. You can safely remove it or add the intended CSS/markup.
- **CSS**: The `.magnetic` class is defined nowhere. If you plan to use magnetic hover effects, add the styles; otherwise delete the JS handler and any related code.

## 3. Placeholders / Configurable Values
| Variable | Current Value | Suggested Action |
|----------|---------------|------------------|
| `CONFIG.whatsappNumber` | empty string | Provide a real WhatsApp number or remove the block that relies on it. |
| `CONFIG.checkoutUrl` | empty string | Set to your checkout endpoint before production. |

## 4. Spelling / Grammar (Portuguese)
The text is mostly correct, but a few minor adjustments could improve readability:
- **“rastreio”** → **“rastreamento”** (standard spelling).
- In the FAQ answer for “O guia garante que vou conseguir emprego?” the phrase *“a selecção depende da vaga…”* would read better as *“a seleção depende da vaga…”* if you prefer European Portuguese orthography.

## 5. Accessibility & SEO
- **Meta tags**: `canonical` points to `./`; consider using an absolute URL for clarity.
- **ARIA**: The modal has proper `aria-modal` and `role="dialog"`. Focus is returned correctly after closing.
- **Keyboard navigation**: All interactive elements are focusable; the Escape key closes the modal.

## 6. Recommendations before Production
1. Remove or implement the `.magnetic` effect.
2. Fill in the `CONFIG.whatsappNumber` and/or `CONFIG.checkoutUrl`.
3. Replace placeholder text (e.g., “O seu currículo pode ser excelente…” is fine, but double‑check your brand copy.)
4. Verify that all URLs (canonical, Open Graph, Twitter) are absolute or correctly resolved in production.
5. Run a final accessibility audit (e.g., axe, Lighthouse). 

Once these items are addressed, the site should be ready for deployment.
