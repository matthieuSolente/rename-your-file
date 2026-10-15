$(function () {
/***********************************************/
/* fonction de sanitize  */
/***********************************************/
function sanitizeText(value) {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}



$('#pdf').on('input', function () {
$('#resultPdf').text(
sanitizeText($(this).val())
);
});

//token block
$('.token').wrap('<div class="token-block"></div>');   
	$('.token-block').each(function(){     
    	$(this).append('<button type="button" class="copy" aria-hidden="false" aria-label="Copy to clipboard">Copier</button>');
	});    

/***********************************************/
/* COPY TO CLIPBOARD FUNCTION */
/***********************************************/


$(document).on('click', '.copy', function () {
    const tokenText = $(this).closest('.token-block').find('.token').text();

    if (!navigator.clipboard) {
        console.error('Clipboard API non disponible');
        return;
    }

    navigator.clipboard.writeText(tokenText)
        .then(() => {
            $(this).text("Copied !").delay(2000).queue(function () {
                $(this).text("Copy !").dequeue();
            });
        })
        .catch(err => {
            console.error("Error :", err);
        });
});

});
