# Register and Login test work

Steps to run this project:

1. Clone the project.

2. Backend is located the `server root directory`. Server root directory is located inside server directory.

3. In the `server root directory` create `.env` file. File named `.envExample` shows all the required fields. Note that in JWT_SECRET you can write any word and number combination you want.

4. If `.env` file is created then in the `server root directory` run command:

`npm install`

5. Now you must create a database. For creating database run command:

`npm run migratedb`

6. After that add migration, which is created based on the User entity. Run command:

`npm run add-migration`

7. Finally you can run backend server. Run command:

`npm run dev`

Note: Server is running on port 5000.

8. If you want to run backend tests run the command:

`npm run test` or `npm run test:watch`

9. Now you must go to the `client root directory` where is located the frontend. Client root directory is located inside client directory.

10. In the `client root directory` run command:

`npm install`

11. Then in the `client root directory` you can start application to command:

`npm start`

Note: Frontend application running on port 3000. 12. If you want to run frontend tests run the command:

`npm run test` or `npm run test:watch`
