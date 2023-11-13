# Tornado Hound

## Overview
Tornado Hound is a real-time tornado detection web application developed during MakeUC 2023 hackathon. Built using Next.js and bootstrapped with `create-next-app`, this innovative platform allows users to monitor a 30x30 area around their location for tornado activity, providing instant notifications of potential threats.

## Features
- **Real-Time Tornado Detection:** Utilizes a TensorFlow.js model to analyze the latest radar data for signs of tornadoes.
- **Unique AI-Driven Approach:** Employs a transfer-learned VGG16 convolutional neural network trained on NEXRAD data of F2+ tornadoes since 2011.
- **User-Friendly Interface:** Simple to use, requiring just the user's zipcode to provide weather visualization and tornado detection.

## Technology Stack
- **Front-End:** TypeScript, HTML, CSS, React, and Tailwind CSS.
- **AI Model:** TensorFlow.js, Keras for model training.
- **Data Visualization and Collection:** Python (in a separate repository).

## Installation
No installation required! Access the live application at [www.tornadohound.tech](http://www.tornadohound.tech).

## Usage
1. Visit [Tornado Hound](http://www.tornadohound.tech).
2. Enter your zipcode.
3. View real-time weather data and receive tornado alerts.

## Contributing
Contributions are welcome! Please feel free to fork the repository, make changes, and submit a pull request. Standard open-source contribution guidelines apply.

## Credits
Special thanks to Py-Art, Keras (VGG16), Next.js, NEXRAD data, and our dedicated contributors Aakash Rammohan and Michael Mercer.

## License
This project is licensed under the MIT License.

## Contact
For any inquiries or collaborations, please refer to my LinkedIn profile available on my GitHub profile.
