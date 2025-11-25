# E-Commerce Website - Cloud Computing Project

This is the final project for the **Cloud Computing** course.  
The application is built with **Express.js + TypeScript** and follows the **Domain Driven Design Architecture** pattern.  
The goal is to create a small e-commerce website that is easy to extend and integrate with cloud services in the future.

---

## Tech Stack

- **Node.js** + **Express.js**
- **TypeScript**
- **Domain Driven Design Architecture**
- **Swagger** (API Documentation)
- **JWT Authentication**
- **Docker** (optional for deployment)

---

## Project Structure

```
src/
 ┣ application/
 ┃ ┗ auth.service.ts        # Business logic for authentication
 ┣ domain/
 ┃ ┗ entities/
 ┃   ┗ user.ts              # User entity definition
 ┣ infrastructure/
 ┃ ┗ repositories/
 ┃   ┗ auth.repository.ts   # Data access layer
 ┣ presentation/
 ┃ ┗ auth.controller.ts     # Handles request/response
 ┣ routes/
 ┃ ┗ auth.route.ts          # Authentication routes
 ┣ shared/
 ┃ ┗ constants/
 ┃   ┗ auth.constant.ts     # Shared constants
 ┃ ┗ middleware/
 ┃   ┗ auth.middleware.ts   # Authentication middleware
 ┣ utils/
 ┃ ┣ response-type.util.ts  # Response formatter
 ┃ ┗ swagger.util.ts        # Swagger configuration
 ┗ index.ts                 # Main entry point
```

---

## Installation & Run

### 1. Clone the project
```bash
git clone https://github.com/nghiemledo/cc-express-render.git
cd cc-express-render
```

### 2. Install dependencies
```bash
pnpm install
```

### 3. Run in development mode
```bash
pnpm run dev
```

### 4. Build & run in production
```bash
pnpm run build
pnpm start
```

---

## API Documentation
The project includes **Swagger** for API documentation.  
After running the project, open:
```
http://localhost:3000/api-docs
```

---

## Features (current and planned)

- [x] Authentication (Login, Register, JWT)
- [ ] Product management (CRUD Products)
- [ ] Shopping cart
- [ ] Checkout
- [ ] Order management
- [ ] Cloud deployment (Heroku/AWS/Azure)

---

## License
This project is licensed under the [MIT License](LICENSE.txt) - see the [LICENSE.md](LICENSE.txt) file for details.