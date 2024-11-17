const SMTPServer = require("smtp-server").SMTPServer;

const server = new SMTPServer({
    allowInsecureAuth: true,
    authOptional: true,
    onConnect(session, cbFunc) {
        //cbFunc(new Error('Cannot Access Connection')) //reject
        console.log(`onConnect`, session.id)
        cbFunc() //accept
    },
    onMailFrom(address, session, cbFunc) {
        console.log(`onMailFrom`, address.address, session.id)
        cbFunc()
    },

    onRcptTo(address, session, cbFunc) {
        console.log(`onRcptTo`, address.address, session.id)
        cbFunc()
    },
    onData(stream, session, cbFunc) {
        stream.on('data', (data) => console.log(`onData ${data.toString()}`))
        stream.on('end', cbFunc)
    }
});

server.listen(25, () => console.log('Server is Running on 25'));