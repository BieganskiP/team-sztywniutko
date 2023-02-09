console.log('test');

import { mainHeaderDisplay } from './js/header';
import { libraryHeaderDisplay } from './js/header';
import { activateLibraryBtn } from './js/header';

const homeBtn = document.querySelector('[data-homepage]');
const libraryBtn = document.querySelector('[data-library]');
const header = document.querySelector('header');
const libraryDiv = document.querySelector('.header__library-container');
const headerSearchDiv = document.querySelector('.header__homepage-container');
const watchedBtn = document.querySelector('[data-watched]');
const queueBtn = document.querySelector('[data-queue]');
const libraryBtns = document.querySelectorAll('.library-container__btn');

libraryBtn.addEventListener('click', libraryHeaderDisplay);
queueBtn.addEventListener('click', activateLibraryBtn);
