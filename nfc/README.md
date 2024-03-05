# React Quiz App

This is a simple quiz-app created with react
## Install
### You need to **Install** all the packages the react app is using and the server

```
npm install --force
```

### Build the project
```
npm run build
```

### Running the Server
```
node index.js
```

## Developing
To further develop this project, you can:

- Add more questions to the quiz by modifying the `server/questions.js` file.
- Implement additional features such as a timer or a scoring system.
- Improve the UI/UX by customizing the styles in the `App.css` file.
- quiz.js is the frontend to develop on

### Quiz Data
The questions are stored inside the js file in the backend
| Key | Information | Type |
| ----- | ----- | ----- |
| id | the id of the question | number |
| question | the question title | string
| options | the different options to choose with the question | array with strings
| correctAnswer | the correct answer for the question | string |
```js
{
    id: 1,
    question: "Hva står HTML for?",
    options: ["Hyper Text Markup Language", "High-level Text Modeling Language", "Hyper Transfer Markup Language", "Home Tool Markup Language"],
    correctAnswer: "Hyper Text Markup Language"
},
```

## Author
This project was developed by Axel Sandbakken

## License
This project is licensed under the [MIT License](LICENSE.md). See [LICENSE](LICENSE.md) for details.
