let currentOrientation = screen.orientation.type;

screen.orientation.addEventListener('change', function(){
    let newOrientation = screen.orientation.type;
    
    if (newOrientation === 'landscape-primary') {
    } else if (newOrientation === 'portrait-primary') {
    }
});
