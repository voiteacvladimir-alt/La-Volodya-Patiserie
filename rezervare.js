document.addEventListener('DOMContentLoaded', function () {

    const formular = document.getElementById('formular-rezervare');
    const mesajRaspuns = document.getElementById('mesaj-raspuns');

    if (!formular) return;

    formular.addEventListener('submit', function (e) {
        e.preventDefault();

        
        const nume     = document.getElementById('nume').value.trim();
        const telefon  = document.getElementById('telefon').value.trim();
        const produs   = document.getElementById('produs').value;
        const data     = document.getElementById('data').value;
        const mentiuni = document.getElementById('mentiuni').value.trim();

      
        const azi = new Date().toISOString().split('T')[0];
        if (data < azi) {
            afiseazaMesaj('Te rugăm să alegi o dată validă (nu în trecut).', 'eroare');
            return;
        }

        
        const buton = formular.querySelector('button[type="submit"]');
        buton.textContent = 'Se trimite...';
        buton.disabled = true;

        
        fetch('https://formspree.io/f/meepnqlq', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nume: nume,
                telefon: telefon,
                produs: produs,
                data: data,
                mentiuni: mentiuni
            })
        })
        .then(function (response) {
            return response.json();
        })
        .then(function (date) {
            if (date.ok) {
                
                afiseazaMesaj(
                    'Mulțumim, ' + nume + '! Comanda ta a fost înregistrată. Te contactăm la ' + telefon + ' în curând! 🎂',
                    'succes'
                );
                formular.reset();
            } else {
               
                afiseazaMesaj(date.mesaj || 'A apărut o eroare. Încearcă din nou.', 'eroare');
            }
        })
        .catch(function () {
            afiseazaMesaj('Eroare de conexiune. Verifică internetul și încearcă din nou.', 'eroare');
        })
        .finally(function () {
            buton.textContent = 'Trimite comanda';
            buton.disabled = false;
        });
    });

    
    function afiseazaMesaj(text, tip) {
        mesajRaspuns.innerHTML = '<div class="mesaj-' + tip + '">' + text + '</div>';
        mesajRaspuns.scrollIntoView({ behavior: 'smooth' });

        
        setTimeout(function () {
            mesajRaspuns.innerHTML = '';
        }, 6000);
    }
});
