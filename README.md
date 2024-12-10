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

TODO
Some points for improvement:

1. ADD tanstack to use prefetch advantage (prefetch in server side)
2. ADD config folder in api with typeorm config
3. ADD axios instance to centralize axios usage
4. ADD secure way to acces api (token, jwt , account etc . .. )
5. ADD create base (service,controller) to avoid recreating service/controller in future, avoiding bug, add features faster etc .. . .
6. ADD test
7. TaskList should only on mount get the value in the cach of tanstack, then refetch on update / delete => queryKey
8. dockerise all the project
9. CI cd ....