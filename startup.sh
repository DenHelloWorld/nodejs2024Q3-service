#!/bin/sh
npm run migration:revert
npm run migration:generate
npm run migration:run

