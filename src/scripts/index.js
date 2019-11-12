import { get } from 'axios';
import { accordionClasses } from "./const";
import "../styles/index.sass";

"use strict";

class Accordion {
    constructor(selector) {
        this.init(selector);
    }

    init(selector) {
        this.container = document.querySelector(selector);
        this.titles = this.container.querySelectorAll(
            `.${accordionClasses.TITLE}`
        );

        this.titles.forEach(element => {
            const content = element.nextElementSibling;
            const hasContentClass = content.className.match(
                accordionClasses.CONTENT
            );
            if (hasContentClass) {
                element.addEventListener("click", this.clickHandler);
                this.hideContent(content);
            }
        });
    }

    clickHandler = e => {
        const { target } = e;

        this.titles.forEach((title, i) => {
            if (title.contains(target)) {
                if (target.className.match(accordionClasses.TITLE)) {

                    e.preventDefault();
                    this.closeAllElements(i);
                    this.toggleElement(title);
                }
            }
        });
    };

    getAsyncData = async (element, url) => {
        try {
            element.getElementsByTagName("p")[0].innerHTML = 'Loading ...';
            element.classList.add(accordionClasses.LOADING);
            const response = await get(url);
            element.getElementsByTagName("p")[0].innerHTML = response.data;
            element.classList.remove(accordionClasses.LOADING);
        } catch (error) {
            element.textContent = 'Sorry, something went wrong!';
            element.classList.remove(accordionClasses.LOADING);
        }
    };

    toggleElement(title) {
        const content = title.nextElementSibling;
        const height = content.scrollHeight;

        title.classList.toggle(accordionClasses.ACTIVE);

        if (parseInt(content.style.height) > 0) {
            requestAnimationFrame(() => {
                content.style.height = 0;
            });
        } else {
            requestAnimationFrame(() => {
                content.style.height = height + "px";
            });
            if (title.id === "loading-one" && !content.classList.contains(accordionClasses.LOADING)) {
                this.getAsyncData(content, 'https://www.mocky.io/v2/5dcaae9a330000a1533def9e?mocky-delay=1000ms');
            }
        }
    }

    hideContent(element) {
        element.style.height = 0;
    }

    closeAllElements(selectedIndex) {
        this.titles.forEach((title, i) => {
            if (i != selectedIndex) {
                if (title.classList.contains(accordionClasses.ACTIVE)) {
                    title.classList.remove(accordionClasses.ACTIVE);
                }
                this.hideContent(title.nextElementSibling);
            }
        });
    }
}

new Accordion(`.${accordionClasses.CONTAINER}`);
