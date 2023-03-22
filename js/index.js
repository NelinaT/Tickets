!function(){
    jQuery.getJSON('/events/getAllEvents', data => {
        console.log(data);
        // var $tbody = $(".popularEventsBody");
        // for(var i=0; i < data.length; i++){
        //     var startDate= moment(data[i].start_date,"YYYY MM DD hh:mm:ss");
        //     var endDate= moment(data[i].end_date,"YYYY MM DD hh:mm:ss");

        //     $("<tr>").attr("data-id", data[i].id).appendTo($tbody).append(
        //         $("<td>").text(data[i].eventName),
        //         $("<td>").text(data[i].eventType),
        //         $("<td>").text(startDate.format("ddd Do MMMM YYYY")),
        //         $("<td>").text(startDate.format("HH:mm")),
        //         $("<td>").text(endDate.format("HH:mm")),
        //         $("<td>").text(data[i].place),
        //         $("<td>").text(data[i].city),
        //     )
        // }
    }); 

    $("body").on("click",".dropDown ul li:not(.selected)", e => {
        var $this = $(e.target);
        
        $this.closest('.dropDown').children('span').text($this.text());
        $this.addClass('selected').siblings().removeClass('selected');
    });
}();
