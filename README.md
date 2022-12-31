# Fetch Url Validation

Este projeto realiza a validação de uma lista de URLs armazenadas em um arquivo XLSX. 

Demo 👉 https://devhonorato.github.io/urlValidation/

Download planilha modelo 👉 https://devhonorato.github.io/urlValidation/assets/modelo/modelo.xlsx

## 

O componente possui algumas propriedades, como `title`, `file`, `result`, `pag`, `contador`, `total`, `totalizador`, `start`, `startBtn`, `sucesso`, `erro`, `falha`, `pesquisa`, `pesquisaLength`, `fileName`, `status` e `fixStatus`. 

Além disso, o componente possui um construtor que inicializa os serviços `SearchPipe`, `ConnectionCheckService` e `NotificationService`.

O componente também possui o método `ImportXlsx2()`, que é responsável por ler o arquivo `XLSX` e validar cada URL contida nele. 

Esse método utiliza a classe `FileReader` para ler o conteúdo do arquivo e, em seguida, o biblioteca `XLSX` é usada para converter o conteúdo do arquivo em um objeto JSON. 

Em seguida, o componente itera sobre cada URL contida no objeto JSON e tenta fazer uma solicitação HTTP para cada uma delas, usando a função `fetch()`. 

Se a solicitação for bem-sucedida, a URL é marcada como válida. 

Se a solicitação falhar, a URL é marcada como inválida.

O componente também possui um intervalo de tempo que verifica periodicamente o `status de conexão` da aplicação com a internet, usando o método `checkOnlineStatus()`. 

Se o status mudar, a propriedade `status` é atualizada e a propriedade `fixStatus` é definida como 2.

<!--Importe uma lista de URL's desejadas no formato XLSX e clique em verificar.

Inicialmente o projeto foi criado para verificar a URL da imagem e o peso.

Porém ele funciona com qualquer URL publica que possua um retorno.


This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.2.7.

//## Development server

//Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

//## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page. -->
