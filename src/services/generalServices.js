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

module.exports = { debounce, nameShort }
