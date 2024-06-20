# BaeAndBlueInventory

![BaeAndBlueInventory](https://raw.githubusercontent.com/EEngvall/BaeAndBlueInventory/main/public/logo192.png)

An advanced inventory management system designed to streamline and optimize product tracking and stock management, with seamless AWS integration.

## Table of Contents

- [Description](#description)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [Future Plans](#future-plans)
- [Contribution](#contribution)
- [License](#license)

## Description

BaeAndBlueInventory is a comprehensive inventory management application that provides efficient tools for managing stock levels, tracking product movements, and handling product details. Designed for businesses of all sizes, this system helps maintain optimal inventory levels and streamline operations. It supports both mobile and desktop use, enabling users to upload photos of items directly using their device’s camera or from local files.

## Features

- **Product Management**: Add, edit, and delete product information.
- **Stock Management**: Monitor stock levels and track inventory movements.
- **Mobile and Desktop Compatibility**: Accessible on both desktop and mobile devices, with the ability to upload item photos from a mobile camera or local files.
- **AWS DynamoDB Integration**: Utilizes AWS DynamoDB for efficient and scalable data storage.
- **Responsive Design**: Ensures optimal user experience across different devices.

## Technologies Used

- **Frontend**:
  - [React](https://reactjs.org/): A JavaScript library for building user interfaces.
  - [React Bootstrap](https://react-bootstrap.github.io/): Bootstrap components built with React.
- **Backend**:
  - [Node.js](https://nodejs.org/): A JavaScript runtime built on Chrome's V8 engine.
  - [Express](https://expressjs.com/): A minimal and flexible Node.js web application framework.
- **Database**:
  - [AWS DynamoDB](https://aws.amazon.com/dynamodb/): A fast and flexible NoSQL database service for all applications that need consistent, single-digit millisecond latency at any scale.
- **Libraries**:
  - [Axios](https://axios-http.com/): A promise-based HTTP client for the browser and Node.js.
  - [React Router](https://reactrouter.com/): A collection of navigational components for React.
- **Others**:
  - [ESLint](https://eslint.org/): A tool for identifying and reporting on patterns in JavaScript.
  - [Prettier](https://prettier.io/): An opinionated code formatter.

## Installation

To run this project locally, follow these steps:

1. **Clone the repository**:
    ```bash
    git clone https://github.com/EEngvall/BaeAndBlueInventory.git
    cd BaeAndBlueInventory
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Start the development server**:
    ```bash
    npm start
    ```

4. **Navigate to** `http://localhost:3000` to view the application.

## Usage

The BaeAndBlueInventory allows you to:

1. **Manage Products**: Add, update, or remove products from the inventory.
2. **Track Stock Levels**: Monitor and update stock levels for each product.
3. **Upload Photos**: Upload product photos directly from your mobile device's camera or from local files.

## Configuration

### AWS Configuration

This project uses AWS DynamoDB for backend operations. Ensure you have set up the required AWS resources and have the necessary permissions to access them.

1. **AWS DynamoDB**: Configure DynamoDB to store your product and inventory data.

### Environment Variables

Set up your `.env` file in the root directory to include necessary environment variables:

```env
REACT_APP_API_BASE_URL=https://your-api-gateway-url
AWS_REGION=your-aws-region
DYNAMODB_TABLE_NAME=your-dynamodb-table-name
```
## Future Plans

### Enhanced Features and Integrations

- **Serverless Backend**: Transitioning from EC2 to AWS Lambda for backend operations to enhance scalability and reduce operational overhead.
- **Advanced Analytics**: Adding comprehensive analytics for inventory trends and order processing efficiency.
- **Integration with eCommerce Platforms**: Connecting the inventory system with popular eCommerce platforms for seamless inventory management.

## Contribution

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature-name`).
3. Commit your changes (`git commit -am 'Add some feature'`).
4. Push to the branch (`git push origin feature/your-feature-name`).
5. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
