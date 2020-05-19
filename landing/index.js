const arrowRight = document.querySelector('.icon-right')
const arrowLeft = document.querySelector('.icon-left')
const wrap = document.querySelector('.flex-wrap')
const wrapMain = wrap.querySelectorAll('.article, .header')
const slider = document.querySelector('.home')
const dots = document.querySelectorAll('.dot-selected, .dot')
const galleryItem = document.querySelectorAll('.gallery__container-item')
const LIGHT_BROWN = "#c7b299"
const galleryContainer = document.querySelector('.gallery__container')
const loadMoreButton = document.querySelector(".button-big")
const activityItem = document.querySelectorAll('.activities__item')
const arrowTop = document.querySelector('.arrow-top')
const menu = document.querySelectorAll('.header__nav-menu-link')
const postContainer = document.querySelector('.post-container')

let swapDuration = true;
let firstclick;
let id = 0;

const galleryData = [
    {
        id: 0,
        src: "mobile.png",
        title: "Mobile technology, reponsive",
        text: "Mobile App, responsive",
        type: "Mobile"
    },
    {
        id: 1,
        src: "inspire.jpg",
        title: "Inspire yourself, modern design",
        text: "Graphic Design, Mock-Up",
        type: "Web Design"
    },
    {
        id: 2,
        src: "adventure.jpg",
        title: "Beatiful nature, adventure",
        text: "Photography, Nature",
        type: "Photography"
    },
    {
        id: 3,
        src: "book.jpg",
        title: "Journal, new ideas",
        text: "Web Design, Mock-Up",
        type: "Web Design"
    },
    {
        id: 4,
        src: "freedom.jpg",
        title: "Calm water, freedom",
        text: "Photography, Holiday",
        type: "Photography"
    },
    {
        id: 5,
        src: "mobile-manage.jpg",
        title: "Mobile manage home",
        text: "Mobile app, manage",
        type: "Mobile"
    },
    {
        id: 6,
        src: "draw.jpg",
        title: "Draw on your own",
        text: "Illustration art, artistic",
        type: "Illustration"
    },
    {
        id: 7,
        src: "bake.jpg",
        title: "Mobile comfy home image",
        text: "Mobile app, art",
        type: "Mobile"
    },
    {
        id: 8,
        src: "art.jpg",
        title: "Wall of the art works",
        text: "Illustration, beatiful , thoughtfull",
        type: "Illustration"
    },
    {
        id: 9,
        src: "webText.jpg",
        title: "Web design sample image",
        text: "Web Design, text",
        type: "Web Design"
    },
    {
        id: 10,
        src: "create.jpg",
        title: "Illustration create what you want",
        text: "Illustration art, imagination",
        type: "Illustration"
    },
    {
        id: 11,
        src: "nature.jpg",
        title: "Lake, natural photography",
        text: "Photography, Holiday",
        type: "Photography"
    },

]

const sliderData = [
    {
        id: 0,
        src: "img/hero-main.png"
    },
    {
        id: 1,
        src: "img/white-mountain.jpg"
    },
    {
        id: 2,
        src: "img/high-mountain.jpg"
    },
    {
        id: 3,
        src: "img/lake.jpg"
    },
    {
        id: 4,
        src: "img/night.jpg"
    }

]

const createDivBg = (src, id) => {
    const div = document.createElement('div')
    div.classList.add('slider-bg')
    div.dataset.id = id
    div.innerHTML = `<img src="${src}" >`
    document.querySelector('.arrow-right').after(div)
    div.style.zIndex = -3 - id + ""
    return div
}

const fadeOut = elem => {
    elem.classList.add("animated", "fadeOut");
}


