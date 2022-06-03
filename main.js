const navigation = document.getElementById('navigation')

// Ajuste de carregamento da função onScroll
window.addEventListener('scroll', onScroll) // adicionando o evento do scroll direto na janela inteira, 
// para que não ocorra erro de referência

onScroll() // quando carregar o arquivo, execute o onScroll
function onScroll() { // o objetivo da função é gerencial os scrolls da página
    showNavOnScroll()
    showBackToTopButtonOnScroll()

    activateMenuAtCurrentSection(home)
    activateMenuAtCurrentSection(services)
    activateMenuAtCurrentSection(about)
    activateMenuAtCurrentSection(contact)
}

// Dependendo da seção que tiver vendo na página, adicionar a classe ativa
// Cálculo para imaginar uma linha ao meio da tela
// Verificar se a seção passou sua parte de cima da linha e se sua parte de baixo está abaixo dessa linha
// Quando isso acontecer, o item do menu deve ficar marcado para esta seção
// No momento que esse cenário não acontecer mais, apresente a próxima seção no menu
function activateMenuAtCurrentSection(section) {
    const targetLine = scrollY + innerHeight / 2
    // innerHeight pega a altura visível da página
    // scrollY + innerHeight / 2 é o cálculo para determinar a posição da linha imaginária
    // usa-se const e não let porque, dentro da função, o targetLine não vai mudar o seu valor
    // a função está sendo executada sempre que fizer o scroll, recriando o targetLine

    // Verificar se o topo da seção passou da linha alvo
    
    const sectionTop = section.offsetTop
    // offsetTop pega a posição do topo do elemento
    
    const sectionHeight = section.offsetHeight
    // offsetHeight pega a posição da base do elemento
    
    const sectionTopReachOrPassedTargetline = targetLine >= sectionTop

    // Verificar se a base da seção está abaixo da linha alvo

    const sectionEndsAt = sectionTop + sectionHeight

    const sectionEndPassedTargetline = sectionEndsAt <= targetLine

    const sectionBoundaries = sectionTopReachOrPassedTargetline && !sectionEndPassedTargetline

    const sectionId = section.getAttribute('id')
    // getAttribute pega o atributo id da seção como uma string

    const menuElement = document.querySelector(`.menu a[href*=${sectionId}]`)
    // querySelector pesquisa pelo seletor
    // no menu, procura pelos elementos a, procura pelo atributo href que contenha o atributo id da seção
    // a interpolação ${} permite colocar dentro dele qualquer código JS
    // a interpolação numa template literals (``) troca tudo o que tiver dentro ${} pelo valor distribuído 
    // dentro dele, retornando, neste caso, o id

    menuElement.classList.remove('active')
    if (sectionBoundaries) {
        menuElement.classList.add('active')
    }
}

function showNavOnScroll() { // o objetivo da função é mostrar o navigation ao fazer o scroll
    if (scrollY > 0) { // o scrollY é uma variável criada pelo navegador que devolve o posicionamento do scroll
        navigation.classList.add('scroll') // quando o scroll for maior que 0, adicionar a classe scroll na 
        // lista de classe do navigation
    } else {
        navigation.classList.remove('scroll') // quando o scroll for igual a 0, remover a classe scroll da 
        // lista de classe do navigation
    }
}
   
function showBackToTopButtonOnScroll() { // o objetivo da função é mostrar o botão BackToTop ao fazer o scroll
    if (scrollY > 550) {
        backToTopButton.classList.add('show') // adicionar a classe show ao botão
    } else {
        backToTopButton.classList.remove('show') // remover a classe show do botão
    }
}

function openMenu() { // a função será executada quando clicar nos botões de abrir e fechar o menu
    document.body.classList.add('menu-expanded')
}

function closeMenu() {
    document.body.classList.remove('menu-expanded')
}

ScrollReveal({ // quando iniciar o scroll, os elementos serão revelados de cima para baixo vagarosamente
    origin: 'top', // originar de cima para baixo
    distance: '30px', // distância do topo
    duration: 700 // tempo de duração de 700ms
    // colocar quais seções devem aparecer primeiro
    // `` template literals, permite a quebra de linha
}).reveal(` 
    #home, 
    #home img, 
    #home .stats, 
    #services,
    #services header,
    #services .card
    #about,
    #about header,
    #about .content`)
