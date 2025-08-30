// Abrir popup para editar nome e sobre mim

const popup = document.querySelector(".popup");
const editBotao = document.querySelector(".profile__image-button");
const fecharBotao = document.querySelector(".popup__fechar-botao");

function abrirPopup() {
  popup.style.display = "flex";
}

function fecharPopup() {
  popup.style.display = "none";
}

editBotao.addEventListener("click", abrirPopup);
fecharBotao.addEventListener("click", fecharPopup);

///////////////////////////////////////////////////////////////////////////
// Alterar nome e sobre mim quando clicar no botão salvar do popup

let formElement = document.querySelector("#popup__form");

function AlterarPerfilFormSubmit(evt) {
  evt.preventDefault();

  let entradaNome = document.querySelector("#nome");
  let entradaSobre = document.querySelector("#sobre");

  let valorNome = entradaNome.value;
  let valorSobre = entradaSobre.value;

  let perfilNome = document.querySelector(".profile__title");
  let perfilSobre = document.querySelector(".profile__description");

  perfilNome.textContent = valorNome;
  perfilSobre.textContent = valorSobre;

  fecharPopup();
}

formElement.addEventListener("submit", AlterarPerfilFormSubmit); // Conecta a função ao formulário

///////////////////////////////////////////////////////////////////////////
// Botão "like" da section "element" mudar a cor para black quando clicado

const likeButtons = document.querySelectorAll(".element__like-button");

likeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const icon = button.querySelector(".element__like-icon");
    icon.classList.toggle("element__like-icon_active"); // alterna a classe para mudar cor/estilo
  });
});

/////////////////////////////////////////////////////////////////////////////

const initialCards = [
  {
    name: "Vale de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
  },
  {
    name: "Montanhas Carecas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
  },
  {
    name: "Parque Nacional da Vanoise ",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
];
/////////////////////////////////////////////////////////////////////////////////////
// Excluir card do container

const cardsContainer = document.querySelector(".elements");

cardsContainer.addEventListener("click", function (evt) {
  // Verifica se o clique foi no botão de exclusão
  if (evt.target.classList.contains("element__lixeira-icon")) {
    // verifica se na classe .elements existe um botão com a classe .element__delete-button
    // Encontra o cartão pai e remove
    const cardToDelete = evt.target.closest(".element"); // acha o ancestral <div> mais próximo com a classe .element e grava na variável cardToDelete
    cardToDelete.remove(); // exclui todo o ancestral <div>
  }
});

// Primeiro, precisamos selecionar os elementos para incluir cards
const addButton = document.querySelector(".profile__add-image"); // botão para abrir modal
const closeButton = document.querySelector(".popup-add-card__fechar-botao"); // botão fecha o modal
const popupcard = document.querySelector(".popup-add-card"); // modal

// Depois, criar a função que abre o popup
function openPopup() {
  popupcard.style.display = "flex";
}

function closePopup() {
  popupcard.style.display = "none";
}

// Por fim, conectar o botão à função
addButton.addEventListener("click", openPopup);
closeButton.addEventListener("click", closePopup);

///////////////////////////////////////////////////////////////////////////
// Adicionar card no container

const form = document.querySelector("#popup-add-card__form");
const containerCards = document.querySelector(".elements"); // div onde ficam os cards

// Função que cria e insere card no container
function criarCard(titulo, imagem) {
  const card = document.createElement("div");
  card.classList.add("element");
  card.innerHTML = `
    <button class="element__delete-button" type="button" aria-label="Excluir cartão">
      <img src="./images/lixeira.png" alt="botão lixeira" class="element__lixeira-icon">
    </button>
    <img class="element__image" src="${imagem}" alt="${titulo}" />
    <div class="element__description">
      <h1 class="element__title">${titulo}</h1>
      <button class="element__like-button" type="button" aria-label="Curtir">
        <img src="./images/like_button.svg" alt="botão like" class="element__like-icon">
      </button>
    </div>
  `;

  containerCards.prepend(card); // adiciona o card no topo
}

// Evento submit do formulário do popup
form.addEventListener("submit", (event) => {
  event.preventDefault(); // evita recarregar a página

  const titulo = form.titulo.value;
  const link = form.link.value;

  criarCard(titulo, link); // cria o card

  form.reset(); // limpa o formulário
  popupcard.style.display = "none"; // fecha popup
});
