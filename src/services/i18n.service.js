'use strict'

const gTrans = {
    title: {
        en: 'What Todo?',
        es: 'Mis Cosas Por Hacer',
        he: 'משימות'
    },
    subtitle: {
        en: 'MVC - Model-View-Controller',
        es: 'MVC - Modelo-Vista-Controlador',
        he: 'מודל - ויו - קונטרולר',
    },
    'filter-all': {
        en: 'All',
        es: 'Todos',
        he: 'הכל',
    },
    'filter-active': {
        en: 'Active',
        es: 'Activo',
        he: 'פעיל'
    },
    'filter-done': {
        en: 'Done',
        es: 'Completo',
        he: 'הושלם',
    },
    'stat-todo-label': {
        en: 'Todo',
        es: 'Hacer',
        he: 'לעשות',
    },
    'stat-active-label': {
        en: 'Active',
        es: 'Activo',
        he: 'פעיל',
    },
    add: {
        en: 'Add',
        es: 'Aggregar',
        he: 'הוסף',
    },
    sure: {
        en: 'Are you sure?',
        es: 'Estas Seguru?',
        he: 'בטוח נשמה?',
    },
    'add-todo-placeholder': {
        en: 'What needs to be done?',
        es: 'Que te tienes que hacer?',
        he: 'מה יש לעשות?'
    }
}

var gCurrLang = 'en'


function getTrans(transKey) {
    // If key is unknown return 'UNKNOWN'
    var key = gTrans[transKey]
    if (!key) return 'UNKNOWN'

    // Get from gTrans
    const translate = key[gCurrLang]

    // If translation not found - use english
    if (!translate) return key['en']

    return translate
}


function doTrans() {
    // TODO: 
    // var els = document.querySelectorAll('[data-trans]')
    const els = document.querySelectorAll('[data-trans]')

    // for each el:
    //    get the data-trans and use getTrans to replace the innerText 
    //    ITP: support placeholder    

    els.forEach(el => {
        const transKey = el.dataset.trans
        const txt = getTrans(transKey)
        console.log(el.dataset)

        if (el.nodeName === 'INPUT') el.placeholder = txt
        else el.innerText = txt
    })
}


function setLang(lang) {
    gCurrLang = lang
}


function formatNumOlder(num) {
    return num.toLocaleString('es')
}


function formatNum(num) {
    return new Intl.NumberFormat(gCurrLang).format(num)
}


function formatCurrency(num) {
    return new Intl.NumberFormat('he-IL', { style: 'currency', currency: 'ILS' }).format(num)
}


function formatDate(time) {
    const option = {
        year: 'numeric', month: 'short', day: 'numeric',
        hour: 'numeric', minute: 'numeric',
        hour12: true,
    }

    return new Intl.DateTimeFormat(gCurrLang, option).format(time)
}


function kmToMiles(km) {
    return km / 1.609
}