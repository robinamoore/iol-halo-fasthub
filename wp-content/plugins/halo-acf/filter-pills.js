/**
 * Filter pills for case study grid and news archive sections.
 * Data attribute: data-term on pill buttons, data-terms on cards.
 */
( function () {
    document.querySelectorAll( '.halo-filter-bar' ).forEach( function ( bar ) {
        var grid = bar.closest( '.halo-section' ).querySelector( '.halo-cards-grid, .halo-cs-grid' );
        if ( ! grid ) return;

        bar.addEventListener( 'click', function ( e ) {
            var pill = e.target.closest( '[data-term]' );
            if ( ! pill ) return;

            var term = pill.dataset.term;

            bar.querySelectorAll( '[data-term]' ).forEach( function ( p ) {
                p.classList.toggle( 'is-active', p === pill );
            } );

            grid.querySelectorAll( '[data-terms]' ).forEach( function ( card ) {
                var terms = card.dataset.terms ? card.dataset.terms.split( ',' ) : [];
                card.hidden = term !== 'all' && ! terms.includes( term );
            } );
        } );
    } );
} )();