const changeImage = (num, increment, isTargetArrow = true) => {

    swapDuration = false
    // Подкладываем нужный элемент с z-index - 2
    firstclick || !isTargetArrow ? document.querySelector(`[src="${sliderData.find(item => item.id === num).src}"]`).parentNode.style.zIndex = -2 : ''
    // Чтобы первое нажатие происходило с анимацией
    firstclick = true
    // Затемняем текущий элемент
    const currentElem = document.querySelector(`[src="${sliderData.find(item => item.id === id).src}"]`).parentNode
    fadeOut(currentElem);
    // Снимаем выделение точки после мены картинки
    dots[id].className = 'dot'
    // Меняем айди
    isTargetArrow ? id += increment : id = num
    if (id === 1) {
        arrowRight.classList.add("white")
        arrowLeft.classList.add("white")
    } else {
        arrowRight.classList.remove("white")
        arrowLeft.classList.remove("white")
    }
    // Меня класс точки после смены id
    dots[id].className = 'dot-selected'

    setTimeout(() => {
        // Возвращаем Opacity  элементу , который затемнили
        currentElem.classList.remove("animated", "fadeOut")
        currentElem.style.zIndex = -10
        // Ставим z -index -1 текущему элементу, чтобы под него можно было подкладывать нужный элемент
        document.querySelector(`[src="${sliderData.find(item => item.id === id).src}"]`).parentNode.style.zIndex = -1
        // Анаимация закончилась
        swapDuration = true
    }, 1000)
}

arrowRight.onclick = () => {
    if (!swapDuration) return
    else if (id >= 4) {
        changeImage(0, -4)
    }
    else changeImage(id + 1, 1)
}

arrowLeft.onclick = () => {
    if (!swapDuration) return
    else if (id <= 0) {
        changeImage(sliderData.length - 1, 4)
    }
    else changeImage(id - 1, -1)
}

dots.forEach(dot => dot.addEventListener('click', () => {
    if (id === +dot.dataset.number || !swapDuration) return
    changeImage(+dot.dataset.number, 0, isTargetArrow = false)
}))

menu[1].onclick = (e) => {
    e.preventDefault()
    document.querySelector(".activities").scrollIntoView()
}

activityItem.forEach(item => item.addEventListener('mouseover', () => {
    item.querySelectorAll('.activities__item-title, .activities__item-icon').forEach(item => item.style.color = LIGHT_BROWN)
    item.querySelector('.block').style.backgroundColor = LIGHT_BROWN

}))
activityItem.forEach(item => item.addEventListener('mouseout', () => {
    [...item.children].forEach(child => {
        child.style.color = "";
        child.style.backgroundColor = "";
    })
}))

const addListeners = (elem) => {
    elem.addEventListener('mouseover', () => {
        setGalleryOnHover(elem, "#362f2d", "#111111", "#fff", LIGHT_BROWN, "linear-gradient(to right, #211b19, #4e3427)", "inline")
    })
    elem.addEventListener('mouseout', () => {
        setGalleryOnHover(elem)
    })

}

const setGalleryOnHover = (item, backgroundColor = "", nextBgColor = "", colorTitle = "", colorParagraph = "", gradient = "", display = "") => {
    item.querySelector('.gallery__container-item-body').style.backgroundColor = backgroundColor
    item.querySelector('.gallery__container-item-title').style.color = colorTitle
    item.querySelector('.gallery__container-item-text').style.color = colorParagraph
    item.querySelector('.block1').style.backgroundImage = gradient
    item.querySelectorAll('span').forEach(span => span.style.display = display)
    item.querySelector('.block2').style.background = nextBgColor

}

const renderGallery = (data, isFadeIn = false, isDisplayGalleryButton = false) => {
    galleryContainer.innerHTML = ``;
    data.forEach((data, index) => galleryContainer.append(createGalleryItem(data, index)))
    isFadeIn ? fadeIn() : ''
    isDisplayGalleryButton ? loadMoreButton.textContent = "Load All images" : ''
}

const animateElem = (elem, func, animationType) => {
    elem.forEach((item, index) => {
        func(index) ? item.classList.add(animationType) : ''
    })
}
const fadeIn = () => {
    animateElem(document.querySelectorAll(".gallery__container-item"), index => true, "fadeIn")
    document.addEventListener('animationend', () => {
        refreshGalleryItemClasses()
    });
}

