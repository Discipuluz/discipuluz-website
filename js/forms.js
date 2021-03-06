$(function(){
    
    $('input, textarea').each(inputClass)
    $('input, textarea').on('input', inputClass)
    
    function inputClass(){
        //filled
        if($(this).val()){
            $(this).addClass('filled')
        }else{
            $(this).removeClass('filled')
        }
        
        //required
        if($(this).prop('required')){
            if($(this).val()){
                $(this).addClass('valid')
                $(this).removeClass('invalid')
            }else{
                $(this).addClass('invalid')
                $(this).removeClass('valid')
            }
        }
        
        //email
        if($(this).prop('type') === 'email'){
            if(/^[^@]+@.+\.[^.]+$/i.test($(this).val())){
                $(this).addClass('valid')
                $(this).removeClass('invalid')
            }else{
                $(this).addClass('invalid')
                $(this).removeClass('valid')
            }
        }
    }
    
    /**
     * Resize Text areas
     */
    $('textarea').on('input', resizeTextArea)
    $('textarea').each(resizeTextArea)
    
    function resizeTextArea(){
        $(this).css('height', 'auto')
        $(this).css('height', $(this).prop('scrollHeight') + 1 + 'px')
    }
    
    /**
     * Update ranges meters
     */
    $('.form-range').on('input', updateRangeMeters)
    $('.form-range').on('change', updateRangeMeters)
    $('.form-range').each(updateRangeMeters)
    
    function updateRangeMeters(){
        console.log($(this).val())
        $(this).parent().parent().find('.form-range-meter').text($(this).val())
    }
    
    /**
     * Validation
     */
    $('.form-card input, .form-card textarea').on('blur', function(){
        if(!validate($(this))){
            $(this).addClass('filled').addClass('invalid')
        }
    })
    
    /**
     * Mobile Option select
     */
    $('label').on('click', function(){
        $(this).parent().parent().find('.form-radio-label.form-radio-label-selected').removeClass('form-radio-label-selected')
        $(this).parent().find('.form-radio-label').addClass('form-radio-label-selected')
        $(this).parent().find('input[type=radio]').prop('checked', true)
    })
})

function validateForm($form){
    var result = true
    $form.find('input, textarea').each(function(){
        if(!validate($(this))){
            result = false
        }
    })
    return result
}

function validate($input){
    if($input.hasClass('invalid')){
        $input.parent().find('.form-text-error').removeClass('form-text-error-hidden')
        return false
    }else{
        $input.parent().find('.form-text-error').addClass('form-text-error-hidden')
        return true
    }
}

function disableButton($button){
    $button.each(function(){
        $(this).prop('disabled', true)
    })
}

function enableButton($button){
    $button.prop('disabled', false)
}