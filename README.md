![Sticky Codes](https://github.com/abdunnahid/sticky-codes/blob/dev/src/assets/sticky-codes-cover.jpg)

![GitHub release (latest by date)](https://img.shields.io/github/v/release/abdunnahid/sticky-codes)
![GitHub contributors](https://img.shields.io/github/contributors/abdunnahid/sticky-codes)
![Code Climate maintainability](https://img.shields.io/codeclimate/maintainability/abdunnahid/sticky-codes)
[![GitHub issues](https://img.shields.io/github/issues/abdunnahid/sticky-codes)](https://github.com/abdunnahid/sticky-codes/issues)

# Introduction
Another sticky notes app!
Yes, You are right! But we are different.

## How?

> This sticky notes really sticks.

> It will be always on top of all your other applications on the desktop. Of Course it is minimizable if you want.

> When focus on other application you will get a full screen note preview. 

> Find notes like a pro. Here we are highly inspired by vscode. You might use Ctrl+P to find file in vscode. Here we have Ctrl+F. Search and jump to the note.

> Auto copy texts from your clipboard. If you want to copy something and want paste it to a new note. We covered you. App will auto copy & paste your things into a new note when you add one.

> Text formatting! Yes it has text formatting tools that are not really overwhelming. 

> Keep code snippets on notes. If you wanna have some code in a note and want the same styling and formatting as your code editor, just copy code from your IDE & click on add new note. Brooom! As simple as that. You have a code snippet on sticky codes as like your code editor. 

You know what the fun part is? If we miss out something you want in your sticky notes app. Just make it like yours. Create an issue with your feature request or suggestions. We of course will look into it as soon as possible.

Want to contribute and make things better? You are most welcome. We believe, great things come from a great community.The power of open source is the power of people, the people rule. Show you power by providing any idea, suggestion, bug, feature request, code, design anything. If you want to contribute in code, just pick an issue or make your desired changes and create a PR.

# Technologies Used

- Angular v9.0.0
- Electron v8.0.0
- Electron Builder v21.2.0

/!\ Angular 8.x CLI needs Node 10.9 or later to works correctly.

## Getting Started

Clone this repository locally :

``` bash
git clone https://github.com/abdunnahid/sticky-codes.git
```

Install dependencies with npm :

``` bash
npm install
```

There is an issue with `yarn` and `node_modules` when the application is built by the packager. Please use `npm` as dependencies manager.


If you want to generate Angular components with Angular-cli , you **MUST** install `@angular/cli` in npm global context.
Please follow [Angular-cli documentation](https://github.com/angular/angular-cli) if you had installed a previous version of `angular-cli`.

``` bash
npm install -g @angular/cli
```

## To build for development

- **in a terminal window** -> npm start

Voila! You can use your Angular + Electron app in a local development environment with hot reload !

The application code is managed by `main.ts`. In this sample, the app runs with a simple Angular App (http://localhost:4200) and an Electron window.
The Angular component contains an example of Electron and NodeJS native lib import.
You can disable "Developer Tools" by commenting `win.webContents.openDevTools();` in `main.ts`.

## Included Commands

|Command|Description|
|--|--|
|`npm run ng:serve:web`| Execute the app in the browser |
|`npm run build`| Build the app. Your built files are in the /dist folder. |
|`npm run build:prod`| Build the app with Angular aot. Your built files are in the /dist folder. |
|`npm run electron:local`| Builds your application and start electron
|`npm run electron:linux`| Builds your application and creates an app consumable on linux system |
|`npm run electron:windows`| On a Windows OS, builds your application and creates an app consumable in windows 32/64 bit systems |
|`npm run electron:mac`|  On a MAC OS, builds your application and generates a `.app` file of your application that can be run on Mac |

**The application is optimised. Only /dist folder and node dependencies are included in the executable.**


## Browser mode

Maybe you want to execute the application in the browser with hot reload ? Just run `npm run ng:serve:web`.
**Note that you can't use Electron or NodeJS native libraries in this case.** Please check `providers/electron.service.ts` to watch how conditional import of electron/Native libraries is done.
