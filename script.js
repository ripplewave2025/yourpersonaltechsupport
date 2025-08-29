// Vanilla JS to load resources, filter and search
const state = {
  data: [],
  category: 'All',
  q: ''
};

function normalize(s) {
  return (s || '').toLowerCase();
}
function matches(item) {
  const q = normalize(state.q);
  const inCat = state.category === 'All' || item.category === state.category;
  if (!q) return inCat;
  const hay = [item.title, item.description, item.url, ...(item.tags || []), item.category].map(normalize).join(' ');
  return inCat && hay.includes(q);
}

async function load() {
  const res = await fetch('data/resources.json');
  state.data = await res.json();

  const cats = ['All', ...Array.from(new Set(state.data.map(d => d.category)))];
  const filters = document.getElementById('filters');
  cats.forEach(c => {
    const b = document.createElement('button');
    b.className = 'filter' + (c === 'All' ? ' active' : '');
    b.textContent = c;
    b.setAttribute('role', 'tab');
    b.addEventListener('click', () => {
      document.querySelectorAll('.filter').forEach(f => f.classList.remove('active'));
      b.classList.add('active');
      state.category = c;
      render();
    });
    filters.appendChild(b);
  });

  document.getElementById('search').addEventListener('input', (e) => {
    state.q = e.target.value;
    render();
  });

  render();
}

function render() {
  const wrap = document.getElementById('cards');
  wrap.innerHTML = '';
  const tpl = document.getElementById('card-template');

  state.data.filter(matches).forEach(item => {
    const node = tpl.content.cloneNode(true);
    node.querySelector('.title').textContent = item.title;
    node.querySelector('.desc').textContent = item.description || '';
    node.querySelector('.badge').textContent = item.category;
    const open = node.querySelector('.open');
    open.href = item.url;

    const copyBtn = node.querySelector('.copy');
    if (item.snippet) {
      copyBtn.classList.remove('hidden');
      copyBtn.addEventListener('click', async () => {
        await navigator.clipboard.writeText(item.snippet);
        copyBtn.querySelector('span').textContent = 'Copied!';
        setTimeout(() => (copyBtn.querySelector('span').textContent = 'Copy'), 1200);
      });
    }

    const tagWrap = node.querySelector('.tags');
    (item.tags || []).forEach(t => {
      const chip = document.createElement('span');
      chip.className = 'tag';
      chip.textContent = t;
      tagWrap.appendChild(chip);
    });

    wrap.appendChild(node);
  });

  if (window.feather) window.feather.replace();
}

load();
