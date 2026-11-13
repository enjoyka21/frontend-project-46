
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

## Output formats

The default output format is `stylish`.

```bash
gendiff --format stylish file1.json file2.json
```

Plain format displays changes as text descriptions:

```bash
gendiff --format plain file1.json file2.json
```

## Demo

### Stylish format

[![asciicast](https://asciinema.org/a/pSuH3V99MwHctftO.svg)](https://asciinema.org/a/pSuH3V99MwHctftO)

### Plain format

[![asciicast](https://asciinema.org/a/0F9xx7QjKDWniusf.svg)](https://asciinema.org/a/0F9xx7QjKDWniusf)
