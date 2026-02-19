
const StorageModule = (() => {
  const KEY = 'publicWall_posts_v1';

  function getAll() {
    try {
      return JSON.parse(localStorage.getItem(KEY)) || [];
    } catch {
      return [];
    }
  }

  function save(post) {
    const posts = getAll();
    posts.unshift(post); // newest first
    try {
      localStorage.setItem(KEY, JSON.stringify(posts));
    } catch (e) {
      console.warn('localStorage full:', e);
    }
    return posts;
  }

  function createPost({ text, author, theme }) {
    return {
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
      text: text.trim(),
      author: author.trim() || 'Anonymous',
      theme,
      timestamp: Date.now(),
    };
  }

  return { getAll, save, createPost };
})();


//ThemeModule 
const ThemeModule = (() => {
  let selected = 'dark';

  function init(container, onChange) {
    container.addEventListener('click', (e) => {
      const swatch = e.target.closest('.swatch');
      if (!swatch) return;
      selected = swatch.dataset.theme;
      container.querySelectorAll('.swatch').forEach(s => s.classList.remove('active'));
      swatch.classList.add('active');
      if (onChange) onChange(selected);
    });
  }

  function getSelected() { return selected; }

  return { init, getSelected };
})();


//ui
const UIModule = (() => {
  const THEME_LABELS = {
    dark:   '◼ DARK',
    light:  '◻ LIGHT',
    pastel: '◈ PASTEL',
    neon:   '⚡ NEON',
    retro:  '✦ RETRO',
  };

  function formatTime(timestamp) {
    const now = Date.now();
    const diff = now - timestamp;
    const mins = Math.floor(diff / 60000);
    const hrs  = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    if (mins < 1)   return 'just now';
    if (mins < 60)  return `${mins}m ago`;
    if (hrs < 24)   return `${hrs}h ago`;
    if (days < 7)   return `${days}d ago`;
    return new Date(timestamp).toLocaleDateString();
  }

  function buildCard(post) {
    const card = document.createElement('article');
    card.className = `message-card theme-${post.theme}`;
    card.dataset.id = post.id;

    card.innerHTML = `
      <span class="card-theme-badge">${THEME_LABELS[post.theme] || post.theme}</span>
      <p class="card-text">${escapeHTML(post.text)}</p>
      <div class="card-meta">
        <span class="card-author">${escapeHTML(post.author)}</span>
        <span class="card-time" data-ts="${post.timestamp}">${formatTime(post.timestamp)}</span>
      </div>
    `;
    return card;
  }

  function escapeHTML(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function renderAll(posts, grid, emptyState, postCountEl) {
    // Remove all cards (keep emptyState)
    grid.querySelectorAll('.message-card').forEach(c => c.remove());

    if (posts.length === 0) {
      emptyState.style.display = '';
    } else {
      emptyState.style.display = 'none';
      posts.forEach(post => grid.appendChild(buildCard(post)));
    }

    postCountEl.textContent = `${posts.length} post${posts.length !== 1 ? 's' : ''}`;
  }

  function prependCard(post, grid, emptyState, postCountEl, total) {
    emptyState.style.display = 'none';
    const card = buildCard(post);
    grid.insertBefore(card, grid.firstChild);
    postCountEl.textContent = `${total} post${total !== 1 ? 's' : ''}`;
  }

  function updateTimestamps() {
    document.querySelectorAll('.card-time[data-ts]').forEach(el => {
      const ts = parseInt(el.dataset.ts, 10);
      el.textContent = formatTime(ts);
    });
  }

  return { renderAll, prependCard, updateTimestamps, buildCard };
})();


// tickermodule
const TickerModule = (() => {
  let snippets = [
    'POST YOUR THOUGHTS',
    'BE HEARD',
    'THE WALL NEVER SLEEPS',
  ];

  function update(posts) {
    if (posts.length === 0) return;
    const recents = posts.slice(0, 5).map(p => `"${p.text.slice(0, 40)}${p.text.length > 40 ? '…' : ''}" — ${p.author}`);
    const el = document.getElementById('ticker');
    if (!el) return;
    el.textContent = recents.join('  ·  ') + '  ·  ';
  }

  return { update };
})();

const App = (() => {
  function init() {
    const messageInput = document.getElementById('messageInput');
    const authorInput  = document.getElementById('authorInput');
    const charCount    = document.getElementById('charCount');
    const postBtn      = document.getElementById('postBtn');
    const wallGrid     = document.getElementById('wallGrid');
    const emptyState   = document.getElementById('emptyState');
    const postCountEl  = document.getElementById('postCount');
    const themeSwatches = document.getElementById('themeSwatches');

    // Init theme selector
    ThemeModule.init(themeSwatches);

    // Character counter
    messageInput.addEventListener('input', () => {
      const len = messageInput.value.length;
      charCount.textContent = `${len} / 200`;
      charCount.className = 'char-count' + (len > 180 ? ' danger' : len > 150 ? ' warn' : '');
    });

    // Post button
    postBtn.addEventListener('click', handlePost);
    messageInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && e.ctrlKey) handlePost();
    });

    function handlePost() {
      const text = messageInput.value.trim();
      if (!text) {
        messageInput.focus();
        messageInput.style.borderColor = '#ff4444';
        setTimeout(() => messageInput.style.borderColor = '', 1000);
        return;
      }

      const post = StorageModule.createPost({
        text,
        author: authorInput.value,
        theme: ThemeModule.getSelected(),
      });

      const posts = StorageModule.save(post);
      UIModule.prependCard(post, wallGrid, emptyState, postCountEl, posts.length);
      TickerModule.update(posts);

      // Reset form
      messageInput.value = '';
      charCount.textContent = '0 / 200';
      charCount.className = 'char-count';
      messageInput.focus();
    }

    // Initial render
    const posts = StorageModule.getAll();
    UIModule.renderAll(posts, wallGrid, emptyState, postCountEl);
    TickerModule.update(posts);

    // Update relative timestamps every minute
    setInterval(UIModule.updateTimestamps, 60000);
  }

  return { init };
})();

// Boot
document.addEventListener('DOMContentLoaded', App.init);



