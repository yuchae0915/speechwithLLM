To create app instructions (doesn't need to be executed)
```
npx create-react-app my-app
cd my-app
npm start
```
# Initial environment setup (need to be executed)

## download [VTube Studio](https://denchisoft.com/)
## download [VB-Audio](https://vb-audio.com/Cable/)
You need to change the local computer output to Cable-input and change the microphone input source in vts to Cable-output

**Execute the following two lines of commands in different terminals respectively**

## `node api.js` 
run server in `port 3001` to post with https://chatdev.gai.tw/v1.0/chat/completions\
## `npm start` 
Runs the app in the development mode.\ 
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.\
when you click the button **start recognition** recording will begin and it will stop when you finish recording a sentence.\
Then the sound source waiting for the return will be passed into vts and output.



--------------------------------
#The following instructions are based on https://github.com/Hawkbat/VTubeStudioJS/tree/main/examples/vts-react-test#readme

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
