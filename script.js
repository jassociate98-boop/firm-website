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
      category: 'CYBER LAW', title: 'Online Fraud in India: Legal Remedies and Steps to Take',
      image: 'https://images.unsplash.com/photo-1555374018-13a8994ab246?auto=format&fit=crop&w=1600&q=85', alt: 'Digital security concept',
      paragraphs: [
        'Online fraud can happen through UPI, banking platforms, fake websites, investment schemes or other digital channels. Acting quickly can help preserve important information and may assist in reporting the transaction. Keep transaction details, payment references, messages, emails, screenshots and other relevant records safely. Report the incident through the appropriate official channels and contact your bank or financial service provider to understand the steps available for securing your account. The appropriate legal remedy depends on the nature of the fraud and the facts of the case. Keeping a clear record of events and seeking timely legal advice can help you understand the available options.'
      ]
    },
    'cyber-complaint': {
      category: 'CYBER LAW', title: 'What Happens After Filing a Cyber Crime Complaint in India?',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1600&q=85', alt: 'Person reviewing digital records',
      paragraphs: [
        'Filing a cybercrime complaint is generally the first step towards formally reporting an online offence. The information provided in the complaint can help authorities understand the incident, identify relevant digital evidence and determine the appropriate course of investigation. Keep copies of the complaint, transaction records, screenshots, messages, emails and other relevant digital evidence. Avoid deleting or altering original information that may be useful during the investigation. The subsequent process depends on the nature of the offence, the evidence available and the action taken by the concerned authorities. Understanding the process can help you respond appropriately at each stage.'
      ]
    },
    'frozen-bank-account': {
      category: 'CYBER LAW', title: 'Bank Account Frozen Due to Cyber Crime: Legal Remedies in India',
      image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1600&q=85', alt: 'Business contract and paperwork',
      paragraphs: [
        'A bank account may be restricted or frozen in connection with a cybercrime investigation or a disputed financial transaction. Such situations can affect access to funds and may require the account holder to understand why the restriction has been placed. Keep your bank statements, transaction details, notices, communications and documents relating to the account. Understanding the reason and authority behind the restriction is an important part of determining the appropriate next step. The available legal remedy depends on the circumstances of the case and the nature of the restriction. Timely legal advice can help an affected account holder understand the procedure for seeking appropriate relief.'
      ]
    },
    'upi-fraud': {
      category: 'CYBER LAW', title: 'UPI Fraud: Know Your Legal Rights',
      image: 'https://images.unsplash.com/photo-1555374018-13a8994ab246?auto=format&fit=crop&w=1600&q=85', alt: 'Digital security concept',
      paragraphs: [
        'UPI fraud can happen through fake payment requests, fraudulent QR codes, phishing links, impersonation or misleading online offers. If you notice an unauthorised transaction, acting quickly can help in reporting the incident and preserving important transaction details. Keep your UPI transaction ID, bank statement, screenshots, messages, phone numbers, emails and other relevant records safely. Inform your bank or payment service provider through its official channel and report financial cyber fraud through the appropriate official reporting mechanism. Your legal position may depend on how the transaction occurred, whether any payment credentials were shared and how quickly the fraud was reported. Understanding your rights and keeping proper records can help you assess the legal and practical options available in your situation.'
      ]
    },
    'civil-vs-criminal': {
      category: 'LEGAL GUIDE', title: 'Civil Case vs Criminal Case in India: Key Differences Explained',
      image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1600&q=85', alt: 'Legal documents and office',
      paragraphs: [
        'Civil and criminal proceedings serve different legal purposes and arise from different types of disputes or offences. Understanding the distinction can help a person identify the nature of the legal issue they are facing. Civil matters may involve disputes relating to property, contracts, money, family matters or other private rights, while criminal proceedings concern alleged offences dealt with under criminal law. The same set of facts can sometimes give rise to different legal proceedings depending on the circumstances. The appropriate course of action depends on the facts, applicable law and available evidence.'
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
  if (form) {
    form.addEventListener('submit', async event => {
      event.preventDefault();
      event.stopPropagation();
      form.classList.add('was-validated');

      const status = document.getElementById('formStatus');

      if (!form.checkValidity()) {
        status.textContent = 'Please check the highlighted fields and try again.';
        return;
      }

      const submitButton = form.querySelector('button[type="submit"]');
      const originalButtonText = submitButton ? submitButton.innerHTML : '';

      if (submitButton) {
        submitButton.disabled = true;
        submitButton.innerHTML = 'Sending...';
      }
      status.textContent = 'Sending your inquiry...';

      try {
        const response = await fetch(form.action, {
          method: 'POST',
          body: new FormData(form),
          headers: { 'Accept': 'application/json' }
        });

        const contentType = response.headers.get('content-type') || '';
        if (!contentType.includes('application/json')) {
          const raw = await response.text();
          console.error('Unexpected server response:', raw);
          throw new Error('The server returned an unexpected response. Please check the PHP configuration.');
        }

        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(result.message || 'Unable to send your inquiry.');
        }

        status.textContent = result.message || 'Thank you. Your inquiry has been sent successfully.';
        form.reset();
        form.classList.remove('was-validated');
      } catch (error) {
        status.textContent = error.message || 'Something went wrong. Please try again.';
      } finally {
        if (submitButton) {
          submitButton.disabled = false;
          submitButton.innerHTML = originalButtonText;
        }
      }
    });
  }
})();
