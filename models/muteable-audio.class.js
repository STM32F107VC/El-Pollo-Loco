class MuteableAudio extends DrawableObject {

    SOUNDS = [
        'audio/burn_endboss.mp3',
        'audio/chicken_noise.mp3',
        'audio/collect_bottle.mp3',
        'audio/collect_coin.mp3',
        'audio/dead_pepe.mp3',
        'audio/hurt_pepe.mp3',
        'audio/intro_music.mp3',
        'audio/jump_pepe.mp3',
        'audio/running_pepe.mp3',
        'audio/throw_salsabottle.mp3',
        'audio/win_game.mp3'
    ];

    /**
     * The cunstructor function is always called first when a new instance of this class is generated and configures the object
     * 
     */
    constructor() {
        super();
        this.loadSounds(this.SOUNDS);
    }
}