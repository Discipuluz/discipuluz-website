$(function(){
    var stringResult = '',
        results = new Array();

    /**
     * On questionario form submit
     */
    $('#questionario-desktop').on('submit', submitQuestions)
    $('#questionario-mobile').on('submit', submitQuestions)
            
    function submitQuestions() {
        disableButton($(this).find('button'))
            
        var pos = 0;
        results = [0,0,0,0,0,0,0,0];

        for (var i = 1; i <= 4; i++) {
            for(var j = i; j<=28; j+=4){
                if($('input[name=question'+j+']:checked').val() == 'A'){
                    results[pos]++;
                }else{
                    results[pos + 1]++;
                }
            }
            pos += 2;
        }
        var charsResult = ['E', 'I', 'S', 'N', 'T', 'F', 'J', 'P']
        for(var i = 0; i <= 3; i++){
            if(results[i*2] > results[i*2 + 1]){
                stringResult += charsResult[i*2]
            }else{
                stringResult += charsResult[i*2 + 1]
            }
        }
        showFormUser()

        return false
    }

    /**
     * Shows 2nd form (user) - with animation
     */
    function showFormUser(){        
        //novototh
        var body = $("html, body")
        body.scrollTop(500)
        $('#questionario-desktop').addClass('hidden')
        $('#questionario-mobile').addClass('hidden')
        $('#questionario-mobile').removeClass('visible-xs')
        
        $('#questionario-user').removeClass('hidden')
    }
    
    /**
     * Submits last form
     */
    $('#questionario-user').on('submit', function(){
    
        if(validateForm($('#questionario-user'))){ //forms.validate
            disableButton($(this).find('button'))
            var name = $("#user-name").val(),
                school = $("#user-school").val(),
                grade = $("input[name=user-grade]:checked").val(),
                email = $("#user-email").val()
            
            $.ajax({
                url: 'ajax/saveAnswer.php',
                type: 'POST',
                data: {
                    name: name,
                    school: school,
                    grade: grade,
                    email: email,
                    numbersResult: results,
                    stringResult: stringResult
                },
                success: function (idAnswer) {
                    window.location = "/jungResult.php?resultado=" + stringResult + "&id=" + idAnswer;
                },
                error: function(jqXHR, status){
                    console.log(status)
                }
            })
        }
            
        return false
    })

    /**
     * MISC
     */

    //
    $('#user-grade-other-text').on('input', function(){
        $('#user-grade-other').prop('checked', true);
    })
})
