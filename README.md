<p align="center">
    <img align="center" src="https://github.com/j3lte/alfredo/raw/main/.github/.assets/big_icon.png" />
    <br>
    <h1 align="center"> Alfredo</h1>
    <p align="center">Run your <a href="https://www.alfredapp.com/">Alfred workflows</a> in Deno, based on <a href="https://deno.land/">Deno</a></p>
</p>

---

[![tag](https://img.shields.io/github/tag/j3lte/alfredo.svg)](https://github.com/j3lte/alfredo)
[![license](https://img.shields.io/github/license/j3lte/alfredo.svg)](https://github.com/j3lte/alfredo)
[![main](https://github.com/j3lte/alfredo/actions/workflows/main.yml/badge.svg?branch=main)](https://github.com/j3lte/alfredo/actions/workflows/master.yml)
[![tag](https://img.shields.io/badge/deno->=1.23.0-green.svg)](https://github.com/denoland/deno)
[![tag](https://img.shields.io/badge/std-0.147.0-green.svg)](https://github.com/denoland/deno)

This is a Deno library, inspired by [Alfy](https://github.com/sindresorhus/alfy)
(a Node.JS library for running Alfred workflows).

> ⚠️ This project is work in progress. Expect breaking changes.

#### Quick links

- [API Reference](https://doc.deno.land/https://deno.land/x/alfredo/mod.ts)

## Client

Install the client:

```
deno install --allow-read --allow-write --allow-env -f --reload -n alfredo https://deno.land/x/alfredo/cli.ts
```

You can use the client to scaffold a new Alfred Workflow

```
$ alfredo --help


  Usage:   alfredo
  Version: 0.1.0

  Description:

    Let's do Deno things in Alfred (https://www.alfredapp.com/)

  Options:

    -h, --help     - Show this help.
    -V, --version  - Show the version number for this program.

  Commands:

    generate  <identifier> [folder]  - Generate a Alfred workflow
    link      [folder-name]          - Link the folder to the Alfred workflow folder
    unlink    [folder-name]          - Unlink the folder to the Alfred workflow folder
```

## Library

> Coming soon

## License

MIT License
