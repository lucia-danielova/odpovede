/* PRO MODULE PATTERN (IIFE) */
const App = (function() {
    "use strict";

    const trackEvent = function(label) {
        if (typeof gtag === 'function') {
            gtag('event', 'interaction', { 'event_category': 'Assignment_Pro', 'event_label': label });
        }
    };

    const showToast = function(msg) {
        const container = document.getElementById('toast-container');
        const t = document.createElement('div');
        t.className = 'toast';
        t.innerText = msg;
        container.appendChild(t);
        setTimeout(() => t.remove(), 3000);
    };

    return {
        toggleTheme: function() {
            const b = document.body;
            const isLight = b.getAttribute('data-theme') === 'light';
            b.setAttribute('data-theme', isLight ? 'dark' : 'light');
            trackEvent('Theme_' + (isLight ? 'dark' : 'light'));
        },

        toggleCode: function(id, btn) {
            const el = document.getElementById(id);
            const isHidden = window.getComputedStyle(el).display === 'none';
            el.style.display = isHidden ? 'block' : 'none';
            btn.innerText = isHidden ? btn.innerText.replace('Zobraziť', 'Skryť') : btn.innerText.replace('Skryť', 'Zobraziť');
            trackEvent('Toggle_' + id);
        },

        calcFizzBuzz: function(val) {
            const display = document.getElementById('calcResult');
            const n = parseInt(val, 10);
            if (isNaN(n)) { display.innerText = "---"; display.style.color = "var(--text-main)"; return; }
            
            if (n % 15 === 0) { display.innerText = "SuperFaktura"; display.style.color = "var(--sf-orange)"; }
            else if (n % 3 === 0) { display.innerText = "Super"; display.style.color = "var(--sf-blue)"; }
            else if (n % 5 === 0) { display.innerText = "Faktura"; display.style.color = "var(--success)"; }
            else { display.innerText = n; display.style.color = "var(--text-main)"; }
        },

        runSequence: function() {
            const out = document.getElementById('out100');
            out.style.display = 'block';
            let html = "<strong style='color:var(--sf-orange)'>Výstup algoritmu (1-100):</strong><br><br>";
            for(let i = 1; i <= 100; i++) {
                let val = i;
                if(i % 15 === 0) val = `<span style="color:var(--sf-orange); font-weight:bold;">SuperFaktura</span>`;
                else if(i % 3 === 0) val = `<span style="color:var(--sf-blue); font-weight:bold;">Super</span>`;
                else if(i % 5 === 0) val = `<span style="color:var(--success); font-weight:bold;">Faktura</span>`;
                html += val + (i % 10 === 0 ? "<br>" : " &middot; ");
            }
            out.innerHTML = html;
            trackEvent('Run_FizzBuzz');
        },

        exportCSV: function(tableId, filename) {
            const rows = document.querySelectorAll(`#${tableId} tr`);
            if (rows.length <= 1) { showToast("❌ Žiadne dáta."); return; }
            let csv = Array.from(rows).map(r => 
                Array.from(r.querySelectorAll("th,td")).map(c => `"${c.innerText.replace(/"/g, '""')}"`).join(",")
            ).join("\n");
            let a = document.createElement("a");
            a.href = URL.createObjectURL(new Blob([csv], {type:"text/csv;charset=utf-8;"}));
            a.download = filename;
            a.click();
            showToast("✅ CSV stiahnuté.");
        },

        copyForSheets: function(tableId) {
            let data = Array.from(document.querySelectorAll(`#${tableId} tr`))
                .map(r => Array.from(r.querySelectorAll("th,td")).map(c => c.innerText).join("\t")).join("\n");
            navigator.clipboard.writeText(data).then(() => showToast("✅ Skopírované!"));
        },

        fetchAres: async function() {
            const input = document.getElementById('icoField').value.trim();
            const msg = document.getElementById('aresMsg');
            const loader = document.getElementById('aresLoader');
            const btn = document.getElementById('aresBtn');
            const table = document.getElementById('aresTable');
            const tbody = document.getElementById('aresTableBody');
            if(!input) { showToast("⚠️ Zadajte IČO."); return; }
            msg.innerHTML = "Spracovávam..."; loader.style.display = 'inline-block'; btn.disabled = true;
            try {
                const response = await fetch('ares.php?ico=' + encodeURIComponent(input));
                const data = await response.json();
                if (data.obchodniJmeno) {
                    msg.innerHTML = "✅ Načítané.";
                    table.style.display = 'table';
                    document.getElementById('aresExportBtns').style.display = 'flex';
                    const tr = document.createElement('tr');
                    tr.innerHTML = `<td>${data.ico}</td><td><strong>${data.obchodniJmeno}</strong></td><td>${data.sidlo.textovaAdresa}</td><td>${data.pravniFormaResponze?.nazev || 'Neuvedené'}</td>`;
                    tbody.appendChild(tr);
                } else { msg.innerHTML = "❌ Nenájdené."; }
            } catch(e) { msg.innerHTML = "❌ Chyba (ares.php?)."; }
            finally { loader.style.display = 'none'; btn.disabled = false; }
        }
    };
})();