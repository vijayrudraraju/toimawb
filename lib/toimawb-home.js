TOIMAWB.LETTERS = [
    'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'
];

TOIMAWB.COLORS = [
    'rgb(155,0,0)', 'rgb(0,155,0)', 'rgb(0,0,155)',
    'rgb(155,155,0)', 'rgb(155,0,155)', 'rgb(0,155,155)'
]

TOIMAWB.HOMENOTES = [
    {
        'name': 'add text',
        'position': 0,
        'colors': ['rgb(0,0,85)', 'rgb(0,0,145)']
    },
    {
        'name': 'draw sketch',
        'position': 1,
        'colors': ['rgb(0,0,85)', 'rgb(0,0,145)']
    },
];

var frame = document.getElementById('app-frame');
frame.innerHTML = '';

TOIMAWB.PROCESSED_LETTERS = TOIMAWB.process(TOIMAWB.LETTERS);
console.log('TOIMAWB.PROCESSED_LETTERS', TOIMAWB.PROCESSED_LETTERS);
TOIMAWB.GENERATED_LETTERS = TOIMAWB.generate(TOIMAWB.PROCESSED_LETTERS);
TOIMAWB.draw(TOIMAWB.GENERATED_LETTERS);

TOIMAWB.ROUTER = new TOIMAWB.Router(TOIMAWB.HOME);

Backbone.history.start();

if (window.location.href.search(/#$/g) === -1) {
    if (window.location.href.search(/\/$/g) === -1) {
        window.location.href = window.location.href+'/#';
    } else {
        window.location.href = window.location.href+'#';
    }
}
