// ABRIR POPUP PARA EDITAR O NOME E SOBRE MIM

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
// ALTERAR O NOME E O SOBRE MIM DO POPUUP

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
// MUDAR A COR DO BOTÃO 'LIKE' PARA PRETO DA SECTION ELEMENT

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
// ABRIR POPUP PARA INSERIR IMAGENS (CARD)

const addButton = document.querySelector(".profile__add-image");
const closeButton = document.querySelector(".popup-add-card__fechar-botao");
const popupcard = document.querySelector(".popup-add-card");

function openPopup() {
  popupcard.style.display = "flex";
}

function closePopup() {
  popupcard.style.display = "none";
}

addButton.addEventListener("click", openPopup);
closeButton.addEventListener("click", closePopup);

///////////////////////////////////////////////////////////////////////////
// EXCLUIR IMAGEM (CARD) NO CONTAINER

const cardsContainer = document.querySelector(".elements");

cardsContainer.addEventListener("click", function (evt) {
  if (evt.target.classList.contains("element__lixeira-icon")) {
    const cardToDelete = evt.target.closest(".element");
    cardToDelete.remove();
  }
});
/////////////////////////////////////////////////////////////////////////////////////
// ADICIONAR IMAGEM (CARD) NO CONTAINER

const form = document.querySelector("#popup-add-card__form");
const containerCards = document.querySelector(".elements");
const popupImage = document.querySelector("popup_type_image");

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

  function openImagePopup(imageSrc, imageAlt) {
    const imagePopup = document.querySelector(".popup_type_image");
    const popupImage = imagePopup.querySelector(".popup__image");
    const popupCaption = imagePopup.querySelector(".popup__caption");

    popupImage.src = imageSrc;
    popupImage.alt = imageAlt;
    popupCaption.textContent = imageAlt;

    openPopup(imagePopup);
  }

  function openImage() {
    const imagePopup = document.querySelector(".popup_type_image");
    imagePopup.classList.add("popup_opened");
  }

  // EVENT LISTENER PARA MUDAR A COR DO BOTÃO LIKE DO INNERHTML CRIADO
  const likeButton = card.querySelector(".element__like-button");

  likeButton.addEventListener("click", function () {
    likeButton.classList.toggle("element__like-icon_active");
  });

  // EVENT LISTENER PARA ABRIR POPUP DE IMAGEM
  const cardImage = card.querySelector(".element__image");
  cardImage.addEventListener("click", function () {
    const imagePopup = document.querySelector(".popup_type_image");
    const popupImage = imagePopup.querySelector(".popup__image");
    const popupCaption = imagePopup.querySelector(".popup__caption");

    popupImage.src = imagem;
    popupImage.alt = titulo;
    popupCaption.textContent = titulo;

    openImage(imagePopup);
  });

  containerCards.prepend(card);
}

// EVENT LISTENER PARA SUBMIT DO FORMULÁRIO POPUP DE ADIÇÃO DE IMAGEM (CARD)
form.addEventListener("submit", (event) => {
  event.preventDefault(); // evita recarregar a página

  const titulo = form.titulo.value;
  const link = form.link.value;

  criarCard(titulo, link);

  form.reset();
  popupcard.style.display = "none";
});
