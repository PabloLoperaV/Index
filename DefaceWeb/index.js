var Root = {
    header_text: Red.select("#header-text"),
    linksquad_logo: Red.select("#linksquad-logo"),
    defacer_info: Red.select("#defacer-info"),
    defacer_name: Red.select("#defacer-name"),
    phrase_container: Red.select("#phrase-container"),
    phrases: Red.select(".phrases"),
    footer: Red.select("#footer"),
    overlay: Red.select(".overlay"),
    scary_music: Red.select("#scary-music"),

    initialize: function (music) {

        if (music === "on") {
            Root.musicHandler();
        }
        Root.phrasesHandler();
        Root.waterHole();

        window.addEventListener("resize", Root.handleComponentsOnSize);
        window.addEventListener("load", Root.handleComponentsOnSize);
    },

    musicHandler: function () {
        Red.select("body").on('click', function () {
            Root.scary_music.play();
            setInterval(function () {
                Root.scary_music.play();
            }, Root.scary_music.elements()[0].duration + 1);
        });
    },

    phrasesHandler: function () {
        const phrases = [
            'Your database has been compromissed, if you don´t want it leaked, contact us.'
        ];

        var fx = new TextScramble(Root.phrases.elements()[0]);

        let counter = 0;
        const next = () => {
            fx.setText(phrases[counter]).then(() => {
                setTimeout(next, 4000)
            });
            counter = (counter + 1) % phrases.length
        };

        next();
    },

    handleComponentsOnSize: function () {

        if (window.innerWidth >= 1200) {

            Root.guardiran_logo.CSS({
                paddingTop: "13.475409836065573vh",
            });

            Root.header_text.CSS({
                fontSize: "22px",
            });

            Root.defacer_info.CSS({
                width: "40%",
            });

            Root.defacer_name.CSS({
                width: "30%",
            });

            Root.phrase_container.CSS({
                height: "",
            });

            Root.footer.CSS({
                paddingBottom: "",
            });

        } else if (window.innerWidth >= 992) {

            Root.guardiran_logo.CSS({
                paddingTop: "13.475409836065573vh",
            });

            Root.header_text.CSS({
                fontSize: "22px",
            });

            Root.defacer_info.CSS({
                width: "40%",
            });

            Root.defacer_name.CSS({
                width: "30%",
            });

            Root.phrase_container.CSS({
                height: "",
            });

            Root.footer.CSS({
                paddingBottom: "",
            });

        } else if (window.innerWidth >= 768) {

            Root.guardiran_logo.CSS({
                paddingTop: "13.475409836065573vh",
            });

            Root.header_text.CSS({
                fontSize: "22px",
            });

            Root.defacer_info.CSS({
                width: "40%",
            });

            Root.defacer_name.CSS({
                width: "30%",
            });

            Root.phrase_container.CSS({
                height: "",
            });

            Root.footer.CSS({
                paddingBottom: "",
            });

        } else if (window.innerWidth >= 576) {

            Root.guardiran_logo.CSS({
                paddingTop: "13.475409836065573vh",
            });

            Root.header_text.CSS({
                fontSize: "20px",
            });

            Root.defacer_info.CSS({
                width: "80%",
            });

            Root.defacer_name.CSS({
                width: "30%",
            });

            Root.phrase_container.CSS({
                height: "30px",
            });

            Root.footer.CSS({
                paddingBottom: "",
            });

        } else if (window.innerWidth < 576) {

            Root.guardiran_logo.CSS({
                paddingTop: "7.475409836065573vh",
            });

            Root.header_text.CSS({
                fontSize: "18px",
            });

            Root.defacer_info.CSS({
                width: "80%",
            });

            Root.defacer_name.CSS({
                width: "40%",
            });

            Root.phrase_container.CSS({
                height: "30px",
            });

            Root.footer.CSS({
                paddingBottom: "20px",
            });

        }

        var body = document.body,
            html = document.documentElement;

        var height = Math.max( body.scrollHeight, body.offsetHeight,
            html.clientHeight, html.scrollHeight, html.offsetHeight );

        Root.overlay.CSS({
            height: height + "px" ,
        });
    },

};

class TextScramble {
    constructor(el) {
        this.el = el;
        this.chars = '!@#$%^&*()_-=+{}:"|<>?,./;';
        this.update = this.update.bind(this)
    }

    setText(newText) {
        const oldText = this.el.innerText;
        const length = Math.max(oldText.length, newText.length);
        const promise = new Promise((resolve) => this.resolve = resolve);
        this.queue = [];
        for (let i = 0; i < length; i++) {
            const from = oldText[i] || '';
            const to = newText[i] || '';
            const start = Math.floor(Math.random() * 40);
            const end = start + Math.floor(Math.random() * 40);
            this.queue.push({from, to, start, end})
        }
        cancelAnimationFrame(this.frameRequest);
        this.frame = 0;
        this.update();
        return promise;
    }

    update() {
        let output = '';
        let complete = 0;
        for (let i = 0, n = this.queue.length; i < n; i++) {
            let {from, to, start, end, char} = this.queue[i];
            if (this.frame >= end) {
                complete++;
                output += to;
            } else if (this.frame >= start) {
                if (!char || Math.random() < 0.28) {
                    char = this.randomChar();
                    this.queue[i].char = char
                }
                output += `<span class="dud">${char}</span>`
            } else {
                output += from
            }
        }
        this.el.innerHTML = output;
        if (complete === this.queue.length) {
            this.resolve()
        } else {
            this.frameRequest = requestAnimationFrame(this.update);
            this.frame++
        }
    }

    randomChar() {
        return this.chars[Math.floor(Math.random() * this.chars.length)]
    }
}