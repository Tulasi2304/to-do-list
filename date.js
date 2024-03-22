function getDay(){
    const today = new Date();
    const options = {
        weekday: 'long',
        month: 'long',
        day: 'numeric'
    };
    return today.toLocaleDateString('en-IN', options);
}

module.exports = getDay;