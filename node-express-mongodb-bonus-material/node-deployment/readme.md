# Deploying a Node App

The following will be instructions on how to deploy a Node app to Render's deployment service on `render.com`. This means deploying the back-end server as an API and/or a server-side rendered application.

## Getting Started

What you will need to get started is:

- A GitHub account.
- A Render account that is connected to GitHub.
- A local Node application, ready to be uploaded.

## Deploying the back-end server

**The following instructions assume that you have created an account on `Render.com`, linked your GitHub account, and understand how to upload & push new changes to your GitHub repository**

0. Make sure you have a working .env file with your MongoDB connection string and any other environment variables you need. If you don't have one, you can create one in the root directory of your project.

1. Upload the all of contents of the project folder (EXCEPT `node_modules` and the `.env`) to a GitHub repository. See [vs-code-github.md](./vs-code-github.md) for instructions on how to do this using VS Code.

2. Sign in to GitHub, then go to `Render.com` and choose "GitHub" for your login method.

3. Authorize the application Click the `New +` button next to your username.

4. Select **Web Service**.

5. Select the GitHub repository you just uploaded to.

6. Give it a name that matches the repository.

7. Region should be closest to you. US East and US West should be the main options you're looking at, depending on if you're closer to the East coast or West coast.

8. Root directory should remain empty, UNLESS there is a single folder in your repository containing the project. The Root directory refers to the one that holds other folders such as `models` and `routes`. If those are the first folders you see in the repository, leave this empty by default.

9. Runtime should be set to `Node`.

11. Build Command should be `npm install` so that the cloud installs the node modules on render's end.

12. Start command should be `node [name of your main file]`. For example, if your main file is `index.js`, then the Start command should be `node index.js`.

13. Select the "free" tier.

14. Add your environment variables. If you have a `.env` file already, you should choose the option to upload it. If not, then under "Advanced" options, you can input the Environment Variables. For example, the first variable should be your MongoDB connection string. The Key should be `MONGODB_URI` and the Value should be `mongodb+srv://<USERNAME>:<PASSWORD>@cluster0.<CLUSTER-CODE>.mongodb.net/<DATABASE NAME>`, but with your personal credentials filled in. If you have other environment variables, add those as well.

15. Click "Create Web Service" and wait for your project to build.

16. Once it's done, click on the "logs" tab on the left side of the page. You should see in the logs that MongoDB failed to connect. This is because Render's web services are at a different IP address.

If you click on the white `Connect` drop down option next to the blue `Manual Deploy` button, select `Outbound`, you should see a list of potential IP addresses that Render will choose from.

17. Go to MongoDB Atlas, and sign in. On the left side, there should be a "Network Access" tab. Add the IP addresses that were listed from Render, and label each of these as "Render 1", "Render 2", etc.

18. Go back to Render, and click on the blue `Manual Deploy` button. Select `Deploy latest commit`. This will also be what you do whenever you make changes to your code and push it to GitHub.

19. The logs should show "MongoDB Connected" this time, which means it works. Test it by making a GET request via Postman. You can get the base URL from Render, under the title of your web service. If your data comes back, congrats! You've successfully deployed the server for your application!

20. If your app has a front end interface, you can test that as well with the base URL.

21. Congratulate yourself. It's deployed, and you can share that link with anyone!

