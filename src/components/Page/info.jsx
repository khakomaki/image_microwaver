import original from './../../images/example_landscape_image.jpg';
import normalPositive from './../../images/example_landscape_image_normal_positive.jpg';
import normalNegative from './../../images/example_landscape_image_normal_negative.jpg';
import defrostingPositive from './../../images/example_landscape_image_defrosting_positive.jpg';
import defrostingNegative from './../../images/example_landscape_image_defrosting_negative.jpg';
import grill from './../../images/example_landscape_image_grill.jpg';
import popcorn from './../../images/example_landscape_image_popcorn.jpg';

const info = [
    { 
        title: 'Normal', 
        text: `Scales image horizontally. Positive values make the image wider, negative values thinner.`,
        images: [
            { url: original, imageText: 'Original' },
            { url: normalNegative, imageText: 'Normal, -0:50' },
            { url: normalPositive, imageText: 'Normal, 1:40' }
        ]
    },
    
    {
        title: 'Defrosting',
        text: `Controls image saturation. Positive values increase saturation, negative values decrease.`,
        images: [
            { url: original, imageText: 'Original' },
            { url: defrostingNegative, imageText: 'Defrosting -1:40' },
            { url: defrostingPositive, imageText: 'Defrosting 3:20' }
        ]
    },
    {
        title: 'Grill',
        text: `Reduces jpg quality. Great for reducing file size. Be careful not to grill too much.`,
        images: [
            { url: original, imageText: 'Original' },
            { url: grill, imageText: 'Grill 1:35' }
        ]
    },
    {
        title: 'Popcorn',
        text: `Reduces resolution. Great for reducing file size.`,
        images: [
            { url: original, imageText: 'Original (720x480)' },
            { url: popcorn, imageText: 'Popcorn 1:40 (360x240)' }
        ]
    }
];

export default info;