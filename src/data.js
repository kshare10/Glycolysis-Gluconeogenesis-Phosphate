export const pathwaysData = {
  glycolysis: {
    id: 'glycolysis',
    name: 'Glycolysis',
    steps: [
      {
        id: 'gly-1',
        enzyme: 'Hexokinase',
        description: 'This is an irreversible, regulatory step that phosphorylates glucose to trap it within the cell. It takes place in the cytosol and consumes one molecule of ATP.',
        clinicalNote: 'Mutations in Hexokinase (specifically Glucokinase in the pancreas) can lead to Maturity-Onset Diabetes of the Young (MODY), as the pancreas fails to sense glucose levels properly.',
        deltaATP: -1, deltaNADH: 0, deltaNADPH: 0,
        reactants: [{ name: 'Glucose', smiles: 'C(C1C(C(C(C(O1)O)O)O)O)O' }],
        products: [{ name: 'Glucose-6-phosphate', smiles: 'C(C1C(C(C(C(O1)O)O)O)O)OP(=O)(O)O' }],
        cofactorsIn: 'ATP', cofactorsOut: 'ADP + H⁺',
        activators: ['AMP', 'ADP', 'Pi'], inhibitors: ['Glucose-6-phosphate']
      },
      {
        id: 'gly-2',
        enzyme: 'Phosphohexose Isomerase',
        description: 'This reversible step isomerizes the aldose sugar glucose-6-phosphate into the ketose sugar fructose-6-phosphate.',
        clinicalNote: null,
        deltaATP: 0, deltaNADH: 0, deltaNADPH: 0,
        reactants: [{ name: 'Glucose-6-phosphate', smiles: 'C(C1C(C(C(C(O1)O)O)O)O)OP(=O)(O)O' }],
        products: [{ name: 'Fructose-6-phosphate', smiles: 'C(C1C(C(C(O1)(CO)O)O)O)OP(=O)(O)O' }],
        cofactorsIn: '', cofactorsOut: '', activators: [], inhibitors: []
      },
      {
        id: 'gly-3',
        enzyme: 'Phosphofructokinase-1 (PFK-1)',
        description: 'This is the committed, irreversible step of glycolysis and its most heavily regulated control point.',
        clinicalNote: 'Tarui disease (GSD Type VII) is caused by a deficiency in muscle PFK-1, leading to exercise-induced muscle cramps and weakness because muscle cells cannot generate enough ATP from glycolysis.',
        deltaATP: -1, deltaNADH: 0, deltaNADPH: 0,
        reactants: [{ name: 'Fructose-6-phosphate', smiles: 'C(C1C(C(C(O1)(CO)O)O)O)OP(=O)(O)O' }],
        products: [{ name: 'Fructose-1,6-bisphosphate', smiles: 'C(C1C(C(C(O1)(COP(=O)(O)O)O)O)O)OP(=O)(O)O' }],
        cofactorsIn: 'ATP', cofactorsOut: 'ADP + H⁺',
        activators: ['AMP', 'Fructose-2,6-bisphosphate'], inhibitors: ['ATP', 'Citrate']
      },
      {
        id: 'gly-4',
        enzyme: 'Aldolase',
        description: 'This reversible cytosolic reaction cleaves the six-carbon fructose-1,6-bisphosphate into two three-carbon isomers: DHAP and GAP.',
        clinicalNote: 'Aldolase A deficiency causes myopathy and hemolytic anemia, whereas Aldolase B deficiency causes Hereditary Fructose Intolerance, a severe condition leading to hypoglycemia and liver damage upon fructose ingestion.',
        deltaATP: 0, deltaNADH: 0, deltaNADPH: 0,
        reactants: [{ name: 'Fructose-1,6-bisphosphate', smiles: 'C(C1C(C(C(O1)(COP(=O)(O)O)O)O)O)OP(=O)(O)O' }],
        products: [
          { name: 'Dihydroxyacetone phosphate', smiles: 'C(C(=O)COP(=O)(O)O)O' },
          { name: 'Glyceraldehyde-3-phosphate', smiles: 'C(C(C=O)O)OP(=O)(O)O' }
        ],
        cofactorsIn: '', cofactorsOut: '', activators: [], inhibitors: []
      },
      {
        id: 'gly-5',
        enzyme: 'Triose-phosphate Isomerase',
        description: 'This reversible step takes place in the cytosol and interconverts DHAP and GAP.',
        clinicalNote: 'TPI deficiency is a rare but severe metabolic disorder causing hemolytic anemia and progressive neuromuscular dysfunction.',
        deltaATP: 0, deltaNADH: 0, deltaNADPH: 0,
        reactants: [{ name: 'Dihydroxyacetone phosphate', smiles: 'C(C(=O)COP(=O)(O)O)O' }],
        products: [{ name: 'Glyceraldehyde-3-phosphate', smiles: 'C(C(C=O)O)OP(=O)(O)O' }],
        cofactorsIn: '', cofactorsOut: '', activators: [], inhibitors: []
      },
      {
        id: 'gly-6',
        enzyme: 'GAPDH',
        description: 'This reversible cytosolic reaction is the only oxidation step in glycolysis. Note: Since one glucose yields TWO molecules of GAP, this step and all subsequent glycolysis steps occur twice per glucose molecule.',
        clinicalNote: 'This enzyme is inhibited by arsenate, which structurally resembles phosphate. Arsenate uncouples glycolysis, allowing the pathway to continue without producing ATP.',
        deltaATP: 0, deltaNADH: 2, deltaNADPH: 0, // Doubled for 1 glucose
        reactants: [{ name: 'Glyceraldehyde-3-phosphate', smiles: 'C(C(C=O)O)OP(=O)(O)O' }],
        products: [{ name: '1,3-Bisphosphoglycerate', smiles: 'C(C(C(=O)OP(=O)(O)O)O)OP(=O)(O)O' }],
        cofactorsIn: 'NAD⁺ + Pi', cofactorsOut: 'NADH + H⁺', activators: [], inhibitors: []
      },
      {
        id: 'gly-7',
        enzyme: 'Phosphoglycerate Kinase',
        description: 'This performs the first substrate-level phosphorylation of glycolysis, transferring a high-energy phosphate from 1,3-BPG to ADP.',
        clinicalNote: 'Because it occurs twice per glucose, this step produces 2 ATP, perfectly breaking even with the 2 ATP invested in the preparatory phase (Hexokinase and PFK-1).',
        deltaATP: 2, deltaNADH: 0, deltaNADPH: 0, // Doubled
        reactants: [{ name: '1,3-Bisphosphoglycerate', smiles: 'C(C(C(=O)OP(=O)(O)O)O)OP(=O)(O)O' }],
        products: [{ name: '3-Phosphoglycerate', smiles: 'C(C(C(=O)O)O)OP(=O)(O)O' }],
        cofactorsIn: 'ADP', cofactorsOut: 'ATP', activators: [], inhibitors: []
      },
      {
        id: 'gly-8',
        enzyme: 'Phosphoglycerate Mutase',
        description: 'This reversible cytosolic step migrates the phosphate group from the 3-position to the 2-position.',
        clinicalNote: null,
        deltaATP: 0, deltaNADH: 0, deltaNADPH: 0,
        reactants: [{ name: '3-Phosphoglycerate', smiles: 'C(C(C(=O)O)O)OP(=O)(O)O' }],
        products: [{ name: '2-Phosphoglycerate', smiles: 'C(C(C(=O)O)OP(=O)(O)O)O' }],
        cofactorsIn: '', cofactorsOut: '', activators: [], inhibitors: []
      },
      {
        id: 'gly-9',
        enzyme: 'Enolase',
        description: 'This reversible dehydration reaction removes water from 2-phosphoglycerate, creating a high-energy enol-phosphate bond.',
        clinicalNote: 'Fluoride directly inhibits enolase. This is why fluoride is added to blood collection tubes used for glucose testing—it rapidly stops glycolysis so the measured glucose levels accurately reflect blood concentrations at the time of the draw.',
        deltaATP: 0, deltaNADH: 0, deltaNADPH: 0,
        reactants: [{ name: '2-Phosphoglycerate', smiles: 'C(C(C(=O)O)OP(=O)(O)O)O' }],
        products: [{ name: 'Phosphoenolpyruvate', smiles: 'C=C(C(=O)O)OP(=O)(O)O' }],
        cofactorsIn: '', cofactorsOut: 'H₂O', activators: [], inhibitors: ['Fluoride']
      },
      {
        id: 'gly-10',
        enzyme: 'Pyruvate Kinase',
        description: 'This irreversible, highly regulated step performs the second substrate-level phosphorylation of glycolysis, yielding ATP and pyruvate.',
        clinicalNote: 'Pyruvate Kinase deficiency is the second most common genetic cause of hemolytic anemia. Red blood cells rely entirely on glycolysis for ATP, so impaired PK causes them to lyse prematurely.',
        deltaATP: 2, deltaNADH: 0, deltaNADPH: 0, // Doubled
        reactants: [{ name: 'Phosphoenolpyruvate', smiles: 'C=C(C(=O)O)OP(=O)(O)O' }],
        products: [{ name: 'Pyruvate', smiles: 'CC(=O)C(=O)O' }],
        cofactorsIn: 'ADP + H⁺', cofactorsOut: 'ATP',
        activators: ['Fructose-1,6-bisphosphate', 'AMP'], inhibitors: ['ATP', 'Acetyl-CoA', 'Alanine']
      }
    ]
  },
  gluconeogenesis: {
    id: 'gluconeogenesis',
    name: 'Gluconeogenesis',
    steps: [
      {
        id: 'glcn-1',
        enzyme: 'Pyruvate Carboxylase',
        description: 'Irreversible bypass step occurring in the mitochondrial matrix. Requires biotin as a cofactor and consumes ATP.',
        clinicalNote: 'Deficiency leads to lactic acidosis because pyruvate cannot be channeled into gluconeogenesis and is instead shunted to lactate. Biotin (vitamin B7) deficiency also impairs this step.',
        deltaATP: -2, deltaNADH: 0, deltaNADPH: 0, // 2 pyruvates needed to make 1 glucose
        reactants: [{ name: 'Pyruvate', smiles: 'CC(=O)C(=O)O' }],
        products: [{ name: 'Oxaloacetate', smiles: 'O=C(O)CC(=O)C(=O)O' }],
        cofactorsIn: 'ATP + HCO₃⁻', cofactorsOut: 'ADP + Pi', activators: ['Acetyl-CoA'], inhibitors: ['ADP']
      },
      {
        id: 'glcn-2',
        enzyme: 'Mitochondrial Malate Dehydrogenase',
        description: 'Reduces oxaloacetate to malate, allowing it to cross the inner mitochondrial membrane via the malate-alpha-ketoglutarate transporter.',
        clinicalNote: null,
        deltaATP: 0, deltaNADH: -2, deltaNADPH: 0,
        reactants: [{ name: 'Oxaloacetate', smiles: 'O=C(O)CC(=O)C(=O)O' }],
        products: [{ name: 'Malate', smiles: 'O=C(O)CC(O)C(=O)O' }],
        cofactorsIn: 'NADH + H⁺', cofactorsOut: 'NAD⁺', activators: [], inhibitors: []
      },
      {
        id: 'glcn-3',
        enzyme: 'Cytosolic Malate Dehydrogenase',
        description: 'Oxidizes malate back into oxaloacetate in the cytosol, generating the cytosolic NADH required later in gluconeogenesis.',
        clinicalNote: 'This ingenious "Malate Shuttle" mechanism solves the problem of mitochondria lacking an oxaloacetate transporter while brilliantly supplying the cytosol with the exact NADH needed for gluconeogenesis.',
        deltaATP: 0, deltaNADH: 2, deltaNADPH: 0,
        reactants: [{ name: 'Malate', smiles: 'O=C(O)CC(O)C(=O)O' }],
        products: [{ name: 'Oxaloacetate', smiles: 'O=C(O)CC(=O)C(=O)O' }],
        cofactorsIn: 'NAD⁺', cofactorsOut: 'NADH + H⁺', activators: [], inhibitors: []
      },
      {
        id: 'glcn-4',
        enzyme: 'PEPCK',
        description: 'Irreversible bypass step completing the reversal of Pyruvate Kinase. Decarboxylates and phosphorylates oxaloacetate to form PEP.',
        clinicalNote: null,
        deltaATP: -2, deltaNADH: 0, deltaNADPH: 0, // Uses GTP, energetically equivalent to ATP
        reactants: [{ name: 'Oxaloacetate', smiles: 'O=C(O)CC(=O)C(=O)O' }],
        products: [{ name: 'Phosphoenolpyruvate', smiles: 'C=C(C(=O)O)OP(=O)(O)O' }],
        cofactorsIn: 'GTP', cofactorsOut: 'GDP + CO₂', activators: ['Glucagon'], inhibitors: ['Insulin']
      },
      {
        id: 'glcn-5',
        enzyme: 'Enolase (Reverse)',
        description: 'Reversible hydration step converting Phosphoenolpyruvate back into 2-Phosphoglycerate.',
        clinicalNote: null,
        deltaATP: 0, deltaNADH: 0, deltaNADPH: 0,
        reactants: [{ name: 'Phosphoenolpyruvate', smiles: 'C=C(C(=O)O)OP(=O)(O)O' }],
        products: [{ name: '2-Phosphoglycerate', smiles: 'C(C(C(=O)O)OP(=O)(O)O)O' }],
        cofactorsIn: 'H₂O', cofactorsOut: '', activators: [], inhibitors: []
      },
      {
        id: 'glcn-6',
        enzyme: 'Phosphoglycerate Mutase (Reverse)',
        description: 'Reversible, cytosolic reaction shifting the phosphate group from the 2-position to the 3-position.',
        clinicalNote: null,
        deltaATP: 0, deltaNADH: 0, deltaNADPH: 0,
        reactants: [{ name: '2-Phosphoglycerate', smiles: 'C(C(C(=O)O)OP(=O)(O)O)O' }],
        products: [{ name: '3-Phosphoglycerate', smiles: 'C(C(C(=O)O)O)OP(=O)(O)O' }],
        cofactorsIn: '', cofactorsOut: '', activators: [], inhibitors: []
      },
      {
        id: 'glcn-7',
        enzyme: 'Phosphoglycerate Kinase (Reverse)',
        description: 'Consumes ATP to phosphorylate 3-Phosphoglycerate back into 1,3-Bisphosphoglycerate.',
        clinicalNote: 'This highlights why gluconeogenesis is so energetically expensive: the cell had to burn 4 ATP equivalents just to undo Pyruvate Kinase, and now must burn 2 more ATP just to undo PGK.',
        deltaATP: -2, deltaNADH: 0, deltaNADPH: 0,
        reactants: [{ name: '3-Phosphoglycerate', smiles: 'C(C(C(=O)O)O)OP(=O)(O)O' }],
        products: [{ name: '1,3-Bisphosphoglycerate', smiles: 'C(C(C(=O)OP(=O)(O)O)O)OP(=O)(O)O' }],
        cofactorsIn: 'ATP', cofactorsOut: 'ADP', activators: [], inhibitors: []
      },
      {
        id: 'glcn-8',
        enzyme: 'GAPDH (Reverse)',
        description: 'Reduces 1,3-Bisphosphoglycerate down to Glyceraldehyde-3-phosphate, consuming the NADH brought from the mitochondria.',
        clinicalNote: null,
        deltaATP: 0, deltaNADH: -2, deltaNADPH: 0,
        reactants: [{ name: '1,3-Bisphosphoglycerate', smiles: 'C(C(C(=O)OP(=O)(O)O)O)OP(=O)(O)O' }],
        products: [{ name: 'Glyceraldehyde-3-phosphate', smiles: 'C(C(C=O)O)OP(=O)(O)O' }],
        cofactorsIn: 'NADH + H⁺', cofactorsOut: 'NAD⁺ + Pi', activators: [], inhibitors: []
      },
      {
        id: 'glcn-9',
        enzyme: 'Triose-phosphate Isomerase (Reverse)',
        description: 'Interconverts a portion of Glyceraldehyde-3-phosphate into Dihydroxyacetone phosphate for the aldol condensation.',
        clinicalNote: null,
        deltaATP: 0, deltaNADH: 0, deltaNADPH: 0,
        reactants: [{ name: 'Glyceraldehyde-3-phosphate', smiles: 'C(C(C=O)O)OP(=O)(O)O' }],
        products: [{ name: 'Dihydroxyacetone phosphate', smiles: 'C(C(=O)COP(=O)(O)O)O' }],
        cofactorsIn: '', cofactorsOut: '', activators: [], inhibitors: []
      },
      {
        id: 'glcn-10',
        enzyme: 'Aldolase (Reverse)',
        description: 'Condenses Glyceraldehyde-3-phosphate and Dihydroxyacetone phosphate together, reforming the 6-carbon Fructose-1,6-bisphosphate.',
        clinicalNote: null,
        deltaATP: 0, deltaNADH: 0, deltaNADPH: 0,
        reactants: [
            { name: 'Dihydroxyacetone phosphate', smiles: 'C(C(=O)COP(=O)(O)O)O' },
            { name: 'Glyceraldehyde-3-phosphate', smiles: 'C(C(C=O)O)OP(=O)(O)O' }
        ],
        products: [{ name: 'Fructose-1,6-bisphosphate', smiles: 'C(C1C(C(C(O1)(COP(=O)(O)O)O)O)O)OP(=O)(O)O' }],
        cofactorsIn: '', cofactorsOut: '', activators: [], inhibitors: []
      },
      {
        id: 'glcn-11',
        enzyme: 'Fructose-1,6-bisphosphatase',
        description: 'Irreversible bypass step overcoming PFK-1. Hydrolyzes the phosphate from Fructose-1,6-bisphosphate to yield Fructose-6-phosphate.',
        clinicalNote: 'Crucial control point. If F2,6-bisphosphate is present (fed state), this enzyme is inhibited while PFK-1 is activated. In fasting states, glucagon decreases F2,6-bisphosphate, activating F1,6BPase to produce glucose.',
        deltaATP: 0, deltaNADH: 0, deltaNADPH: 0,
        reactants: [{ name: 'Fructose-1,6-bisphosphate', smiles: 'C(C1C(C(C(O1)(COP(=O)(O)O)O)O)O)OP(=O)(O)O' }],
        products: [{ name: 'Fructose-6-phosphate', smiles: 'C(C1C(C(C(O1)(CO)O)O)O)OP(=O)(O)O' }],
        cofactorsIn: 'H₂O', cofactorsOut: 'Pi', activators: ['Citrate'], inhibitors: ['AMP', 'Fructose-2,6-bisphosphate']
      },
      {
        id: 'glcn-12',
        enzyme: 'Phosphohexose Isomerase (Reverse)',
        description: 'Isomerizes Fructose-6-phosphate back into Glucose-6-phosphate.',
        clinicalNote: null,
        deltaATP: 0, deltaNADH: 0, deltaNADPH: 0,
        reactants: [{ name: 'Fructose-6-phosphate', smiles: 'C(C1C(C(C(O1)(CO)O)O)O)OP(=O)(O)O' }],
        products: [{ name: 'Glucose-6-phosphate', smiles: 'C(C1C(C(C(C(O1)O)O)O)O)OP(=O)(O)O' }],
        cofactorsIn: '', cofactorsOut: '', activators: [], inhibitors: []
      },
      {
        id: 'glcn-13',
        enzyme: 'Glucose-6-phosphatase',
        description: 'Final irreversible bypass step. Operates in the ER lumen of liver and kidneys, hydrolyzing phosphate to release free glucose into blood.',
        clinicalNote: 'Von Gierke disease (GSD Type I). Individuals lack this enzyme (or its transporters), suffering severe fasting hypoglycemia, hepatomegaly, and hyperuricemia because G6P is trapped in the liver and shunted to other pathways.',
        deltaATP: 0, deltaNADH: 0, deltaNADPH: 0,
        reactants: [{ name: 'Glucose-6-phosphate', smiles: 'C(C1C(C(C(C(O1)O)O)O)O)OP(=O)(O)O' }],
        products: [{ name: 'Glucose', smiles: 'C(C1C(C(C(C(O1)O)O)O)O)O' }],
        cofactorsIn: 'H₂O', cofactorsOut: 'Pi', activators: ['Glucose-6-phosphate'], inhibitors: []
      }
    ]
  },
  pentose_phosphate: {
    id: 'pentose_phosphate',
    name: 'Pentose Phosphate',
    steps: [
      {
        id: 'ppp-1',
        enzyme: 'Glucose-6-phosphate Dehydrogenase',
        description: 'Irreversible, committed rate-limiting step of the Pentose Phosphate Pathway. Oxidizes G6P to produce the first molecule of NADPH.',
        clinicalNote: 'G6PD deficiency is the most common human enzyme defect. It causes hemolytic anemia under oxidative stress (fava beans, certain drugs) because RBCs blindly rely on G6PD for NADPH to maintain reduced glutathione.',
        deltaATP: 0, deltaNADH: 0, deltaNADPH: 1,
        reactants: [{ name: 'Glucose-6-phosphate', smiles: 'C(C1C(C(C(C(O1)O)O)O)O)OP(=O)(O)O' }],
        products: [{ name: '6-Phosphoglucono-δ-lactone', smiles: 'C(C1C(C(C(C(=O)O1)O)O)O)OP(=O)(O)O' }],
        cofactorsIn: 'NADP⁺', cofactorsOut: 'NADPH + H⁺', activators: ['NADP⁺'], inhibitors: ['NADPH']
      },
      {
        id: 'ppp-2',
        enzyme: 'Lactonase',
        description: 'Irreversible hydrolysis reaction in the cytosol. Rapidly breaks the lactone ring of 6-Phosphoglucono-delta-lactone.',
        clinicalNote: 'By keeping the intermediate concentration low, this enzyme pushes the equilibrium of the entire pathway strictly in the forward direction.',
        deltaATP: 0, deltaNADH: 0, deltaNADPH: 0,
        reactants: [{ name: '6-Phosphoglucono-δ-lactone', smiles: 'C(C1C(C(C(C(=O)O1)O)O)O)OP(=O)(O)O' }],
        products: [{ name: '6-Phosphogluconate', smiles: 'C(C(C(C(C(C(=O)O)O)O)O)O)OP(=O)(O)O' }],
        cofactorsIn: 'H₂O', cofactorsOut: 'H⁺', activators: [], inhibitors: []
      },
      {
        id: 'ppp-3',
        enzyme: '6-Phosphogluconate Dehydrogenase',
        description: 'Irreversible oxidative decarboxylation producing the second molecule of NADPH alongside Ribulose-5-phosphate.',
        clinicalNote: null,
        deltaATP: 0, deltaNADH: 0, deltaNADPH: 1,
        reactants: [{ name: '6-Phosphogluconate', smiles: 'C(C(C(C(C(C(=O)O)O)O)O)O)OP(=O)(O)O' }],
        products: [{ name: 'Ribulose-5-phosphate', smiles: 'C(C(C(C(=O)CO)O)O)OP(=O)(O)O' }],
        cofactorsIn: 'NADP⁺', cofactorsOut: 'NADPH + CO₂', activators: [], inhibitors: []
      },
      {
        id: 'ppp-4',
        enzyme: 'Phosphopentose Isomerase',
        description: 'Reversible, non-oxidative step. Isomerizes Ribulose-5-phosphate into Ribose-5-phosphate, the precursor for nucleotides.',
        clinicalNote: 'In rapidly dividing cells (like cancer or bone marrow), this enzyme is highly active to supply the massive demand for Ribose-5-phosphate needed for DNA synthesis.',
        deltaATP: 0, deltaNADH: 0, deltaNADPH: 0,
        reactants: [{ name: 'Ribulose-5-phosphate', smiles: 'C(C(C(C(=O)CO)O)O)OP(=O)(O)O' }],
        products: [{ name: 'Ribose-5-phosphate', smiles: 'C(C(C(C(C=O)O)O)O)OP(=O)(O)O' }],
        cofactorsIn: '', cofactorsOut: '', activators: [], inhibitors: []
      }
    ]
  }
};
