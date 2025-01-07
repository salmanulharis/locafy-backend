# Locafy Backend

## Overview
Locafy is a web application for managing shops and products. This README provides instructions on setting up the app, configuring the environment file, and an overview of the pages in the app.

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher) or yarn

### Installation
1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/locafy-backend.git
    cd locafy-backend
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

### Setting Up Environment Variables
1. Create a `.env` file in the root directory of the project.
2. Add the following environment variables to the `.env` file:
    ```env
    REACT_APP_API_URL=http://localhost:5000/api
    PORT=3000
    ```