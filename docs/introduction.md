# Introduction

Minix is an attempt to provide a modern state management library to Mini Program frameworks.

## Why should you use Minix

Minix is a state management library that allows you to share state across components and pages within a single mini program as well as handle changes in said state. Mini programs do provide a way to manage state across the app through the app globalData but this method does not provide any way to monitor your state for changes and may result in your page/component state becomming outdated.

Minix also provides :

- Proper TypeScript support or autocompletion for JS users
- Monitoring state for changes
- Support for multiple unique stores

## Installation

Install Minix using npm

```js
npm install @encane/minix
```

[Next: Concepts/stores](./concepts/store.md)
