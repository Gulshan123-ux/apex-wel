document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
  });
  
  // Medicine Salt Finder
  const medicineSalts = {
    "dolo": "Paracetamol",
    "crocin": "Paracetamol",
    "combiflam": "Ibuprofen + Paracetamol",
    "azithral": "Azithromycin",
    "calpol": "Paracetamol",
    "augmentin": "Amoxicillin + Clavulanic Acid",
    "zifi": "Cefixime",
    "taxim": "Cefixime",
    "phexin": "Cephalexin",
    "disprin": "Aspirin",
    "brufen": "Ibuprofen",
    "metrogyl": "Metronidazole",
    "norflox": "Norfloxacin",
    "ciplox": "Ciprofloxacin",
    "monocef": "Ceftriaxone",
    "pantocid": "Pantoprazole",
    "omee": "Omeprazole",
    "rantac": "Ranitidine",
    "zyrtec": "Cetirizine",
    "allegra": "Fexofenadine",
    "levocet": "Levocetirizine",
    "sinarest": "Paracetamol + Chlorpheniramine + Phenylephrine",
    "lupizole": "Fluconazole",
    "betadine": "Povidone-Iodine",
    "crospas": "Dicyclomine",
    "meftal": "Mefenamic Acid",
    "domstal": "Domperidone",
    "vomikind": "Ondansetron",
    "shelcal": "Calcium + Vitamin D3",
    "becosules": "Vitamin B-Complex",
    "revital": "Multivitamins + Ginseng",
    "neurobion": "Vitamin B1 + B6 + B12",
    "softovac": "Natural Fiber Laxative",
    "cremaffin": "Liquid Paraffin + Milk of Magnesia",
    "eno": "Sodium Bicarbonate + Citric Acid",
    "ors": "Oral Rehydration Salts",
    "electral": "Oral Rehydration Salts",
    "digene": "Magnesium Hydroxide + Aluminium Hydroxide",
    "cyclopam": "Dicyclomine + Paracetamol",
    "spasmonil": "Dicyclomine + Paracetamol",
    "eldecal": "Calcium + Vitamin D3",
    "folvite": "Folic Acid",
    "okacet": "Cetirizine",
    "avomine": "Promethazine",
    "etoshine": "Etoricoxib",
    "zerodol": "Aceclofenac",
    "hifenac": "Aceclofenac",
    "nimulid": "Nimesulide",
    "flexon": "Ibuprofen + Paracetamol"
  };
  
  function findSalt() {
    const medicineInput = document.getElementById('medicineName').value.trim().toLowerCase();
    const resultBox = document.getElementById('saltResult');
  
    if (medicineSalts[medicineInput]) {
        resultBox.textContent = `Salt of ${medicineInput.toUpperCase()} is: ${medicineSalts[medicineInput]}`;
    } else {
        resultBox.textContent = "Salt not found. Please check the medicine name.";
    }
  }
  
  // Search functionality
document.getElementById('searchButton').addEventListener('click', performSearch);
document.getElementById('searchInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        performSearch();
    }
});

function performSearch() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const content = document.body.innerText.toLowerCase();
    
    // Clear any previous highlights
    clearHighlights();
    
    if (searchTerm.length > 0) {
        highlightMatches(searchTerm);
        scrollToFirstMatch();
    }
}

function clearHighlights() {
    const highlighted = document.querySelectorAll('.search-highlight');
    highlighted.forEach(el => {
        el.outerHTML = el.innerHTML;
    });
}

function highlightMatches(searchTerm) {
    const walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT,
        null,
        false
    );

    const matches = [];
    let node;
    while (node = walker.nextNode()) {
        const parent = node.parentElement;
        if (parent.tagName !== 'SCRIPT' && parent.tagName !== 'STYLE') {
            const index = node.textContent.toLowerCase().indexOf(searchTerm);
            if (index >= 0) {
                const span = document.createElement('span');
                span.className = 'search-highlight';
                const text = node.textContent;
                span.innerHTML = text.substring(0, index) +
                    `<mark>${text.substring(index, index + searchTerm.length)}</mark>` +
                    text.substring(index + searchTerm.length);
                node.parentNode.replaceChild(span, node);
                matches.push(span);
            }
        }
    }
    
    if (matches.length === 0) {
        alert('No matches found');
    } else {
        console.log(`Found ${matches.length} matches`);
    }
}

function scrollToFirstMatch() {
    const firstMatch = document.querySelector('mark');
    if (firstMatch) {
        firstMatch.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });
    }
}
