let history = JSON.parse(localStorage.getItem('blot_history')) || [];
const usInput = document.getElementById('us-input');
const themInput = document.getElementById('them-input');
const saveBtn = document.getElementById('save-btn');
const usLog = document.getElementById('us-log');
const themLog = document.getElementById('them-log');
const usTotalDisplay = document.getElementById('us-total');
const themTotalDisplay = document.getElementById('them-total');
const undoBtn = document.getElementById('undo-btn');
const newGameBtn = document.getElementById('new-game-trigger');

// Modals
const confirmModal = document.getElementById('confirm-modal');
const winOverlay = document.getElementById('win-overlay');
const winText = document.getElementById('win-text');

function convertArabicDigits(str) {
    const id = ['٠','١','٢','٣','٤','٥','٦','٧','٨','٩'];
    return str.replace(/[٠-٩]/g, function(w) {
        return id.indexOf(w);
    });
}

function updateUI() {
    usLog.innerHTML = '';
    themLog.innerHTML = '';
    let usTotal = 0;
    let themTotal = 0;

    history.forEach(round => {
        usTotal += round.us;
        themTotal += round.them;
        
        const uDiv = document.createElement('div');
        uDiv.textContent = round.us || ' ';
        usLog.appendChild(uDiv);

        const tDiv = document.createElement('div');
        tDiv.textContent = round.them || ' ';
        themLog.appendChild(tDiv);
    });

    usTotalDisplay.textContent = usTotal;
    themTotalDisplay.textContent = themTotal;
    localStorage.setItem('blot_history', JSON.stringify(history));

    checkWin(usTotal, themTotal);
}

function checkWin(us, them) {
    if ((us >= 152 || them >= 152) && us !== them) {
        saveBtn.disabled = true;
        usInput.disabled = true;
        themInput.disabled = true;
        winOverlay.style.display = 'flex';
        winText.textContent = us > them ? 'فوز' : 'خسارة !';
    } else {
        saveBtn.disabled = false;
        usInput.disabled = false;
        themInput.disabled = false;
        winOverlay.style.display = 'none';
    }
}

saveBtn.addEventListener('click', () => {
    let uVal = convertArabicDigits(usInput.value.trim());
    let tVal = convertArabicDigits(themInput.value.trim());

    if (uVal === '' && tVal === '') {
        alert("دخل رقم واحد على الأقل");
        return;
    }

    let uNum = parseInt(uVal) || 0;
    let tNum = parseInt(tVal) || 0;

    history.push({ us: uNum, them: tNum });
    usInput.value = '';
    themInput.value = '';
    updateUI();
});

undoBtn.addEventListener('click', () => {
    history.pop();
    updateUI();
});

newGameBtn.addEventListener('click', () => confirmModal.style.display = 'flex');
document.getElementById('confirm-no').addEventListener('click', () => confirmModal.style.display = 'none');
document.getElementById('confirm-yes').addEventListener('click', () => {
    history = [];
    updateUI();
    confirmModal.style.display = 'none';
});

document.getElementById('win-reset').addEventListener('click', () => {
    history = [];
    updateUI();
});

document.getElementById('win-close').addEventListener('click', () => {
    winOverlay.style.display = 'none';
});

// Sanitize inputs
[usInput, themInput].forEach(el => {
    el.addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/[^\d٠-٩]/g, '');
    });
});

updateUI();
