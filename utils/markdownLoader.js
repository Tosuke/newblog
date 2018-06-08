const md = require('./markdown').default

module.exports = function(src) {
  const html = md.render(src)
  const result = `<template><div>${html}</div></template>`
  return result
}