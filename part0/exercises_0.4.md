## 0.4: new note - traditional web app

![new note traditional web](img/new-note_traditional-web-application.png)

```
title New Note - traditional web application

note over browser:
when the form is submitted the
data is send to the server
end note
browser->server: HTTP POST https://studies.cs.helsinki.fi/exampleapp/new_notes
note over server:
the new note is added to
the JSON data 
end note
server-->browser: HTTP status code 302 (redirect to /notes)
browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/notes
server-->browser: HTML-code
browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.css
server-->browser: main.css
browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.js
server-->browser: main.js

note over browser:
browser starts executing js-code
that requests JSON data from server 
end note

browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/data.json
server-->browser: [{ content: "HTML is easy", date: "2019-05-23" }, ...]

note over browser:
browser executes the event handler
that renders notes to display
end note
```
