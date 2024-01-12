import buttonPush from './button_push_sfx.mp3';
import doorClose from './door_close_sfx.mp3';
import doorOpen from './door_open_sfx.mp3';
import ding from './microwave_ding_sfx.mp3';
import microwaveHumming from './microwave_humming_sfx.mp3';
import plateInsert from './plate_insert_sfx.mp3';

// Audio elements
const buttonPushSFX = new Audio(buttonPush);
const doorCloseSFX = new Audio(doorClose);
const doorOpenSFX = new Audio(doorOpen);
const dingSFX = new Audio(ding);
const microwaveHummingSFX = new Audio(microwaveHumming);
const plateInsertSFX = new Audio(plateInsert);

export { buttonPushSFX, doorCloseSFX, doorOpenSFX, dingSFX, microwaveHummingSFX, plateInsertSFX };