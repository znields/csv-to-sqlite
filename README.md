# <img src="https://raw.githubusercontent.com/isaiahnields/csv-to-sqlite/master/build/icons/icon.png" width="48"> CSV to SQLite

> An electron app to create SQLite databases from CSV files.

![Build passing](https://img.shields.io/badge/build-passing-brightgreen.svg)
![GitHub package version](https://img.shields.io/github/package-json/v/isaiahnields/csv-to-sqlite.svg)
[![MIT license](https://img.shields.io/badge/license-MIT-blue.svg)]()

## Table of Contents

[Purpose](#purpose)<br>
[Compatibility](#compatibility)<br>
[Setup](#setup)<br>
[Future Goals](#future-goals)<br>


## Purpose

CSV to SQLite is an electron application designed to convert comma-separated values files to SQLite databases with [column type affinities](https://www.sqlite.org/datatype3.html). This desktop app allows a user to convert much more quickly when compared to command-line CSV to SQLite conversion methods. Instead of creating a custom conversion script for each SQLite database, a user is able to quickly adjust the parameters for how the CSV files should be converted.

## Compatibility

CSV to SQLite is compatible with Windows, Mac OS, and Linux.

## Setup

``` bash
# clone the repository
git clone https://github.com/isaiahnields/csv-to-sqlite

# install dependencies
npm install

# serve with hot reload
npm run dev

# build electron application for production
npm run build
```

## Future Goals

See [Projects](https://github.com/isaiahnields/csv-to-sqlite/projects).
