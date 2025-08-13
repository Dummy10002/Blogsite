# Blogsite: Enhancing User Experience
[![Node.js](https://img.shields.io/badge/Node.js-14.x-yellow?style=flat-square)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-19.x-blue?style=flat-square)](https://reactjs.org/)

Blogsite is a React-based project focused on creating a seamless and intuitive user experience. With a minimalist approach, it leverages various dependencies to provide a robust frontend framework. The primary goal is to make the user experience better by incorporating organized code structures, static assets, and client-side routing. This is achieved through the implementation of efficient coding practices, optimized performance, and a user-centered design philosophy. By utilizing React's component-based architecture, Blogsite aims to deliver a fast, responsive, and engaging platform for users to interact with. The project's minimalist design ensures a clean and distraction-free interface, allowing users to focus on the content that matters. Overall, Blogsite strives to set a new standard for user experience in React-based applications.

* Build System with Vite
* Frontend Framework utilizing React
* Organized Code Structure for ease of maintenance
* Static Assets management
* Client-side Routing with React Router DOM

```mermaid
graph TD
    A[App] -->|uses|> B[React]
    B -->|utilizes|> C[React Router DOM]
    C -->|manages|> D[Client-side Routing]
    A -->|includes|> E[Static Assets]
    E -->|served by|> F[Vite]
    A -->|uses|> G[Redux]
    G -->|manages|> H[State]
    A -->|authenticates|> I[AuthLayout]
    I -->|protects|> J[Routes]
    A -->|renders|> K[Components]
    K -->|includes|> L[Header]
    K -->|includes|> M[Footer]
    K -->|includes|> N[Container]
    K -->|includes|> O[LogoutBtn]
    K -->|includes|> P[Logo]
    K -->|includes|> Q[Rte]
    K -->|includes|> R[Signup]
    K -->|includes|> S[PostForm]
    K -->|includes|> T[PostCard]
    K -->|includes|> U[AuthLayout]
    K -->|includes|> V[Login]
    K -->|includes|> W[Input]
    K -->|includes|> X[Select]
    K -->|includes|> Y[Button]
```

## ✨ Recent Updates
- Updated README.md via README Generator

## 🛠️ Tech Stack
- Node.js
- JavaScript/TypeScript
- React
- @reduxjs/toolkit
- @tailwindcss/vite
- @tinymce/tinymce-react
- appwrite
- html-react-parser
- react-hook-form
- react-redux
- react-router-dom

## 🏁 Getting Started
### Prerequisites
- Node.js (14.x or higher)
- npm or yarn
### Installation
1. Clone the repository: `git clone https://github.com/username/blogsite.git`
2. Install dependencies: `npm install` or `yarn install`
### Running
1. Start the development server: `npm run dev` or `yarn dev`
2. Open your browser and navigate to `http://localhost:3000`

Note: No API endpoints are provided as the project is primarily focused on the frontend. However, the project uses React Router DOM for client-side routing, and the routes are defined in the `src/main.jsx` file.