(async () => {

    const onReady = () => {
        /**
         * ===== Check and set a global guard variable. =====
         * If this content script is injected into the same page again,
         * it will do nothing next time.
         */
        console.log('content script onReady called by DOMContentLoaded');
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', onReady, {once: true});
    } else {
        onReady();
    }
})();
