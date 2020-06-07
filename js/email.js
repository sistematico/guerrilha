$(function() {
    var form = $('#formcontato');
    var formMessages = $('#respostacontato');

    $(form).submit(function(event) {
        var dot = setInterval(dotsInterval, 500);

        $('#btnenviar').html('Enviando<span id="dots"></span>');
        
        event.preventDefault();
        var formData = $(form).serialize();
        $.ajax({
            type: 'POST',
            url: $(form).attr('action'),
            data: formData
        }).done(function(response) {
            $(formMessages).show();
            $(formMessages).html(response);

            if (response == 'E-mail enviado com sucesso') {
                $(formMessages).removeClass('alert-danger');
                $(formMessages).addClass('alert-primary');
                $('#name','#email','#subject','#message').empty();
                $('#btnenviar').html('Enviado!');
                $('#name,#email,#subject,#message,#btnenviar').prop( "disabled", true );
            } else {
                $('#btnenviar').html('Enviar<span id="dots"></span>');
            }
       
        }).fail(function(data) {
            $(formMessages).show();
            $(formMessages).removeClass('alert-primary');
            $(formMessages).addClass('alert-danger');
        
            if (data.responseText !== '') {
                if (data.responseText == 'E-mail enviado com sucesso') {
                    $(formMessages).text('E-mail enviado com sucesso');
                    $('#btnenviar').html(data.responseText);
                    $('#name,#email,#subject,#message').empty();
                    $('#name,#email,#subject,#message').prop( "disabled", true );
                } else {
                    $(formMessages).text('Erro no envio do e-mail');
                }
            } else {
                $(formMessages).text('Ocorreu um erro inesperado ao enviar o e-mail');
            }            
        }).always(function() {
            clearInterval(dot);
        });
    });


});

function dotsInterval() {
    if (dots < 3) {
        $('#dots').append('.');
        dots++;
    } else {
        $('#dots').html('');
        dots = 0;
    }
}