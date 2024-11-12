
# Contributing Guidelines


Thank you for considering contributing to Relaunch project! We appreciate your help in making this project better. Below are the guidelines to help you get started.


### Clone the Repository

Clone the repository to your local machine:
# Start Generation Here

```bash

git clone https://github.com/your-username/relaunch.git
cd relaunch
```

## Setting Up the Project Locally

To set up this project on your local machine, please follow these steps:

### Prerequisites

1. **Node.js**: Ensure you have Node.js installed. You can download it from [nodejs.org](https://nodejs.org/).
2. **Yarn**: This project uses Yarn as a package manager. Install it globally if you haven't already:
   ```bash
   npm install --global yarn
   ```

3. **Turso**: You will need a Turso database. Sign up at [turso.io](https://turso.io/) and create a new database.


# Install dependencies

```bash

pnpm install
```

# Set up environment variables

```bash
cp .env.example .env
```
# Run database migrations
```bash
pnpm db:migrate
```

# Start the development server
```bash
pnpm dev
```
