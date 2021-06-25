
$(document).ready(function(){
    $('.account-recovery-toggle').click(function(){
        $(this).parents('body').addClass('forgot-password');
    });

    // $('.js-address-delete').on('click', function() {
    //     var $el = $(this);
    //     var formId = $el.data('form-id');
    //     var confirmMessage = $el.data('confirm-message');
    //     if (confirm(confirmMessage || 'Are you sure you wish to delete this address?')) {
    //       Shopify.postLink('/account/addresses/' + formId, {parameters: {_method: 'delete'}});
    //       setTimeout(function () {
    //         window.location.href = '/account/addresses';
    //       }, 5000)
    //     }
    //   });
});
