$(function(){
    var stringResult = '';

    /**
     * On questionario form submit
     */
    $('#questionario-desktop').on('submit', submitQuestions)
    $('#questionario-mobile').on('submit', submitQuestions)

    function submitQuestions() {
        var name = $("#user-name").val();
        var school = $("#user-school").val();
        var grade = $("#user-grade").val();
        var email = $("#email").val();
        var size = $("#questionario > fieldset").length;
        var results = new Array();
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

        $.ajax({
            url: 'ajax/saveAnswer.php',
            type: 'POST',
            data: {
                'name': name,
                'school': school,
                'grade': grade,
                'email': email,
                'numbersResult': results,
                'stringResult': stringResult
            },
            success: function (idAnswer) {
                showFormUser(stringResult, idAnswer)
            }
        })

        return false;
    }

    /**
     * Shows 2nd form (user) - with animation
     */
    function showFormUser(stringResult, idAnswer){
        var body = $("html, body")
        $('#questionario-desktop').addClass('invisible')
        $('#questionario-mobile').addClass('invisible')

        setTimeout(function(){
            $('#questionario-desktop').addClass('hidden')
            $('#questionario-mobile').addClass('hidden')

            $('#questionario-user').removeClass('hidden')
        }, 1000)

        window.location = "http://www.discipuluz.com/jungResult.php?resultado="+stringResult+"&id="+idAnswer;
    }

    /**
     * MISC
     */

    //
    $('#user-grade-other-text').on('input', function(){
        $('#user-grade-other').prop('checked', true);
    })
})
