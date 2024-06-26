// Import modules to navigate and interact
const { loginPage } = require("../utilities/login/login.cy");
const { logout } = require("../utilities/login/logout.cy");
const { memberCreate } = require("../utilities/member/createMenber.cy");
const { memberDelete } = require("../utilities/member/deleteMenber.cy");

// Parametrical variables
var url, user, password = "";
var name, email, note = "";

describe('Scenario: Eliminar un Member', () => {
  beforeEach(() => {
    Cypress.on('uncaught:exception', (err, runnable) => {
      console.error('Uncaught exception', err);
      return false;
    });
    // Obtener credenciales
    cy.fixture('credentials').then(credentials => {
        url = credentials.url;
        user = credentials.user;
        password = credentials.password;
    });
    // Obtener informacion del member
    cy.fixture('member').then(data => {
      name = data.name;
      email = data.email;
      note = data.note;
    });
  });

  it('Steps', () => {
    //Given Ingreso al portal de Ghost "<url>" con "<user>", "<password>"
    loginPage.visit(url);
    loginPage.validatePage();
    loginPage.login(user,password);
    loginPage.validateError();
    cy.screenshot("Login", { capture: "fullPage", overwrite: true });

    //And Creo un nuevo Member con "<memberName>", "<memberEmail>", "<memberNote>"
    memberCreate.visit()
    memberCreate.create(name, email, note)
    memberCreate.validate(name)
    cy.screenshot("CreateMember", { capture: "fullPage", overwrite: true });

    //When Elimino el Member creado
    memberDelete.visit()
    memberDelete.delete()
    cy.screenshot("DeleteMember", { capture: "fullPage", overwrite: true });

    //Then Valido que se haya eliminado el Member
    memberDelete.validate()

    //And Cierro sesion en "<url>"
    logout.visit(url)
    logout.validateError()
    cy.screenshot("Logout", { capture: "fullPage", overwrite: true });
  });

})