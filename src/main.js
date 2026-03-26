import { pathwaysData } from './data.js';

let currentPathwayId = 'glycolysis';
let currentStepId = null;

const appConfig = {
  theme: {
    DARK: 'dark',
    LIGHT: 'light'
  }
};

let smilesDrawer = new SmilesDrawer.Drawer({
  width: 250,
  height: 250,
  theme: 'dark', // Using the dark theme provided by SmilesDrawer 
  compactDrawing: false
});

/**
 * Wait for DOM load
 */
document.addEventListener('DOMContentLoaded', () => {
  initApp();
});

function initApp() {
  setupNavigation();
  renderSidebar(currentPathwayId);
}

function setupNavigation() {
  const buttons = document.querySelectorAll('.pathway-btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      buttons.forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      currentPathwayId = e.target.dataset.pathway;
      renderSidebar(currentPathwayId);
      hideMainDetails();
    });
  });
}

function renderSidebar(pathwayId) {
  const pathway = pathwaysData[pathwayId];
  const listEl = document.getElementById('step-list');
  const titleEl = document.getElementById('sidebar-title');
  
  titleEl.textContent = `${pathway.name} Steps`;
  listEl.innerHTML = '';
  
  pathway.steps.forEach((step, index) => {
    const li = document.createElement('li');
    li.className = 'step-item';
    li.dataset.stepId = step.id;
    li.innerHTML = `
      <span class="step-num">${index + 1}</span>
      <span class="step-name">${step.enzyme}</span>
    `;
    li.addEventListener('click', () => {
      document.querySelectorAll('.step-item').forEach(el => el.classList.remove('active'));
      li.classList.add('active');
      showStepDetails(step);
    });
    listEl.appendChild(li);
  });
}

function showStepDetails(step) {
  currentStepId = step.id;
  document.getElementById('empty-state').style.display = 'none';
  const detailsEl = document.getElementById('step-details');
  detailsEl.style.display = 'block';
  detailsEl.classList.remove('hidden');
  
  // Apply a small animation effect
  detailsEl.style.opacity = 0;
  setTimeout(() => {
    detailsEl.style.transition = 'opacity 0.4s ease';
    detailsEl.style.opacity = 1;
  }, 10);

  // Set Details
  document.getElementById('step-name').textContent = step.enzyme;
  document.getElementById('step-desc').textContent = step.description;
  document.getElementById('enzyme-badge').textContent = step.enzyme;

  // Cofactors
  const coIn = document.getElementById('cofactors-in');
  const coOut = document.getElementById('cofactors-out');
  const pathIn = document.getElementById('path-in');
  const pathOut = document.getElementById('path-out');

  coIn.textContent = step.cofactorsIn || '';
  coOut.textContent = step.cofactorsOut || '';

  coIn.style.display = step.cofactorsIn ? 'block' : 'none';
  pathIn.style.display = step.cofactorsIn ? 'block' : 'none';

  coOut.style.display = step.cofactorsOut ? 'block' : 'none';
  pathOut.style.display = step.cofactorsOut ? 'block' : 'none';

  // Render Molecules
  const reactantsArea = document.getElementById('reactants-area');
  const productsArea = document.getElementById('products-area');
  reactantsArea.innerHTML = '';
  productsArea.innerHTML = '';

  step.reactants.forEach((mol, idx) => {
    if (idx > 0) reactantsArea.insertAdjacentHTML('beforeend', '<span class="mol-plus">+</span>');
    reactantsArea.appendChild(createMoleculeView(mol, `reactant-${idx}`));
  });

  step.products.forEach((mol, idx) => {
    if (idx > 0) productsArea.insertAdjacentHTML('beforeend', '<span class="mol-plus">+</span>');
    productsArea.appendChild(createMoleculeView(mol, `product-${idx}`));
  });

  // Regulatory List
  updateList('activators-list', step.activators, 'No major activators');
  updateList('inhibitors-list', step.inhibitors, 'No major inhibitors');
}

function createMoleculeView(molecule, idPrefix) {
  const container = document.createElement('div');
  container.className = 'molecule-card';
  
  const canvas = document.createElement('canvas');
  canvas.id = `${idPrefix}-canvas`;
  
  const label = document.createElement('div');
  label.className = 'molecule-label';
  label.textContent = molecule.name;
  
  container.appendChild(canvas);
  container.appendChild(label);
  
  // Use SmilesDrawer to render the structure
  setTimeout(() => {
    SmilesDrawer.parse(molecule.smiles, function(tree) {
      smilesDrawer.draw(tree, canvas.id, 'dark', false);
    }, function(err) {
      console.error('Error drawing smiles:', err);
    });
  }, 10);
  
  return container;
}

function updateList(elementId, items, emptyMessage) {
  const listEl = document.getElementById(elementId);
  listEl.innerHTML = '';
  if (items && items.length > 0) {
    items.forEach(item => {
      const li = document.createElement('li');
      li.textContent = item;
      listEl.appendChild(li);
    });
  } else {
    const li = document.createElement('li');
    li.textContent = emptyMessage;
    li.className = 'empty-msg';
    listEl.appendChild(li);
  }
}

function hideMainDetails() {
  document.getElementById('empty-state').style.display = 'flex';
  document.getElementById('step-details').style.display = 'none';
}
