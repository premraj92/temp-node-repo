const path = require('path')

// stores platform specific file separator like - for Windows === '\'['backward slash] or for POSIX(Linux/Mac) === '/'[forward slash]
const separator = path.sep
console.log(`Platform specific separator `, separator)

const normalizedFilePathForTestTxt = path.join('\content', 'subfolder', 'test.txt')
console.log(normalizedFilePathForTestTxt)


// .resolve() method - returns an absolute path - rather than a relative one
const absolutePathForTestTxt = path.resolve(__dirname, 'content', 'nested-content', 'test.txt')
console.log(absolutePathForTestTxt)
// Returns the last part(in most case fileNames) of the filePath
const basePath = path.basename(normalizedFilePathForTestTxt)

console.log(`basePath `, basePath)