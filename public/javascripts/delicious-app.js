import '../sass/style.scss';

import { $, $$ } from './modules/bling';

import autocomplete from './modules/autocomplete';
// 3 args that go in mimic IDs in _storeForm.pug
// note: below looks like jQuery, it is NOT
// reason is due to the bling file ex: below is actually document.querySelector
autocomplete($('#address'), $('#lat'), $('#lng'));
