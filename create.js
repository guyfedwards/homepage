#!/usr/bin/env node

const fs = require('mz/fs')
const chalk = require('chalk')
const path = require('path')
const bookmarkFilePath = process.platform === 'win32'
    ? path.join(process.env['USERPROFILE'], 'AppData\Local\Google\Chrome\User Data\Default\Bookmarks')
    : path.join(process.env['HOME'], '/Library/Application Support/Google/Chrome/Default/Bookmarks')
const templates = require('./templates')

const formatLinks = link => {
    return templates.link({
        name: link.name,
        url: link.url
    })
}

const formatSection = section => {
    return templates.section({
        title: section.name,
        links: section.children
            .map(formatLinks)
            .join('')
    })
}

const getSectionsHtml = parsed => {
    return parsed.roots.bookmark_bar.children
        .filter(item => item.name)
        .map(formatSection)
        .join('')
}

async function main () {
    const raw = await fs.readFile(bookmarkFilePath, 'utf8')
    const parsed = JSON.parse(raw)
    const sections = getSectionsHtml(parsed)
    const html = templates.html({sections})

    await fs.writeFile(path.resolve(__dirname, 'index.html'), html)
    console.log(chalk.green('./index.html written'))
}

main()

