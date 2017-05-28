#!/usr/bin/env node

const template = (strings, ...keys) => {
    return (...values) => {
        const dict = values[values.length - 1] || {}
        const result = [strings[0]]
        keys.map((key, i) => {
            const value = Number.isInteger(key) ? values[key] : dict[key]
            result.push(value, strings[i + 1])
        })
        return result.join('')
    }
}

const html = template`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <title>Algomi</title>
        <link rel="stylesheet" href="styles.css"/>
    </head>
    <body class="main">
        ${'sections'}
    </body>
    </html>
`

const section = template`
    <section class="section">
        <h2 class="title"># ${'title'}</h2>
        <ul class="links">
            ${'links'}
        </ul>
    </section>
`

const link = template`
    <li class="link">
        <a href="${'url'}">
            ${'name'}
        </a>
    </li>
`

module.exports = {
    html,
    section,
    link
}
