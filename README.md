# Banned words variants generator

## Description

This project help generating multiple variants of Russian/Cyrillic words, incluing declesion and transliteration.

You can use this project to create a list of pre-defined words, saved into `dist` directory.

The main purpose of the project is to create a list of banned words in Russian.

## Pre-requisites

1. You should have [Node](https://nodejs.org) installed;
2. You should have [Deno](https://deno.land/manual/getting_started/installation) installed;

## Quick Start

1. `git clone https://github.com/Kenya-West/banned-words-generator.git`

2. `npm ci`

3. Start making changes!

## Usage

`npm ci`

`deno task run:local`

## How it works

You put cyrillic and/or Russian words in `words.json` file, in `words` array.

The project takes this array and exports theirs variants to `dist/output.txt` file.

After that, you can do anything you want with the exported file. 