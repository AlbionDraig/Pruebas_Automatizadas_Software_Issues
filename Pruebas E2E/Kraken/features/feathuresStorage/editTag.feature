Feature: Tag

@user1 @web
Scenario: Editar un Tag
  Given Ingreso al portal de Ghost "<url>" con "<user>", "<password>"
  And Creo un nuevo Tag con "<tagName>", "<tagColor>", "<tagDescription>"
  When Edito el Tag "<tagName>" con "<tagName1>", "<tagColor1>", "<tagDescription1>"
  Then Valido que se haya editado el tag "<tagName1>"
  And Elimino el tag "<tagName1>" creado
  And Valido que se haya eliminado el tag "<tagName1>"
  And Cierro sesion en "<url>"