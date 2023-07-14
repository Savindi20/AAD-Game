$(document).ready(function () {
    $('#btnDashboard a').css('color', 'black');
    $('#btnContainer a').css('color', '#6c757d');

    $('#dashboard').attr('style', 'display : block !important');
    $('#container').attr('style', 'display : none !important');
});

$('#btnContainer').click(function () {
    $('#btnDashboard a').css('color', '#6c757d');
    $('#btnContainer a').css('color', 'black');

    $('#dashboard').attr('style', 'display : none !important');
    $('#container').attr('style', 'display : flex !important');
});