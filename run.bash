nodemon\
    --exec "nearleyc grammar.ne -o grammar.js && node index.js"\
    --watch "index.js"\
    --watch "grammar.ne"\
    --watch "parser"\
    --watch "interpreter"\
    --watch "constants"\
    --watch "program"
