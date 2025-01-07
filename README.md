# MGin Kiosk Frontend

The **MGin Kiosk Frontend** is a Vue 3 app for a food kiosk system. It connects to the **MGin Kiosk API** to display menu items, categories, and images, letting users browse, manage their cart, and place orders. Built with Vue 3, Tailwind CSS, and Vite, it offers a fast and responsive experience.

## Table of Contents

- [Key Features](#key-features)
    - [Vue 3 Frontend](#vue-3-frontend)
    - [Tailwind CSS Styling](#tailwind-css-styling)
    - [Vite Build Tool](#vite-build-tool)
    - [API Integration](#api-integration)
- [Application Structure](#application-structure)
- [Quick Start](#quick-start)
    - [Local Development](#local-development)
    - [Docker Setup](#docker-setup)
- [Dependencies](#dependencies)
- [Installation](#installation)
- [Usage](#usage)
- [Views and Components](#views-and-components)
    - [Reusable Components](#reusable-components)
- [State Management](#state-management)
- [Environment Variables](#environment-variables)
- [Examples](#examples)
- [Contributing](#contributing)
- [License](#license)

---

## Key Features

### **Vue 3 Frontend**

- **Reactive State Management**: Uses Vue’s reactivity system to manage application state, such as cart data and product information.
- **Modular Design**: Organized into views, components, and composables for maintainability and scalability.
- **Dynamic Routing**: Utilizes Vue Router for seamless navigation between views.

### **Tailwind CSS Styling**

- **Utility-First CSS**: Tailwind CSS is used for styling, ensuring a consistent and responsive design across devices.
- **Customizable Themes**: Easily extend or modify the default Tailwind configuration to match branding requirements.

### **Vite Build Tool**

- **Fast Development**: Vite provides instant server start and hot module replacement (HMR) for a smooth development experience.
- **Optimized Production Build**: Vite generates highly optimized production builds for deployment.

### **API Integration**

- **Data Fetching**: Retrieves categories, menu items, and images from the **MGin Kiosk API** using **Axios**.
- **Order Management**: Sends structured order data to the backend API for processing.
- **Error Handling**: Includes mechanisms to handle API errors, ensuring a smoother user experience.

---

## Application Structure

The application is organized into the following key directories and files:

- **`src/`**: Contains the core application logic, including:
    - **`views/`**: Defines the main views of the app (`ProductsView.vue`, `CartView.vue`, `PaymentView.vue`).
    - **`components/`**: Reusable UI components (e.g., `ItemCard.vue`, `SidePanel.vue`, `ModalWindow.vue`).
    - **`composables/`**: Custom hooks for managing state and logic (e.g., `useCart.js`, `useCategories.js`, `useImageLoader.js`).
    - **`assets/`**: Static assets such as images and SVG icons.
    - **`router/`**: Defines the application routes using Vue Router.
    - **`utils/`**: Utility functions for API calls, debouncing, and more.
- **`public/`**: Contains static files like the favicon.
- **`tailwind.config.js`**: Tailwind CSS configuration file.
- **`vite.config.js`**: Vite configuration file.
- **`package.json`**: Lists project dependencies and scripts.

---

## Quick Start

### **Local Development**

1. Clone the repository:

    ```sh
    git clone https://github.com/cbpmanoel/mgin-front.git
    cd mgin-front
    ```

2. Install dependencies:

    ```sh
    npm install
    ```

3. Start the development server:

    ```sh
    npm run dev
    ```

4. Open the app in your browser at `http://localhost:5173`.

### **Docker Setup**

1. **Install Docker**: Ensure Docker and Docker Compose are installed on your system. You can download Docker from [here](https://www.docker.com/get-started).

2. **Clone the repository** (if not already done):

    ```sh
    git clone https://github.com/cbpmanoel/mgin-front.git
    cd mgin-front
    ```

3. **Build and Run the Docker Container**:

    ```sh
    docker-compose up --build
    ```

4. **Access the Application**:
   Open your browser and navigate to `http://localhost:5173`.

5. **Stop the Container**:
   To stop the container, run:

    ```sh
    docker-compose down
    ```

---

## Dependencies

The project requires the following dependencies:

- **Node.js 18+**
- **npm 10.8+**
- **Docker 24.0+**
- **Docker Compose 1.29+**

**The current version was developed and tested under Ubuntu 20.04 Desktop and Ubuntu 22.04 for WSL2**

---

## Installation

1. Clone the repository:

    ```sh
    git clone https://github.com/cbpmanoel/mgin-front.git
    cd mgin-front
    ```

2. Install dependencies:

    ```sh
    npm install
    ```

3. Set up the `.env` file (see [Environment Variables](#environment-variables)).

---

## Usage

### Development

Start the development server:

```sh
npm run dev
```

### Production Build

Generate an optimized production build:

```sh
npm run build
```

Preview the production build locally:

```sh
npm run preview
```

---

## Views and Components

### **ProductsView**

Displays the menu items in a scrollable grid, organized by categories. Includes a sidebar for navigation and a cart summary.

### **CartView**

Shows the current cart with a list of items, quantity selectors, and a summary of the total cost.

### **PaymentView**

Provides a payment form for completing orders, including options for credit card payments.

### **Reusable Components**

- **ItemCard.vue**: Displays individual menu items with name, image, and price.
- **SidePanel.vue**: Implements collapsible navigation for categories and the cart.
- **ModalWindow.vue**: Provides a reusable modal component for actions like confirming orders or showing alerts.

---

## State Management

The app uses **Vue 3 Composables** to modularize and reuse state management logic. Each composable focuses on a specific concern (e.g., cart, categories, images), simplifying both development and testing.

### **useCart Composable**

Manages the cart state, including adding/removing items, updating quantities, and calculating totals. Persists the cart state in `localStorage`.

### **useCategories Composable**

Fetches and manages the list of categories from the API, ensuring data validation and retry mechanisms for failed requests.

### **useCategoryItems Composable**

Fetches and manages the list of items for a specific category, with data validation and retry mechanisms.

### **useImageLoader Composable**

Handles the loading and caching of images from the API, ensuring efficient image display and memory management.

---

## Environment Variables

The following environment variable is required to configure the application. Create a `.env` file in the root directory and populate it with the example below:

```env
# Development Environment
VITE_API_BASE_URL=http://localhost:8000

# Production Environment
VITE_API_BASE_URL=https://api.example.com
```

---

## Examples

Here are two examples of the MGin Kiosk Frontend in action:

### **Large Screen Example**

![Large Screen Example](./gifs/screen-sample-lg.gif)

### **Small Screen Example**

![Small Screen Example](./gifs/screen-sample-sm.gif)

---

## Contributing

Contributions are welcome! Follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Submit a pull request with a detailed description of your changes.
