document.querySelectorAll('a').forEach(function (element) {
    let href = element.getAttribute('href');

    // Check to see if the the href is external
    if (href.startsWith('http') && !(href.includes('://astrouxds') || href.includes('://www.astrouxds'))) {
    // open element in new tag and add appropriate rel tags
        element.target = '_blank';
        element.rel = 'noreferrer nofollow noopener';
    }
  });
