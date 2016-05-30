$(function(){    
    $('#form-contato').on('submit', function(){
        if(validate($('#form-contato'))){ //forms.validate
            var name = $("#user-name").val(),
                email = $("#user-email").val(),
                comments = $("#user-comments").val()
            
            $.ajax({
                url: 'ajax/register.php',
                type: 'POST',
                data: {
                    'name': name,
                    'email': email,
                    'comments': comments
                },
                success: function () {
                    $('.form-card-container').addClass('flipped')
                }
            })
        }
        return false;
    })
})