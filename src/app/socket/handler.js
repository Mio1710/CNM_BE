var admin_handler = require('./admin_handler')

module.exports = function (io, socket) {

  socket.on('admin', function(){
    admin_handler(io, socket)
  })

}