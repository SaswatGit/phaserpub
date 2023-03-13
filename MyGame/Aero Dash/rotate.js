screen.orientation.lock('landscape')
    .then(function() {
        console.log('Screen orientation locked to landscape mode');
    })
    .catch(function(error) {
        console.error('Error locking screen orientation:', error);
    });
