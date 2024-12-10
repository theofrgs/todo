To launch

prefill env file at root
$> cp .env.exemple .env

At root launch database with
$> docker compose up database -d

In api folder install package then launch api
$> cd api && pnpm install && pnpm run start:dev

(other terminal) In web folder install package then launch web
$> cd web && npm install && npm run dev

Go to http://localhost:3000/
