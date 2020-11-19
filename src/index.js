'use strict';

import '@babel/polyfill';
import 'nodelist-foreach-polyfill';
import elementClosest from 'element-closest';
elementClosest(window);
import smoothscroll from 'smoothscroll-polyfill';
smoothscroll.polyfill();
import 'element-remove-polyfill';
import 'formdata-polyfill';
import 'es6-promise';
import 'fetch-polyfill';


import countTimer from './modules/countTimer';
import anch from './modules/anchors';
import toggleMenu from './modules/toggleMenu';
import togglePopUp from './modules/togglePopUp';
import tabs from './modules/tabs';
import slider from './modules/slider';
import changeImg from './modules/changeImg';
import calcValid from './modules/calcValid';
import calc from './modules/calc';
import sendForm from './modules/sendForm';


countTimer('25 dec 2020');
toggleMenu();
anch();
togglePopUp();
tabs();
slider();
changeImg();
calcValid();
calc();
sendForm();
