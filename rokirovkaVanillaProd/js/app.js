(function () {
    function init() {
        let router = new Router([
            new Route('home', 'home.html', true),            
            new Route('coaches', 'coaches.html'),
            new Route('gallery', 'gallery.html'),
			new Route('contacts', 'contacts.html')
        ]);
    }
    init();
}());