!function(){
    jQuery.getJSON('/events/getAllEvents', data => {
        console.log(data);
    }); 
}();