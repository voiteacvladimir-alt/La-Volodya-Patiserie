
document.addEventListener('DOMContentLoaded', function () {
    let cos = JSON.parse(localStorage.getItem('cosLaVolodya')) || []; 

    const cosCount = document.querySelector('.cos-count');
    const cosLista = document.getElementById('cos-lista');
    const cosTotal = document.getElementById('cos-total');
    const golesteCos = document.getElementById('goleste-cos');

    function updateCos() {
        if (!cosCount) return;

        cosCount.textContent = cos.length;

        if (cosLista) {
            cosLista.innerHTML = '';
            let total = 0;

            cos.forEach((produs, index) => {
                const li = document.createElement('li');
                li.innerHTML = `
                    ${produs.nume} 
                    <span>${produs.pret} lei</span>
                `;
                cosLista.appendChild(li);
                total += produs.pret;
            });

            cosTotal.textContent = `Total: ${total} lei`;

            
            localStorage.setItem('cosLaVolodya', JSON.stringify(cos));
        }
    }

    document.querySelectorAll('.buton-adauga').forEach(buton => {
        buton.addEventListener('click', function () {
            const card = this.closest('.card-produs');
            const nume = card.querySelector('h3').textContent;
            const pretText = card.querySelector('.pret').textContent;
            const pret = parseFloat(pretText.replace(/[^0-9.]/g, ''));

            cos.push({ nume, pret });

           
            this.textContent = 'Adăugat ✓';
            this.style.backgroundColor = '#28a745';
            this.disabled = true;
            setTimeout(() => {
                this.textContent = 'Adaugă în coș';
                this.style.backgroundColor = '';
                this.disabled = false;
            }, 1800);

            updateCos();
        });
    });

    
    if (golesteCos) {
        golesteCos.addEventListener('click', function () {
            cos = [];
            updateCos();
        });
    }

    updateCos();
});
