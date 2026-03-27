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
  hideMainDetails();
}

function setupNavigation() {
  // Quiz Toggle
  const quizCheckbox = document.getElementById('quiz-toggle');
  quizCheckbox.addEventListener('change', (e) => {
    document.body.classList.toggle('quiz-mode', e.target.checked);
  });

  const buttons = document.querySelectorAll('.pathway-btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      buttons.forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      currentPathwayId = e.target.dataset.pathway;
      renderSidebar(currentPathwayId);
      hideMainDetails();
      resetEnergyDashboard();
    });
  });
}

function resetEnergyDashboard() {
  document.getElementById('tally-atp').textContent = '0';
  document.getElementById('tally-nadh').textContent = '0';
  document.getElementById('tally-nadph').textContent = '0';
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
      updateEnergyDashboard(pathway, index);
    });
    listEl.appendChild(li);
  });

  // Fit text sizes for step names so "Phosphofructokinase-1" etc. don't get cut off on mobile
  requestAnimationFrame(() => {
    if (window.innerWidth <= 768) {
      document.querySelectorAll('.step-item .step-name').forEach(nameEl => {
        let size = 0.85; // Match mobile default
        nameEl.style.fontSize = size + 'rem';
        
        // Decrease font size until text fits entirely inside the constraints
        while (nameEl.scrollWidth > nameEl.offsetWidth && size > 0.5) {
          size -= 0.05;
          nameEl.style.fontSize = size + 'rem';
        }
      });
    }
  });
}

function updateEnergyDashboard(pathway, selectedIndex) {
  let atp = 0, nadh = 0, nadph = 0;
  for (let i = 0; i <= selectedIndex; i++) {
    const s = pathway.steps[i];
    atp += s.deltaATP || 0;
    nadh += s.deltaNADH || 0;
    nadph += s.deltaNADPH || 0;
  }
  document.getElementById('tally-atp').textContent = atp > 0 ? `+${atp}` : atp;
  document.getElementById('tally-nadh').textContent = nadh > 0 ? `+${nadh}` : nadh;
  document.getElementById('tally-nadph').textContent = nadph > 0 ? `+${nadph}` : nadph;
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
    reactantsArea.appendChild(createMoleculeView(mol, `reactant-${idx}`, 'reactant'));
  });

  step.products.forEach((mol, idx) => {
    if (idx > 0) productsArea.insertAdjacentHTML('beforeend', '<span class="mol-plus">+</span>');
    productsArea.appendChild(createMoleculeView(mol, `product-${idx}`, 'product'));
  });

  // Clinical Notes
  const clinicalNoteEl = document.getElementById('clinical-note-container');
  const clinicalNoteText = document.getElementById('clinical-note-text');
  if (step.clinicalNote) {
    clinicalNoteText.textContent = step.clinicalNote;
    clinicalNoteEl.style.display = 'block';
  } else {
    clinicalNoteEl.style.display = 'none';
  }

  // Regulatory List
  updateList('activators-list', step.activators, 'No major activators');
  updateList('inhibitors-list', step.inhibitors, 'No major inhibitors');
}

function createMoleculeView(molecule, idPrefix, roleClass) {
  const container = document.createElement('div');
  container.className = `molecule-card ${roleClass}`;
  
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