const refreshGalleryItemClasses = () => {
    document.querySelectorAll('.gallery__container-item').forEach(item => {
        item.className = "gallery__container-item"
    })
}

loadMoreButton.onclick = () => {
    if (loadMoreButton.textContent === "Load All images") {
        renderGallery(galleryData, true)
        loadMoreButton.textContent = "Hide images"
    }
    else if (document.querySelectorAll('.gallery__container-item').length <= 6) {
        renderGallery(galleryData);
        animateElem(document.querySelectorAll('.gallery__container-item'), index => index >= 6, 'fadeInDown')
        loadMoreButton.textContent = "Hide images"
        scrollTo(0, 3200)

    } else {
        animateElem(document.querySelectorAll('.gallery__container-item'), index => index >= 6, 'fadeOutUp')
        setTimeout(() => {
            setTimeout(() => document.querySelectorAll('.article-common')[1].scrollIntoView(), 900)
            setTimeout(() => {
                loadMoreButton.textContent = "Load More"
                renderGallery(galleryData.slice(0, 6))

            }, 1000)
        }, 0)
    }
}

const enlargeImg = (src, title, text) => {
    const modalWindow = document.querySelector('.modal-window')
    imgModal.open()
    modalWindow.classList.add("fadeInFast")
    imgModal.setContent(src, title, text)
}


const createGalleryItem = ({ src, title, text }, index) => {
    const container = document.createElement('div')
    container.className = "gallery__container-item"
    container.innerHTML = `
    <div class="gallery__container-item-img">
		<div class="block1"></div>
		   <div class="block2"></div>
			<img src="img/${src}" alt="" class="gallery__container-item-picture">
			    <div class="arrow-up"></div>
				<span class="icon-link"></span>
					<span class="icon-lupa"></span>
				</div>
				<div class="gallery__container-item-body">
				<h2 class="gallery__container-item-title">${title}</h2>
					<p class="gallery__container-item-text">${text}</p>
				</div>
    `
    index >= 6 ? container.classList.add('translateY') : ''
    addListeners(container)
    container.querySelector('.icon-lupa').onclick = enlargeImg.bind(null, src, title, text)
    return container
}


renderGallery(galleryData)
document.querySelector("#all").onclick = () => {
    renderGallery(galleryData, true)
    loadMoreButton.textContent = "Hide images"
}
document.querySelector("#web-Design").onclick = () => renderGallery(galleryData.filter(item => item.type === "Web Design"), true, "hidden")
document.querySelector('#mobile').onclick = () => renderGallery(galleryData.filter(item => item.type === "Mobile"), true, "hidden")
document.querySelector('#illustration').onclick = () => renderGallery(galleryData.filter(item => item.type === "Illustration"), true, "hidden")
document.querySelector('#photography').onclick = () => renderGallery(galleryData.filter(item => item.type === "Photography"), true, "hidden")


const createModal = () => {
    const modal = document.createElement('div')
    modal.classList.add('modal-overlay')
    modal.dataset.close = true;
    modal.innerHTML = `
    <div class="modal-window"> 
        <div class="modal-body">
        </div>
        <div class="modal-footer">
        </div>
    </div>
    `
    document.body.append(modal)
    return modal
}



const modalConfig = () => {
    const _modal = createModal()
    const modal = {
        open() {
            _modal.classList.toggle("open")
        },
        close() {
            _modal.classList.toggle('open')
            modal.querySelector('.modal-window').className = "modal-window"
        },
        setContent(src, title, text) {
            _modal.querySelector('.modal-body').innerHTML = `<img src="/img/${src}" alt="image-big">`
            _modal.querySelector('.modal-footer').innerHTML = `
            <h2 class="footer-title"> ${title} </h2>
            <p class="footer-text"> ${text} </p>
            `
        }
    }
    document.querySelector("[data-close]").onclick = (e) => {
        if (!e.target.dataset.close) return
        modal.close()
    }
    return modal
}

