# Mandatum

A simple Javascript stack that allows you to control the Ryze Tello drone from a desktop interface.

## Table of Contents

- [Mandatum](#mandatum)
  - [Table of Contents](#table-of-contents)
  - [Todos](#todos)
  - [Introduction](#introduction)
  - [Quick Start](#quick-start)
  - [Commands](#commands)
  - [Licence](#licence)

## Todos

In no particular order:

- Implement controller support.
- ~~Implement basic settings page.~~
- Implement Tello state, command, and stream history and export functionality.

## Introduction

Mandatum is a Javascript stack that utilises VueJS and NodeJS to allow interaction with the Ryze Tello drone. The stack communicates with the drone via UDP messages.

## Quick Start

To get started, you will need to run `npm install` in the root directory. When that is done, you can launch the program via command line using `npm run electron:serve` or if you would like to build it, you need to run `npm run electron:build`.

## Commands

You can find all the available commands and their inputs [here](https://dl-cdn.ryzerobotics.com/downloads/tello/20180910/Tello%20SDK%20Documentation%20EN_1.3.pdf).

To execute a command, type into the command prompt and press `enter`.

## Licence

The MIT License (MIT)

Copyright (c) 2018 TokenChingy

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
