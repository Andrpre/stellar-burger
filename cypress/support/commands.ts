/// <reference types="cypress" />

//Закрываем модальное окно по нажатию на крестик
Cypress.Commands.add('closeModal', () => {
  cy.get(`button[aria-lable="Закрыть"]`).click();
});

//Добавляем ингредиент в конструктор
Cypress.Commands.add('addIngredients', (ingredientIdArr) => {
  ingredientIdArr.forEach((id) => {
    cy.get(`[data-cy=ingredient-${id}]`).contains('Добавить').click();
  });
});

//Кликаем на ингредиент
Cypress.Commands.add('clickIngredient', (ingredientId) => {
  cy.get(`[data-cy=ingredient-${ingredientId}]`).click();
});

//Проверяем открыто/закрыто ли модальное окно ингредиента
Cypress.Commands.add('isModalIngredient', (check) => {
    const checkExist = check ? 'exist' : 'not.exist';
    cy.contains('Детали ингредиента').should(checkExist);
});

declare namespace Cypress {
  interface Chainable<Subject> {
    closeModal(): void;
    addIngredients(ingredientIdArr: Array<number>): void;
    clickIngredient(ingredientId: number): void;
    isModalIngredient(check: boolean): void;
  }
}
