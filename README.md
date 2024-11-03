# Math Solver Chrome Extension

## Overview
The Math Solver Chrome Extension is a powerful tool designed to help users solve mathematical problems quickly and efficiently. Utilizing advanced AI capabilities, this extension allows users to interactively ask math questions, capture relevant screen content, and visualize equations using the Desmos graphing calculator.

## Purpose
The primary purpose of the Math Solver extension is to provide users with a convenient and effective means to solve math problems directly from their browser. By integrating AI responses and graphical representations, it enhances learning and understanding of mathematical concepts.

## Features
- **Interactive Chat Interface**: Users can type questions or requests in a chat-like interface.
- **Screenshot Capture**: Capture portions of the screen to send images directly to the AI for analysis.
- **Image Cropping**: Use Cropper.js to select and crop images before sending them for processing.
- **Desmos Integration**: Access a built-in Desmos graphing calculator to visualize equations and graphs.
- **AI-Powered Solutions**: Leverage the Gemini API to receive detailed and formatted answers to math queries.
- **Customizable Design**: User-friendly interface with responsive design elements for an optimal user experience.

## Tech Stack
- **Frontend**: 
  - React: For building the user interface.
  - Cropper.js: For image cropping functionality.
- **APIs**:
  - Gemini API: For providing AI-powered answers.
  - Desmos API: For graphing and visualizing mathematical equations.
- **Browser Extensions**:
  - Chrome Extensions API: For creating and managing the extension's functionalities.
- **Styles**: CSS for styling and responsive design.

## Installation
1. Download or clone this repository to your local machine.
2. Run the command "npm run build".
3. Open Chrome and navigate to `chrome://extensions/`.
4. Enable "Developer mode" at the top right corner.
5. Click "Load unpacked" and select the directory of your cloned project(build directory).
6. The Math Solver extension will now be available in your Chrome browser.

## Impact
The Math Solver Chrome Extension is designed to enhance the educational experience by making math problem-solving accessible and engaging. By combining AI and graphing tools, it empowers students, educators, and anyone interested in mathematics to improve their problem-solving skills and deepen their understanding of mathematical concepts.

## Future Enhancements
- **Expanded Math Topics**: Support for more complex mathematical topics and problem types.
- **User Feedback Mechanism**: Implement a feedback system to improve responses based on user input.
- **Mobile Support**: Adapt the extension for use on mobile browsers for broader accessibility.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments
- [Gemini API](https://ai.google.dev/gemini-api): For providing AI-powered responses.
- [Desmos API](https://www.desmos.com/api/v1.9/docs/index.html): For offering graphing capabilities.
- [Cropper.js](https://fengyuanchen.github.io/cropperjs/): For image cropping functionalities.
