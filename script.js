document.addEventListener('DOMContentLoaded', function() {
    const carrossel = document.querySelector('.carrossel');
    const setas = document.querySelectorAll('.seta');
    const bolinhasContainer = document.querySelector('.bolinhas');
    const bolinhas = [];
    let slideIndex = 0;
    let intervalo;

    // Cria uma bolinha para cada item do carrossel
    for (let i = 0; i < carrossel.children.length; i++) {
        const bolinha = document.createElement('span');
        bolinha.classList.add('bolinha');
        bolinha.addEventListener('click', function() {
            goToSlide(i);
        });
        bolinhas.push(bolinha);
        bolinhasContainer.appendChild(bolinha);
    }

    // Define a primeira bolinha como ativa
    bolinhas[0].classList.add('ativo');

    // Adiciona eventos às setas de navegação
    setas.forEach(function(seta) {
        seta.addEventListener('click', function() {
            if (seta.classList.contains('anterior')) {
                slideAnterior();
            } else if (seta.classList.contains('proximo')) {
                proximoSlide();
            }
            resetIntervalo(); // Reinicia o intervalo quando há interação manual
        });
    });

    // Função para avançar para o slide anterior
    function slideAnterior() {
        slideIndex = (slideIndex - 1 + carrossel.children.length) % carrossel.children.length;
        goToSlide(slideIndex);
    }

    // Função para avançar para o próximo slide
    function proximoSlide() {
        slideIndex = (slideIndex + 1) % carrossel.children.length;
        goToSlide(slideIndex);
    }

    // Função para navegar até um slide específico
    function goToSlide(index) {
        carrossel.style.transform = `translateX(${-index * 100}%)`;
        bolinhas.forEach((bolinha, i) => {
            bolinha.classList.remove('ativo');
            if (i === index) {
                bolinha.classList.add('ativo');
            }
        });
    }

    // Função para iniciar o carrossel automático
    function iniciarCarrosselAutomatico() {
        intervalo = setInterval(function() {
            proximoSlide();
        }, 5000); // Avança para o próximo slide a cada 5 segundos
    }

    // Função para reiniciar o intervalo automático
    function resetIntervalo() {
        clearInterval(intervalo); // Limpa o intervalo anterior
        iniciarCarrosselAutomatico(); // Inicia novamente o intervalo
    }

    // Inicia o carrossel automático ao carregar a página
    iniciarCarrosselAutomatico();
});
