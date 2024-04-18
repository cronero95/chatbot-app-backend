## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript project to interact with [ChatGPT API Free Reverse Proxy](https://github.com/PawanOsman/ChatGPT).

## Usage

1. Clone the project
2. Install the packages:
```bash
$ npm install
```
3. Get a API key from [ChatGPT API Free Reverse Proxy](https://github.com/PawanOsman/ChatGPT) project.
4. Add the API key in the <kbd>.env.template</kbd> file, then change the name to <kbd>.env</kbd>.

## Initial Config

```
The behavior of the AI assitant can be configurated in the "initial-config.ts" file. By changing the value of the "content" property, it's possible to indicate what behavior is expected.
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).