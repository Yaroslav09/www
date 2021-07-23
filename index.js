// При скролі застосовується клас active і header зменшує свою висоту
const headerElement = document.querySelector('.header-element');
window.addEventListener('scroll', fixNav);

function fixNav() {
    if (window.scrollY > headerElement.offsetHeight + 100) {
        headerElement.classList.add('active');
    } else {
        headerElement.classList.remove('active');
    }
}

// Меню бургер та поведінка на мобільних пристроях
const isMobile = {
    Android: function () {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
        return (
            isMobile.Android() ||
            isMobile.BlackBerry() ||
            isMobile.iOS() ||
            isMobile.Opera() ||
            isMobile.Windows()
        );
    }
};

if (isMobile.any()) {
    document.body.classList.add('_touch');

    let navArrows = document.querySelectorAll('.nav-arrow');

    if (navArrows.length > 0) {
        for (let index = 0; index < navArrows.length; index++) {
            const navArrow = navArrows[index];
            navArrow.addEventListener("click", function (e) {
                navArrow.parentElement.classList.toggle('active-arrow');
            });
        }
    }

} else {
    document.body.classList.add('_pc');
}

const menuIcon = document.querySelector('.menu-icon');
const navNavlist = document.querySelector('.nav-nav-list');

if (menuIcon) {
    const navNavlist = document.querySelector('.nav-nav-list');
    menuIcon.addEventListener('click', function (e) {
        document.body.classList.toggle('_lock');
        menuIcon.classList.toggle('active-arrow');
        navNavlist.classList.toggle('active-arrow');
    })
}
if (menuIcon.classList.contains('active-arrow')) {
    document.body.classList.remove('_lock');
    menuIcon.classList.remove('active-arrow');
    navNavlist.classList.remove('active-arrow');
}

// ==================СЛАЙДЕР=================================



new Swiper('.swiper-container', {
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
    },
    autoplay: {
        delay: 4000,
    },
    keyboard: {
        enabled: true,
        onlyInViewport: true,
        pageUpDown: true,
    },
    slidesPerView: 2,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },

    loop: true,
    breakpoints: {
        // when window width is >= 1024px
        1024: {
            slidesPerView: 2,
        },
        // when window width is >= 320px
        320: {
            slidesPerView: 1,
        },
        // when window width is >= 240px
        240: {
            slidesPerView: 1,
        },
    }
});

new Swiper('.swiper-container-works', {
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

    keyboard: {
        enabled: true,
        onlyInViewport: true,
        pageUpDown: true,
    },

    slidesPerView: 4,
    slidesPerColumn: 2,

    loop: true,

    breakpoints: {
        // when window width is >= 1440px
        1440: {
            slidesPerView: 4,
            slidesPerColumn: 2,
            spaceBetween: 10
        },
        // when window width is >= 1280px
        1280: {
            slidesPerView: 3,
            slidesPerColumn: 2,
            spaceBetween: 10
        },
        // when window width is >= 1024px
        1024: {
            slidesPerView: 3,
            slidesPerColumn: 2,
            spaceBetween: 10
        },
        // when window width is >= 768px
        768: {
            slidesPerView: 2,
            slidesPerColumn: 2,
        },
        // when window width is >= 640px
        640: {
            slidesPerView: 2,
            slidesPerColumn: 2,
        },
        // when window width is >= 480px
        480: {
            slidesPerView: 1,
            slidesPerColumn: 2,
        },
        // when window width is >= 320px
        320: {
            slidesPerView: 1,
            slidesPerColumn: 2,
            spaceBetween: 5
        },
        // when window width is >= 240px
        240: {
            slidesPerView: 1,
            slidesPerColumn: 2,
            spaceBetween: 5
        },
    }
});


// ===========================================================================
// Система пошуку мій управитель
const search = document.getElementById('search');
const matchList = document.getElementById('match-list');

const searchStates = async searchText => {
    const res = await fetch('./manager.json');
    const states = await res.json();

    let matches = states.filter(state => {
        const regex = new RegExp(`^${searchText}`, 'gi');
        return state.street.match(regex);
    });
    if (searchText.length === 0) {
        matches = [];
    }

    outputHtml(matches);
}

const outputHtml = matches => {
    if (matches.length > 0) {
        const html = matches.map(match => `
      <div class = "card card-body mb-1">
        <h4>${match.full_street}</h4>
        <span class = "text-primary"> ${match.name}</span> 
        <span class = "phone-primary">
          <a href="tel:${match.phone_number}">${match.phone_number}</a>
        </span>
        <small>${match.county}</small>
      </div>
    `).join('');

        matchList.innerHTML = html;
    } else {
        matchList.innerHTML = '';
    }

}

search.addEventListener('input', () => searchStates(search.value))


