// Interactions: 'All pages' toggles the rest; store state in memory.
const all = document.getElementById('allPages');
const boxes = Array.from(document.querySelectorAll('.cb')).filter(cb => cb !== all);

function syncAllFromChildren(){
  const allChecked = boxes.every(b => b.checked);
  const anyChecked = boxes.some(b => b.checked);
  all.indeterminate = !allChecked && anyChecked;
  all.checked = allChecked;
}

all.addEventListener('change', () => {
  boxes.forEach(b => { b.checked = all.checked; });
  syncAllFromChildren();
  saveState();
});

boxes.forEach(b => {
  b.addEventListener('change', () => {
    syncAllFromChildren();
    saveState();
  });
});

// rudimentary persistence (optional)
const KEY = 'ellty-checkboxes';
function saveState(){
  const state = { all: all.checked, child: boxes.map(b => b.checked) };
  localStorage.setItem(KEY, JSON.stringify(state));
}
function loadState(){
  const raw = localStorage.getItem(KEY);
  if(!raw) return;
  try{
    const state = JSON.parse(raw);
    boxes.forEach((b,i) => b.checked = !!state.child[i]);
    all.checked = !!state.all;
    syncAllFromChildren();
  }catch(e){ /* ignore */ }
}
loadState();

document.getElementById('doneBtn').addEventListener('click', () => {
  alert('Selection saved!');
});