const imgModal = modalConfig()

const createPost = ({ src, alt, day, month, title, text }) => {
    const post = document.createElement('div')
    post.classList.add('post-item')
    post.innerHTML =
        `	<div class="post-item">
        <div class="post-item__img">
            <img src="img/${src}" alt="${alt}">
            <div class="block1 block1-small"></div>
            <div class="block2 block2-small"></div>
            <div class="post-item__img-data">
                <div class="post-item__img-day">${day}</div>
                <div class="post-item__img-month">${month}</div>
            </div>
        </div>
        <div class="post-item__body">
            <h2 class="post-item__title"> ${title}</h2>
            <p class="post-item__text"> ${text}
              </p>
            <div class="link">
                <p class="link__text">Read More</p>
                <div class="triangle-mini"></div>
            </div>
        </div>
    </div>
                    `
    postContainer.append(post)
    return post
}


const postData = [
    {
        src: "beatiful.jpg",
        alt: "nature",
        day: "1",
        month: "Oct.",
        title: "Art of Natural photography",
        text: "Beatiful views, join our group next Monday to see by yourserf"
    },
    {
        src: "water.jpg",
        alt: "sea",
        day: "15",
        month: "Aug.",
        title: "Vast ocean",
        text: "How big the ocean, how small we are. See the facts about it"
    },
    {
        src: "girl.jpg",
        alt: "pretty wowan",
        day: '29',
        month: "Sep.",
        title: "How cute are you ?",
        text: "See the man opinion - what they like in woman's personality"
    },
    {
        src: "crowd.jpg",
        alt: "people",
        day: "12",
        month: "Apr.",
        title: "The meeting of the Travelers",
        text: "Are you exciting at visit natural attractions ? Look what we got"
    },
    {
        src: "natural.jpg",
        alt: "nature image",
        day: "6",
        month: "Jan.",
        title: 'Scenic view, nature',
        text: "See top 10 beatiful places!"
    }
]
const arrowPostLeft = document.querySelector('.icon-arrow-circle-left')
const arrowPostRight = document.querySelector('.icon-arrow-circle-right')

let minValue = 0, maxValue = 3;

const renderPost = (minValue, maxValue, isLeftArrow = false, isRightArow = false) => {
    let firstElem = false
    let elem
    postContainer.innerHTML = ``;
    postData.forEach((data, index) => {
        if (minValue >= index || index > maxValue) return
        if (!firstElem && isLeftArrow) {
            elem = createPost(data)
            firstElem = true
        } else if (index === maxValue && isRightArow) {
            elem = createPost(data)
        }
        else createPost(data)
    })
    elem ? elem.classList.add('fadeIn', "animate") : ''
}

renderPost(0, 3)

arrowPostLeft.addEventListener('click', () => {
    if (minValue === -1) {
        maxValue = postData.length - 1
        minValue = maxValue - 3
        renderPost(minValue, maxValue, true)
    } else {
        minValue--;
        maxValue--
        renderPost(minValue, maxValue, true)
    }
})

arrowPostRight.addEventListener('click', () => {
    if (maxValue === 4) {
        minValue = -1
        maxValue = minValue + 3;
        renderPost(minValue, maxValue, false, true)
    } else {
        maxValue++
        minValue++
        renderPost(minValue, maxValue, false, true)
    }
})

document.addEventListener('DOMContentLoaded', () => {
    sliderData.forEach((data, index) => {
        if (data.id === 0) return
        else createDivBg(data.src, data.id)
    })
    renderGallery(galleryData.slice(0, 6))

})

window.addEventListener('scroll', function () {
    arrowTop.hidden = (pageYOffset < document.documentElement.clientHeight);
});
arrowTop.addEventListener('click', () => {
    scrollTo(0, 0)
})
