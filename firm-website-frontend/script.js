(() => {
  const nav = document.getElementById('mainNav');
  const pages = { home: ['.hero', '.trust-strip', '#about', '#practice', '#approach', '.team-section', '.vision-band', '#career', '#blog', '#contact'], about: ['#about', '#approach', '.team-section', '.vision-band'], services: ['#practice'], career: ['#career'], blog: ['#blog'], contact: ['#contact'] };
  const pageElements = [...document.querySelectorAll('main > section')];
  const tabs = [...document.querySelectorAll('.page-tab')];
  function showPage(page, updateHistory = false) {
    const key = pages[page] ? page : 'home';
    pageElements.forEach(section => { section.hidden = !pages[key].some(selector => section.matches(selector)); });
    if (blogArticle) { blogArticle.hidden = true; blogListing.hidden = false; }
    tabs.forEach(tab => { const selected = tab.hash === `#${key}`; tab.classList.toggle('active', selected); if (selected) tab.setAttribute('aria-current', 'page'); else tab.removeAttribute('aria-current'); });
    if (updateHistory) history.pushState({ page: key }, '', `#${key}`);
    window.scrollTo(0, 0);
  }
  tabs.forEach(tab => tab.addEventListener('click', event => { event.preventDefault(); showPage(tab.hash.slice(1), true); if (nav.classList.contains('show') && bsCollapse) bsCollapse.hide(); }));
  window.addEventListener('popstate', () => {
    const hash = location.hash.slice(1);
    if (hash.startsWith('article-')) {
      showPage('blog');
      openArticle(hash.slice(8), false);
    } else {
      showPage(hash);
    }
  });
  const anchorPages = { home: 'home', about: 'about', practice: 'services', approach: 'about', career: 'career', blog: 'blog', contact: 'contact' };
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    if (tabs.includes(link)) return;
    const page = anchorPages[link.hash.slice(1)];
    if (page) link.addEventListener('click', event => { event.preventDefault(); showPage(page, true); });
  });
  const blogListing = document.getElementById('blogListing');
  const blogArticle = document.getElementById('blogArticle');
  const articles = {
    'cyber-fraud': {
      category: 'CYBER LAW', title: 'Cyber Fraud: What Should You Do After an Online Financial Scam?',
      image: 'https://images.unsplash.com/photo-1555374018-13a8994ab246?auto=format&fit=crop&w=1600&q=85', alt: 'Digital security concept',
      paragraphs: [
        'Discovering an online financial scam can be stressful. A clear record of events can help you explain what happened and consider the next steps.',
        'Save transaction references, dates, messages, emails and screenshots. Keep original files where possible, and write a short timeline while events are fresh. Contact the relevant financial service through its official channel to ask about securing your account and recording the transaction.',
        'Reporting options and legal routes depend on the facts and the applicable process. Gather the information you have before seeking advice, and avoid sharing passwords, one-time codes or sensitive account information through a general website form.'
      ]
    },
    'digital-evidence': {
      category: 'CYBER LAW', title: 'Digital Evidence in Cybercrime Matters: Why Records Matter',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1600&q=85', alt: 'Person reviewing digital records',
      paragraphs: [
        'Digital records can help establish what happened, when it happened and how people or accounts were connected. Screenshots, transaction records, emails and messages may all provide useful context.',
        'Where possible, preserve the original material and keep copies with dates, account details and transaction identifiers visible. Do not edit or annotate original files. A separate timeline can help explain how each item relates to the events.',
        'Which records matter and how they can be used depends on the circumstances. A lawyer can help assess relevance and discuss appropriate ways to preserve and present available evidence.'
      ]
    },
    'payment-disputes': {
      category: 'FINANCIAL LAW', title: 'Payment Disputes: Understanding the Legal Questions',
      image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1600&q=85', alt: 'Business contract and paperwork',
      paragraphs: [
        'A payment disagreement can involve more than whether money changed hands. The agreement, payment method, authorisation and communications between the parties can all shape the issue.',
        'Collect relevant agreements, invoices, receipts, bank or payment service records and messages. Note the dates, amounts and steps already taken to resolve the matter. Keep copies of any responses from the other party or service provider.',
        'The appropriate response depends on the transaction and the terms that apply. Reviewing the complete record can help identify the questions to raise and the options that may be available.'
      ]
    },
    'business-agreement': {
      category: 'BUSINESS', title: 'Before Signing a Business Agreement: Five Legal Questions to Ask',
      image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1600&q=85', alt: 'Business office and agreement review',
      paragraphs: [
        'A written agreement sets expectations for a business relationship. Before signing, make sure you understand what the document requires and how it handles a change in circumstances.',
        'Check five areas closely: what each party must deliver; how and when payment is made; how liability and loss are allocated; when and how the agreement can be ended; and how disputes will be handled. Also review defined terms, schedules and documents incorporated by reference.',
        'If a clause is unclear or does not reflect what you agreed, raise it before signing. Legal review can help identify ambiguity and explain how particular wording may affect your position.'
      ]
    },
    'first-consultation': {
      category: 'CLIENT GUIDE', title: 'What to Prepare Before Your First Legal Consultation',
      image: 'https://images.unsplash.com/photo-1521791055366-0d553872125f?auto=format&fit=crop&w=1600&q=85', alt: 'Preparing documents for a consultation',
      paragraphs: [
        'A little preparation can help make an initial legal conversation more useful. You do not need to have every answer; a clear outline of the issue is a good place to start.',
        'Write down the key dates, people or organisations involved, what has happened so far and what outcome you are seeking. Gather relevant agreements, notices, correspondence and transaction records, and note any deadlines you know about.',
        'Bring a short list of questions. The lawyer can tell you what additional information may be needed and discuss possible next steps based on the facts.'
      ]
    }
  };
  function openArticle(id, updateHistory = true) {
    const article = articles[id];
    if (!article) return;
    document.getElementById('articleCategory').textContent = article.category;
    document.getElementById('articleTitle').textContent = article.title;
    const image = document.getElementById('articleImage');
    image.src = article.image;
    image.alt = article.alt;
    const body = document.getElementById('articleBody');
    body.replaceChildren(...article.paragraphs.map(copy => {
      const paragraph = document.createElement('p');
      paragraph.textContent = copy;
      return paragraph;
    }));
    blogListing.hidden = true;
    blogArticle.hidden = false;
    if (updateHistory) history.pushState({ page: 'blog', article: id }, '', `#article-${id}`);
    window.scrollTo(0, 0);
  }
  function closeArticle(updateHistory = true) {
    blogArticle.hidden = true;
    blogListing.hidden = false;
    if (updateHistory) history.pushState({ page: 'blog' }, '', '#blog');
    window.scrollTo(0, 0);
  }
  document.querySelectorAll('.blog-read-more').forEach(button => button.addEventListener('click', () => openArticle(button.dataset.article)));
  document.getElementById('blogBack').addEventListener('click', () => closeArticle());
  const toggler = document.querySelector('.navbar-toggler');
  const bsCollapse = window.bootstrap ? bootstrap.Collapse.getOrCreateInstance(nav, { toggle: false }) : null;
  const initialHash = location.hash.slice(1);
  if (initialHash.startsWith('article-')) {
    showPage('blog');
    openArticle(initialHash.slice(8), false);
  } else {
    showPage(initialHash);
  }
  if (toggler && bsCollapse) {
    toggler.addEventListener('click', () => {
      const isOpen = nav.classList.contains('show');
      bsCollapse.toggle();
      toggler.setAttribute('aria-expanded', String(!isOpen));
    });
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
      if (nav.classList.contains('show')) bsCollapse.hide();
      toggler.setAttribute('aria-expanded', 'false');
    }));
    nav.addEventListener('hidden.bs.collapse', () => toggler.setAttribute('aria-expanded', 'false'));
    nav.addEventListener('shown.bs.collapse', () => toggler.setAttribute('aria-expanded', 'true'));
  }

  document.getElementById('year').textContent = new Date().getFullYear();
  const heroSlideNumber = document.getElementById('heroSlideNumber');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (heroSlideNumber && !reduceMotion.matches) {
    let slide = 1;
    window.setInterval(() => {
      slide = slide % 4 + 1;
      heroSlideNumber.textContent = String(slide).padStart(2, '0');
    }, 6000);
  }
  const form = document.getElementById('contactForm');
  form.addEventListener('submit', event => {
    event.preventDefault();
    event.stopPropagation();
    form.classList.add('was-validated');
    if (!form.checkValidity()) {
      document.getElementById('formStatus').textContent = 'Please check the highlighted fields and try again.';
      return;
    }
    const data = new FormData(form);
    const subject = encodeURIComponent(`Website inquiry: ${data.get('matter')}`);
    const body = encodeURIComponent(`Name: ${data.get('name')}\nEmail: ${data.get('email')}\nPhone: ${data.get('phone') || 'Not provided'}\nMatter: ${data.get('matter')}\n\n${data.get('message') || 'No additional details provided.'}`);
    document.getElementById('formStatus').textContent = 'Your email app will open with your inquiry addressed to jassociate98@gmail.com. Please send the email to complete your inquiry.';
    window.location.href = `mailto:jassociate98@gmail.com?subject=${subject}&body=${body}`;
  });
})();
