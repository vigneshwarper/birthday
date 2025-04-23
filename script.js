document.addEventListener('DOMContentLoaded', function() {
    const bookCover = document.getElementById('bookCover');
    const openBookBtn = document.getElementById('openBook');
    const book = document.getElementById('book');
    const prevPageBtn = document.getElementById('prevPage');
    const nextPageBtn = document.getElementById('nextPage');
    
    let currentPageIndex = 0;
    const leftPages = document.querySelectorAll('.left-page');
    const rightPages = document.querySelectorAll('.right-page');
    const totalPages = leftPages.length;
    let isAnimating = false;
    
    // Initialize book
    function initializeBook() {
        // Hide all pages except first
        for (let i = 0; i < totalPages; i++) {
            leftPages[i].style.display = 'none';
            rightPages[i].style.display = 'none';
            rightPages[i].style.transform = 'rotateY(0deg)';
        }
        // Show first pages
        leftPages[0].style.display = 'flex';
        rightPages[0].style.display = 'flex';
    }
    
    // Open book animation
    openBookBtn.addEventListener('click', function() {
        // Animate cover opening
        bookCover.style.transformOrigin = 'left center';
        bookCover.style.transition = 'transform 1.5s ease';
        bookCover.style.transform = 'rotateY(-180deg)';
        
        // Show pages immediately underneath
        book.style.display = 'flex';
        initializeBook();
        updateButtons();
    });
    
    // Next page
    nextPageBtn.addEventListener('click', function() {
        if (isAnimating || currentPageIndex >= totalPages - 1) return;
        isAnimating = true;
        
        const currentRight = rightPages[currentPageIndex];
        const nextLeft = leftPages[currentPageIndex + 1];
        const nextRight = rightPages[currentPageIndex + 1];
        
        // Show next pages before animation
        nextLeft.style.display = 'flex';
        nextRight.style.display = 'flex';
        
        // Animate current right page turning
        currentRight.style.transformOrigin = 'left center';
        currentRight.style.transition = 'transform 1s ease';
        currentRight.style.transform = 'rotateY(-180deg)';
        
        setTimeout(() => {
            currentRight.style.display = 'none';
            currentPageIndex++;
            isAnimating = false;
            updateButtons();
        }, 1000);
    });
    
    // Previous page
    prevPageBtn.addEventListener('click', function() {
        if (isAnimating || currentPageIndex <= 0) return;
        isAnimating = true;
        
        const prevLeft = leftPages[currentPageIndex - 1];
        const prevRight = rightPages[currentPageIndex - 1];
        
        // Show previous pages
        prevLeft.style.display = 'flex';
        prevRight.style.display = 'flex';
        prevRight.style.transform = 'rotateY(-180deg)';
        
        // Animate previous right page back to flat
        setTimeout(() => {
            prevRight.style.transition = 'transform 1s ease';
            prevRight.style.transform = 'rotateY(0deg)';
            
            setTimeout(() => {
                // Hide current pages
                leftPages[currentPageIndex].style.display = 'none';
                rightPages[currentPageIndex].style.display = 'none';
                
                currentPageIndex--;
                isAnimating = false;
                updateButtons();
            }, 1000);
        }, 10);
    });
    
    // Update button states
    function updateButtons() {
        prevPageBtn.disabled = currentPageIndex === 0;
        nextPageBtn.disabled = currentPageIndex === totalPages - 1;
    }
    
    // Initialize
    initializeBook();
    updateButtons();
});