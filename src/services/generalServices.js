const debounceEvent = () => {
    let timer = null
    return (fn, wait) => {
        clearTimeout(timer)
        timer = setTimeout(() => fn(), wait)
    }
}

const debounce = debounceEvent()

const nameShort = (name) => {
    const nameArray = name.split(' ');
    return `${nameArray[0]} ${nameArray[1]}`
}

const hasWinnerService = ({ game }) => {

    for (let i = 0; i < 3; i++) {
        const line = []
        const column = []
        for (let j = 0; j < 3; j++) {
            line.push(game[i][j])
            column.push(game[j][i])
        }
        const resu_line = thisLineIsCompletedService(line)
        const resu_column = thisLineIsCompletedService(column)
        if (resu_line.status) return resu_line
        if (resu_column.status) return resu_column
    }

    const case_especific_1 = thisLineIsCompletedService([game[0][0], game[1][1], game[2][2]])
    const case_especific_2 = thisLineIsCompletedService([game[0][2], game[1][1], game[2][0]])
    if (case_especific_1.status) return case_especific_1
    if (case_especific_2.status) return case_especific_2

    return { status: false }
}

const isFinished = ({ game }) => {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (game[i][j] === 0) return false
        }
    }
    return true
}

const thisLineIsCompletedService = (line) => {
    let contX = 0;
    let contO = 0;
    line.forEach((item) => {
        if (item === 1) contO++
        else if (item === -1) contX++
    })

    if (contO === 3) return { status: true, type: 'O' }
    if (contX === 3) return { status: true, type: 'X' }
    return { status: false }
}

module.exports = { debounce, nameShort, hasWinnerService, isFinished }
