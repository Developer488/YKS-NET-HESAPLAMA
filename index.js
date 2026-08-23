document.addEventListener("DOMContentLoaded", function() {
    
    // --- YAĞMUR DAMLALARINI OLUŞTUR ---
    // Yağmur aslında her zaman yağıyor, sadece aydınlıkta CSS ile görünmez (şeffaf) oluyor.
    function yagmurOlustur() {
        const rainContainer = document.getElementById('rain-container');
        const damlaSayisi = 120; 

        for (let i = 0; i < damlaSayisi; i++) {
            let drop = document.createElement('div');
            drop.classList.add('drop');
            drop.style.left = Math.random() * 100 + 'vw';
            drop.style.animationDuration = Math.random() * 1 + 0.5 + 's';
            drop.style.animationDelay = Math.random() * 2 + 's';
            rainContainer.appendChild(drop);
        }
    }
    yagmurOlustur(); 


    // --- TEMA KONTROLÜ ---
    const themeToggleBtn = document.getElementById('theme-toggle');
    
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
        themeToggleBtn.title = "Işığı Aç";
    }

    themeToggleBtn.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        
        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
            themeToggleBtn.title = "Işığı Aç"; 
        } else {
            localStorage.setItem('theme', 'light');
            themeToggleBtn.title = "Işığı Kapat";
        }
    });


    // --- HESAPLAMA DİNLEYİCİLERİ ---
    const inputs = document.querySelectorAll('input[type="number"]');
    inputs.forEach(input => {
        input.addEventListener('input', hesapla);
    });
});

function sekmeDegistir(sekmeId, btnElement) {
    const contents = document.querySelectorAll('.tab-content');
    contents.forEach(content => content.classList.remove('active-content'));

    const buttons = document.querySelectorAll('.tab-btn');
    buttons.forEach(btn => btn.classList.remove('active'));

    document.getElementById(sekmeId).classList.add('active-content');
    btnElement.classList.add('active');
}

function getDeger(id) {
    let deger = document.getElementById(id).value;
    return deger === "" ? 0 : parseFloat(deger);
}

function dersNetiHesapla(dogruId, yanlisId, sonucId) {
    let dogru = getDeger(dogruId);
    let yanlis = getDeger(yanlisId);
    let net = dogru - (yanlis / 4);
    document.getElementById(sonucId).innerText = net.toFixed(2) + " Net";
    return net;
}

function hesapla() {
    // ================= TYT =================
    let trNet = dersNetiHesapla('tr-dogru', 'tr-yanlis', 'tr-net');
    let matNet = dersNetiHesapla('mat-dogru', 'mat-yanlis', 'mat-net');
    let sosNet = dersNetiHesapla('sos-dogru', 'sos-yanlis', 'sos-net');
    let fenNet = dersNetiHesapla('fen-dogru', 'fen-yanlis', 'fen-net');
    
    let toplamTyt = Math.max(0, trNet + matNet + sosNet + fenNet); 
    document.getElementById('toplam-tyt-net').innerText = toplamTyt.toFixed(2);

    // ================= AYT =================
    // Sayısal
    let aytMatNet = dersNetiHesapla('ayt-mat-dogru', 'ayt-mat-yanlis', 'ayt-mat-net');
    let fizNet = dersNetiHesapla('fiz-dogru', 'fiz-yanlis', 'fiz-net');
    let kimNet = dersNetiHesapla('kim-dogru', 'kim-yanlis', 'kim-net');
    let biyNet = dersNetiHesapla('biy-dogru', 'biy-yanlis', 'biy-net');

    // Edebiyat ve Sosyal-1
    let edebNet = dersNetiHesapla('edeb-dogru', 'edeb-yanlis', 'edeb-net');
    let tar1Net = dersNetiHesapla('tar1-dogru', 'tar1-yanlis', 'tar1-net');
    let cog1Net = dersNetiHesapla('cog1-dogru', 'cog1-yanlis', 'cog1-net');

    // Sosyal-2
    let tar2Net = dersNetiHesapla('tar2-dogru', 'tar2-yanlis', 'tar2-net');
    let cog2Net = dersNetiHesapla('cog2-dogru', 'cog2-yanlis', 'cog2-net');
    let felsNet = dersNetiHesapla('fels-dogru', 'fels-yanlis', 'fels-net');
    let dinNet = dersNetiHesapla('din-dogru', 'din-yanlis', 'din-net');
    
    // ================= ALANLARA GÖRE =================
    let toplamSay = Math.max(0, aytMatNet + fizNet + kimNet + biyNet);
    document.getElementById('toplam-say-net').innerText = toplamSay.toFixed(2);

    let toplamEa = Math.max(0, aytMatNet + edebNet + tar1Net + cog1Net);
    document.getElementById('toplam-ea-net').innerText = toplamEa.toFixed(2);

    let toplamSoz = Math.max(0, edebNet + tar1Net + cog1Net + tar2Net + cog2Net + felsNet + dinNet);
    document.getElementById('toplam-soz-net').innerText = toplamSoz.toFixed(2);
}