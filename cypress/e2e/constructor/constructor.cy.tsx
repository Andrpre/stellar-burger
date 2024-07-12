/// <reference types="cypress" />

describe('Добавление булки и ингредиента из списка в конструктор', () => {
  beforeEach(() => {
    // Загружаем данные из файла перед запуском тестов
    cy.intercept('GET', 'api/ingredients', {
      fixture: 'ingredients.json'
    });
    cy.viewport(1300, 800);
    cy.visit('http://localhost:4000');
  });
  it('Создаем булку в конструктере, через добавление булки, начинки и соуса', () => {
    cy.get(`[data-cy=ingredient-1]`).contains('Добавить').click();
    cy.get(`[data-cy=ingredient-3]`).contains('Добавить').click();
    cy.get(`[data-cy=ingredient-4]`).contains('Добавить').click();

    cy.get(`[data-cy=constructor-1]`)
      .contains('Краторная булка N-200i')
      .should('exist');

    cy.get(`[data-cy=constructor-3]`)
      .contains('Филе Люминесцентного тетраодонтимформа')
      .should('exist');

    cy.get(`[data-cy=constructor-4]`).contains('Соус Spicy-X').should('exist');
  });
});

describe('Работа модальных окон', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', {
      fixture: 'ingredients.json'
    });
    cy.viewport(1300, 800);
    cy.visit('http://localhost:4000');
  });
  it('Открытие модального окна ингредиента', () => {
    cy.contains('Детали ингредиента').should('not.exist');
    cy.get(`[data-cy=ingredient-1]`).click();
    cy.contains('Краторная булка N-200i').should('exist');
  });
  it('Закрытие модального окна ингредиента по крестику', () => {
    cy.contains('Детали ингредиента').should('not.exist');
    cy.get(`[data-cy=ingredient-1]`).click();
    cy.get(`button[aria-lable="Закрыть"]`).click();
    cy.contains('Детали ингредиента').should('not.exist');
  });
});

describe('Создание заказа', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', {
      fixture: 'ingredients.json'
    });
    cy.intercept('GET', 'api/auth/user', {
      fixture: 'user.json'
    });
    cy.intercept('POST', 'api/orders', {
      fixture: 'order.json'
    }).as('postOrder');

    window.localStorage.setItem(
      'refreshToken',
      JSON.stringify('data.refreshToken')
    );
    cy.setCookie('accessToken', 'data.accessToken');
    cy.viewport(1300, 800);
    cy.visit('http://localhost:4000');
  });
  afterEach(() => {
    cy.clearAllLocalStorage();
    cy.clearCookies();
  });
  it('Собираем бургер и оформляем заказ', () => {
    cy.get(`[data-cy=ingredient-1]`).contains('Добавить').click();
    cy.get(`[data-cy=ingredient-3]`).contains('Добавить').click();
    cy.get(`[data-cy=ingredient-4]`).contains('Добавить').click();

    cy.get(`[id=submit-order-button]`).contains('Оформить заказ').click();
    cy.wait('@postOrder');
    cy.get('[data-cy=order-number]').contains('45513').should('exist');
    cy.get(`button[aria-lable="Закрыть"]`).click();
    cy.get('[data-cy=order-number]').should('not.exist');

    cy.get(`[data-cy=container-constructor]`)
      .contains('Краторная булка N-200i')
      .should('not.exist');
    cy.get(`[data-cy=container-constructor]`)
      .contains('Филе Люминесцентного тетраодонтимформа')
      .should('not.exist');
    cy.get(`[data-cy=container-constructor]`)
      .contains('Соус Spicy-X')
      .should('not.exist');
  });
});
