import {checkForDate } from './js/dateChecker';
import { handleSubmit, handleSave } from './js/formHandler';

import './styles/button.scss';
import './styles/home.scss';
import './styles/resets.scss';
import './styles/trip.scss';
import './styles/utilities.scss';

console.log(checkForDate);


export {
    checkForDate,
    handleSave,
    handleSubmit 
}