const container = document.getElementById('imageContainer');
        const cards = document.querySelectorAll('.card');
        const cardWidth = cards[0].offsetWidth;
        const totalCards = cards.length;
        let currentIndex = 0;

        function scrollImages(direction) {
            currentIndex = (currentIndex + direction + totalCards) % totalCards;
            const transformValue = -currentIndex * cardWidth;
            cards.forEach((card) => {
                card.style.transform = `translateX(${transformValue}px)`;
            });
        }