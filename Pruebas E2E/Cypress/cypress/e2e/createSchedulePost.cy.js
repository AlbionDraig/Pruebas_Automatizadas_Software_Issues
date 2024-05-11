/*// Import modules to navigate and interact
const { loginPage } = require("../utilities/login/login.cy");
const { logout } = require("../utilities/login/logout.cy");
const{schedulePost} = require("../utilities/post/schedulePost.cy.js");
const { deletePost } = require("../utilities/post/deletePost.cy.js");

// Parametrizar variables
var url,
  user,
  password = "";
var title3, textPost3;

describe("Scenario: Crear un nuevo Post Programado", () => {
  beforeEach(() => {
    Cypress.on("uncaught:exception", (err, runnable) => {
      console.error("Uncaught exception", err);
      return false;
    });
    // Obtener credenciales
    cy.fixture("credentials").then((credentials) => {
      url = credentials.url;
      user = credentials.user;
      password = credentials.password;
    });
    // Obtener informacion del member
    cy.fixture("post").then((data) => {
      title3 = data.title3;
      textPost3 = data.textPost3;
    });
  });

  it("Steps", () => {
    //Given Ingreso al portal de Ghost "<url>" con "<user>", "<password>"
    loginPage.visit(url);
    loginPage.validatePage();
    loginPage.login(user, password);
    loginPage.validateError();
    
    //And Creo un nuevo Post
    schedulePost.visit();
    schedulePost.create(title3, textPost3);
    schedulePost.validate(title3);

    //When creo un scheduled post

    //Then Valido que se programado el post

    //And Elimino el Post creado
    deletePost.visit()
    deletePost.delete(title3)

    //And Cierro sesion en "<url>"
    logout.visit(url);
    logout.validateError();
  });
});
*/