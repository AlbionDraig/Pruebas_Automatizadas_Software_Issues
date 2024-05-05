const { loginPage } = require("../utilities/login/login.cy");
const { logout } = require("../utilities/login/logout.cy");
const { casePageCreate } = require("../utilities/page/casePageCreate.cy");
const { casePageDelete } = require("../utilities/page/casePageDelete.cy");

// Parametrical variables
var url, user, password = "";
var tittle, content = "";

describe('Scenario: Crear new Page', () => {
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
      cy.fixture('page').then(data => {
        tittle = data.tittle;
        content = data.content;
      });
    });
    it('Steps', () => {
        //Given Ingreso al portal de Ghost "<url>" con "<user>", "<password>"
        loginPage.visit(url);
        loginPage.validatePage();
        loginPage.login(user,password);
        loginPage.validateError();
    
        //When Creo un nuevo Page con "<tittle>", "<content>"
        casePageCreate.visit()
        casePageCreate.create(tittle,content)
    
        //Then Valido que se haya creado la pagina con "<tittle>"
        casePageCreate.validate(tittle)

        //And elimino el page creado "<tittle>"
        casePageDelete.delete(tittle)   
    
        //And Cierro sesion en "<url>"
        logout.visit(url)
        logout.validateError()
      });
    
    })