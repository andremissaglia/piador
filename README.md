# Piador

Trabalho de web

## Primeira execução
1. Antes de executar pela primeira vez, primeiramente instalar as dependências.
  
  ```
  npm install
  bower install
  ```

2. Após isso, criar um banco de dados `postgres` com as seguintes informações:
  
  * host: localhost
  * user: piador
  * pass: piador
  * database: piador
  
  Se os dados da conexão forem diferentes, alterar o arquivo `config/connections.js`.

3. Altere o modo de migração `config/models.js` de `safe` para `alter`.

4. Rode o sails, as tabelas serão criadas automaticamente:
  ```
  sails lift
  ```
  
5. Altere o modo de migração `config/models.js` de `alter` para `safe`.
6. Copie o conteúdo de `dbchanges.sql` no terminal postgres, isso irá criar todas as chaves estrangeiras e triggers no banco de dados.

## Rodando localmente

Executar:
```
sails lift
```

Após isso o site estará rodando em `http://localhost:1337`

## Fazendo backup

Para exportar os dados, rode o sails e abra:
```
http://localhost:1337/backup/export
```

Para importar os dados, abra o seguinte link e insira o JSON:
```
http://localhost:1337/backup/import
```

## Grupo
* Anayã Gimenes Ferreira 8066457
* André Badawi Missaglia 8066523
* Matheus Henrique Soares 8066349
