const ManageFileSystem = () => {
    const fs = { '/': {} }

    const MainDir = (path) => {
        const directory = path.split('/').filter(Boolean)
        let dirPath = fs['/']

        for (const dir of directory) {
            if (!dirPath[dir] || typeof dirPath[dir] !== "object") {
                throw new Error("path not found")
            }
            dirPath = dirPath[dir]
        }
        return dirPath
    }

    const MakeDir = (path) => {
        const directory = path.split('/').filter(Boolean)
        let dirPath = fs['/']

        for (const dir of directory) {
            if (!dirPath[dir]) {
                dirPath[dir] = {}
            } else if (typeof dirPath[dir] !== "object") {
                throw new Error("path does not exist!")
            }
            dirPath = dirPath[dir]
        }
    }

    const WriteFile = (path, data) => {
        const directory = path.split('/').filter(Boolean)
        const file = directory.pop()
        let dirPath = fs['/']

        for (const dir of directory) {
            if (!dirPath[dir] || typeof dirPath[dir] !== "object") {
                throw new Error("Path not exist!")
            }
            dirPath = dirPath[dir]
        }

        dirPath[file] = data
    }

    const ReadFile = (path) => {
        const directory = path.split('/').filter(Boolean)
        const file = directory.pop()
        let dirPath = fs['/']

        for (const dir of directory) {
            if (!dirPath[dir] || typeof dirPath[dir] !== "object") {
                throw new Error("Path not exist!")
            }
            dirPath = dirPath[dir]
        }
        if (!dirPath[file] || typeof dirPath[file] === "object") {
            throw new Error("File not exist!")
        }
        return dirPath[file]
    }

    return {
        MakeDir,
        MainDir,
        WriteFile,
        ReadFile
    }
}

const FS = ManageFileSystem()

FS.MakeDir('/a/b/c');
FS.WriteFile('/a/b/c/file.txt', 'Hello world')
console.log(FS.ReadFile('/a/b/c/file.txt'));

try {
    FS.MakeDir('/a/b/c/d')
} catch (error) {
    console.log(error.message)
}

try {
    FS.WriteFile('/a/b/c/d/file.txt', 'Data')
} catch (error) {
    console.log(error.message);

}
try {
    console.log(FS.ReadFile('/a/b/c/d/file.txt'))
} catch (error) {
    console.log(error.message);

}