<p align="center">
    <img align="center" src="https://github.com/j3lte/alfredo/raw/main/.github/.assets/big_icon.png" />
    <br>
    <h1 align="center"> Alfredo</h1>
    <p align="center">Run your <a href="https://www.alfredapp.com/">Alfred workflows</a> in Deno, based on <a href="https://deno.land/">Deno</a></p>
</p>

---

[![tag](https://img.shields.io/github/tag/j3lte/alfredo.svg)](https://github.com/j3lte/alfredo)
[![license](https://img.shields.io/github/license/j3lte/alfredo.svg)](https://github.com/j3lte/alfredo)
[![master](https://github.com/j3lte/alfredo/actions/workflows/main.yml/badge.svg?branch=main)](https://github.com/j3lte/alfredo/actions/workflows/main.yml)
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

### Generate

Run the client:

```
alfredo generate <identifier> <optional:foldername>
```

Where:

- `identifier` needs to be a unique identifier, something like
  `com.alfredo.somethinguseful` (it's totally up to you)
- `foldername` is optional. If you omit it, alfredo will try to scaffold one in
  the current folder, otherwise it will create a folder with `foldername`

This will add the following to the folder:

- `run.ts` A script to get you started, with a link to the Alfredo library on
  Deno.land
- `icon.png` This icon will be used in the workflow, obviously you can replace
  that when you start editing the workflow in Alfred
- `info.plist` A starting workflow file that is automatically picked up by
  Alfred. You should start by editing the name, description etc in the workflow
  in Alfred.

#### The starter workflow

![script filter](https://github.com/j3lte/alfredo/raw/main/.github/.assets/workflow-script-filter.png)

The starter workflow will be a Script Filter Input (Inputs -> Script Filter)
with the following settings:

- Keyword: Set a usefull keyword to be used by Alfred to determine if it needs
  to run the script
- Language: Personally I am using Zsh, so I set this to `/bin/zsh`
- You should set the script to `with input as argv`, but obviously that is up to
  you
- Script:

```sh
if [ -f "/opt/homebrew/bin/deno" ]
then
  /opt/homebrew/bin/deno run -A run.ts "$1"
elif [ -f "$HOME/.deno/bin/deno"]
then
  "$HOME/.deno/bin/deno" run -A run.ts "$1"
fi
```

> Note: Because I have installed Deno using Homebrew, I will run it from
> '/opt/homebrew'. You can find it out yourself by testing in your terminal
> where the `deno` bin is: `which deno`. For the starter script I am keeping it
> as generic as possible

### Link

```
alfredo link <optional:foldername>
```

This will try to link the folder to your Alfred workflow folder. Alfredo will
try to determine this by checking for the workflow folder in your Alfred
settings

### Unlink

```
alfredo unlink <optional:foldername>
```

This will try to unlink the folder from your Alfred workflow folder. Note that
it will fail if it can't find the folder, or determine the folder in your Alfred
workflow folder to not be a symlink.

## Library

> Coming soon

## License

MIT License
