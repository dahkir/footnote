const paragraphs = () => {
    var html = document.body.innerHTML
    var paragraphs = html.match( /(.+\n)+/g )

    var newhtml = ''
    for (var paragraph of paragraphs){
        newhtml += `<p>\n${paragraph}</p>\n`
    }
    document.body.innerHTML = newhtml
}

const footnotes  = () => {
    /*
    const generateLists = (footnote, count, referenceList, notesList) => {
        referenceList.push(`<sup><a href="#fn${count}" id="ref${count}">${count}</a></sup>`)
        var noteBegining = footnote.search(/\(/) + 1
        notesList.push( footnote.slice(noteBegining).replace( /[\(\)]/g , "") )
        console.log(newText)
    }
    */

    var html = document.body.innerHTML
    var mdfootnotes = html.match( /\[\^\]\((.*\n?){1,4}?\)/g )
    if (mdfootnotes == null) return

    refs  = []
    notes = []
    var count = 1;
    for (var el of mdfootnotes){
        refs.push(`<sup><a href="#fn${count}" id="ref${count}">${count}</a></sup>`)
        var noteBegining = el.search(/\(/) + 1
        notes.push( el.slice(noteBegining).replace( /[\(\)]/g , "") )
        count++
    }
    
    for (var i = 0; i < refs.length; i++){
        html = html.replace(mdfootnotes[i], refs[i])
    }

    html += "<hr/>\n"
    html += "<ol>\n" 
    var count = 1
    for (var el of notes){
        html += `\t<li id="fn${count}">${el}&nbsp;<a href="#ref${count}" title="Jump back to footnote ${count} in the text.">↩</a></li>\n`
        count++
    }
    html += "</ol>\n"

    document.body.innerHTML = html
}
    
const headers    = () => {
    var html  = document.body.innerHTML
    var lines = html.split('\n')
    var newhtml = []
    for (var i = 0; i < lines.length; i++){
        if (lines[i].search(/^\s*\#/g) != -1){
            var match = lines[i].match(/#+/)
            var hsize = match[0].length
            lines[i] = lines[i].replace(match[0], "")
            lines[i] = `<h${hsize}>${lines[i]}</h${hsize}>`
        }
        lines[i] += "\n"
    }
    document.body.innerHTML = lines.join("")
}

$(document).ready(() => {
    headers()
    footnotes()
    paragraphs()
})
