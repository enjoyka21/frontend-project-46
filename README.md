
# Difference Calculator

[![CI](https://github.com/enjoyka21/frontend-project-46/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/enjoyka21/frontend-project-46/actions)

A CLI utility that compares two configuration files and shows the differences.

## Installation

```bash
npm install
```

## Usage

Compare JSON files:

```bash
gendiff file1.json file2.json
```

Compare YAML files:

```bash
gendiff file1.yml file2.yml
```

Compare nested configuration files:

```bash
gendiff nested1.json nested2.json
```

The default output format is `stylish`.

You can also specify the output format:

```bash
gendiff -f stylish file1.json file2.json
```

## Demo

[![asciicast](https://asciinema.org/a/pSuH3V99MwHctftO.svg)](https://asciinema.org/a/pSuH3V99MwHctftO)
