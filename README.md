<p align="center">
    <img align="center" src="assets/big_icon.png" />
    <br>
    <h1 align="center"> Alfredo</h1>
    <p align="center">Run your <a href="https://www.alfredapp.com/">Alfred workflows</a> in Deno, based on Tauri</p>
</p>

---

This is a Deno library, inspired by [Alfy](https://github.com/sindresorhus/alfy)
(a Node.JS library for running Alfred workflows).

## Client

Install the client:

```
deno install --allow-read --allow-write --allow-env -f -n alfredo https://deno.land/x/alfredo/cli.ts
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
