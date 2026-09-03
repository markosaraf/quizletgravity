// MODULE: ./app/j/gravity/gravity.entry.tsx
// pos: 158974
(function(module, exports, require) {
        e,
        t,
        s) => {
        "use strict";
        s("./node_modules/core-js/modules/es.promise.js");
        var n = s("./app/j/core/default_store/DefaultStoreProvider.tsx"),
            o = s("./app/j/global/Quizlet.ts"),
            r = s("./app/j/dispatchers/AppDispatcher.ts");
        const i = (0, s("./app/j/utils/keyReflectDeep.ts").Z)("GravityConstants", {
                gameStates: {
                    INTRO: null,
                    OPTIONS: null,
                    DIRECTIONS: null,
                    LOADING: null,
                    FREE_FALL: null,
                    LEVEL_UP: null,
                    COPY_ANSWER: null,
                    GAME_OVER: null,
                    PAUSED: null,
                    ERROR_NO_AVAILABLE_TERMS: null
                },
                actions: {
                    MOVE_TO_OPTIONS: null,
                    MOVE_TO_DIRECTIONS: null,
                    START_GAME: null,
                    PAUSE_GAME: null,
                    RESUME_GAME: null,
                    RESTART_GAME: null,
                    ADVANCE_LEVEL: null,
                    GRADE_ANSWER: null,
                    CHANGE_SHOWING_SIDE: null,
                    CHANGE_DIFFICULTY_LEVEL: null,
                    MISS_TERM: null,
                    CHECK_COPIED_ANSWER: null,
                    UPDATE_MAIN_PROMPT_VALUE: null,
                    MARK_PLANET_LOADED: null,
                    UPDATE_ALTERNATE_ANSWER_OPTION: null,
                    RELOAD_PAGE: null,
                    CLOSE_HIGH_SCORE_MODAL: null
                },
                keyScopes: {
                    GAMEPLAY: null
                }
            }),
            a = i.actions,
            l = i.gameStates,
            d = i.keyScopes,
            c = 300,
            u = 2e3,
            p = 500,
            h = 17e3,
            m = 1e3,
            g = 100,
            f = 1e3,
            _ = 500,
            y = 400,
            v = 1500,
            b = 300,
            S = 3e3,
            E = 12e3,
            j = 2300,
            x = -10,
            T = 2,
            w = .2,
            C = 7,
            A = "gravityShowWhichSide",
            M = "word",
            I = "BEGINNER",
            O = "INTERMEDIATE",
            P = "EXPERT",
            L = {
                BEGINNER: 9.8,
                INTERMEDIATE: 9.8,
                EXPERT: 11
            },
            k = {
                BEGINNER: 17e3,
                INTERMEDIATE: 17e3,
                EXPERT: 3500
            },
            N = "esc",
            D = O;
        var R = s("./app/j/utils/Visitor.ts");
        const U = {
            displayGameOptions() {
                r.Z.viewAction(a.MOVE_TO_OPTIONS)
            },
            displayGameDirections() {
                r.Z.viewAction(a.MOVE_TO_DIRECTIONS)
            },
            startGame() {
                r.Z.viewAction(a.START_GAME)
            },
            pauseGame() {
                r.Z.viewAction(a.PAUSE_GAME)
            },
            resumeGame() {
                r.Z.viewAction(a.RESUME_GAME)
            },
            restartGame() {
                r.Z.viewAction(a.RESTART_GAME)
            },
            advanceLevel() {
                r.Z.viewAction(a.ADVANCE_LEVEL)
            },
            gradeAnswer() {
                r.Z.viewAction(a.GRADE_ANSWER)
            },
            missTerm(e, t) {
                r.Z.viewAction(a.MISS_TERM, {
                    liveTermId: e,
                    wasSkipped: t
                })
            },
            changeDifficultyLevel(e) {
                r.Z.viewAction(a.CHANGE_DIFFICULTY_LEVEL, e)
            },
            updateAlternateAnswerOption(e) {
                r.Z.viewAction(a.UPDATE_ALTERNATE_ANSWER_OPTION, e)
            },
            changeShowingSide(e) {
                r.Z.viewAction(a.CHANGE_SHOWING_SIDE, {
                    side: e
                }), R.Z.writeData({
                    [A]: e
                })
            },
            copyAnswer(e, t) {
                r.Z.viewAction(a.CHECK_COPIED_ANSWER, {
                    liveTermId: e,
                    answer: t
                })
            },
            updateMainTypingPromptValue(e) {
                r.Z.viewAction(a.UPDATE_MAIN_PROMPT_VALUE, e)
            },
            markPlanetLoaded(e) {
                r.Z.viewAction(a.MARK_PLANET_LOADED, e)
            },
            maybeShowAdModal() {
                r.Z.viewAction(a.CLOSE_HIGH_SCORE_MODAL)
            },
            reload() {
                r.Z.viewAction(a.RELOAD_PAGE)
            }
        };
        s("./node_modules/core-js/modules/es.array.iterator.js"), s("./node_modules/core-js/modules/web.dom-collections.iterator.js");
        var Z = s("./app/j/components/DeprecatedModeLayout.tsx"),
            B = s("./node_modules/@quizlet/legacy-css-transition-group/dist/index.js"),
            H = s("./node_modules/classnames/index.js"),
            F = s.n(H),
            G = s("./node_modules/react/index.js"),
            V = s("./node_modules/react/jsx-runtime.js");
        class W extends G.PureComponent {
            constructor() {
                super(...arguments), this.renderAlert = () => (0, V.jsx)("div", {
                    className: "GravityBannerAlert-alert",
                    children: this.props.message
                })
            }
            render() {
                const e = "GravityBannerAlert GravityBannerAlert--" + this.props.type;
                return (0, V.jsx)("div", {
                    className: e,
                    children: (0, V.jsx)(B.uH, {
                        transitionName: "GravityBannerAlert-animateBanner",
                        children: this.props.isShowing ? this.renderAlert() : null
                    })
                })
            }
        }
        W.defaultProps = {
            type: "info"
        };
        const z = W;
        var K = s("./app/j/components/TermText.tsx"),
            q = s("./app/j/components/TrackedCursorTextarea.tsx"),
            Q = s("./app/j/components/TSpan.tsx"),
            Y = (s("./node_modules/core-js/modules/es.array.sort.js"), s("./app/j/components/UIIcon.tsx"));
        class X extends G.PureComponent {
            constructor() {
                super(...arguments), this.handleClick = e => {
                    this.props.onClick(this.props.character, e)
                }
            }
            render() {
                return (0, V.jsx)("button", {
                    className: "UISpecialCharacterButton UISpecialCharacterButton--" + this.props.variant + " TermText lang-" + this.props.lang,
                    disabled: this.props.disabled,
                    lang: this.props.lang,
                    onClick: this.handleClick,
                    type: "button",
                    value: this.props.character,
                    children: this.props.character
                })
            }
        }
        X.defaultProps = {
            disabled: !1,
            variant: "default"
        };
        var $ = s("./app/j/components/UISwitch.tsx"),
            J = s("./app/j/i18n/$t.ts"),
            ee = s("./app/j/i18n/localeCompare.ts"),
            te = s("./node_modules/immer/dist/immer.esm.mjs"),
            se = s("./app/j/utils/shallow-equal.ts");

        function ne(e, t) {
            return (0, ee.Z)(e.character, t.character)
        }
        class oe extends G.Component {
            constructor() {
                super(...arguments), this.state = {
                    isUppercase: !1
                }, this.handleToggleUppercase = () => {
                    this.setState({
                        isUppercase: !this.state.isUppercase
                    })
                }
            }
            shouldComponentUpdate(e, t) {
                if (!(0, se.Z)(this.props, e, ["charactersByLang"])) return !0;
                if (!(0, se.Z)(this.state, t)) return !0;
                if (Object.keys(this.props.charactersByLang).length !== Object.keys(e.charactersByLang).length) return !0;
                let s = !1;
                return Object.keys(this.props.charactersByLang).forEach((t => {
                    if (s) return;
                    let n = this.props.charactersByLang[t],
                        o = e.charactersByLang[t];
                    if (!o) return void(s = !0);
                    n.length !== o.length && (s = !0);
                    const r = (0, te.ZP)((e => e.sort()));
                    n = r(n), o = r(o), n.forEach(((e, t) => {
                        s || e !== o[t] && (s = !0)
                    }))
                })), s
            }
            getCharactersByLangToRender() {
                const e = [],
                    t = [];
                return Object.keys(this.props.charactersByLang).forEach((s => {
                    this.props.charactersByLang[s].forEach((n => {
                        const o = this.state.isUppercase ? n.toUpperCase() : n; - 1 !== e.indexOf(o) || (e.push(o), t.push({
                            character: o,
                            lang: s
                        }))
                    }))
                })), t.sort(ne)
            }
            renderAccents() {
                return this.getCharactersByLangToRender().map(((e, t) => {
                    let {
                        character: s,
                        lang: n
                    } = e;
                    return (0, V.jsx)("span", {
                        className: "UISpecialCharacterButtonGroup-button",
                        children: (0, V.jsx)(X, {
                            character: s,
                            lang: n,
                            variant: this.props.variant,
                            onClick: this.props.onClickButton
                        })
                    }, t)
                }))
            }
            renderUppercaseToggle() {
                return this.props.showUppercaseButtonInline ? this.renderInlineUppercaseSwitch() : this.renderUppercaseIcon()
            }
            renderInlineUppercaseSwitch() {
                return (0, V.jsx)("div", {
                    className: "UISpecialCharacterButtonGroup-uppercaseSwitch",
                    children: (0, V.jsx)($.Z, {
                        "aria-label": (0, J.Z)("global.caps_lock"),
                        checked: this.state.isUppercase,
                        onChange: this.handleToggleUppercase,
                        children: (0, V.jsx)(Y.Z, {
                            alt: (0, J.Z)("global.caps_lock"),
                            className: "UISpecialCharacterButton-uppercaseIcon",
                            icon: "caps-lock"
                        })
                    })
                })
            }
            renderUppercaseIcon() {
                const e = F()("UISpecialCharacterButtonGroup-button", "UISpecialCharacterButtonGroup-uppercaseButton", "UISpecialCharacterButtonGroup-uppercaseButton--" + this.props.variant, {
                    "is-enabled": this.state.isUppercase
                });
                return (0, V.jsx)("span", {
                    className: e,
                    onClick: this.handleToggleUppercase,
                    children: (0, V.jsx)(Y.Z, {
                        className: "UISpecialCharacterButton-uppercaseIcon",
                        icon: "caps-lock"
                    })
                })
            }
            render() {
                return (0, V.jsxs)("div", {
                    className: "UISpecialCharacterButtonGroup",
                    children: [this.renderAccents(), this.props.allowToggleUppercase && this.hasDifferentUppercaseCharacters() ? this.renderUppercaseToggle() : null]
                })
            }
            hasDifferentUppercaseCharacters() {
                let e = !1;
                return Object.keys(this.props.charactersByLang).forEach((t => {
                    e || this.props.charactersByLang[t].forEach((t => {
                        e || t !== t.toUpperCase() && (e = !0)
                    }))
                })), e
            }
        }
        oe.defaultProps = {
            allowToggleUppercase: !1,
            showUppercaseButtonInline: !1,
            variant: "default"
        };
        var re = s("./app/j/constants/TermConstants.ts");

        function ie(e, t, s) {
            const [n, o] = [e.getSelectionStart(), e.getSelectionEnd()];
            if (-1 === o) return null;
            return ["" + t.slice(0, n) + s + t.slice(o), e.setCaretPosition.bind(e, n + s.length)]
        }
        class ae extends G.PureComponent {
            constructor() {
                var e;
                super(...arguments), e = this, this.state = {
                    inputValue: this.props.previouslyTypedText
                }, this.getInputBox = () => this.GravityGameCopyInput, this.onInputChange = e => {
                    const t = e.currentTarget.value;
                    this.setState({
                        inputValue: t
                    }), this.submitCopiedAnswer(t)
                }, this.onKeyPress = e => {
                    "Enter" === e.key && e.preventDefault()
                }, this.onAccentClick = (e, t) => {
                    t.preventDefault();
                    const s = ie(this.GravityGameCopyInput, this.state.inputValue, e);
                    if (null !== s) {
                        const [e, t] = s;
                        this.setState({
                            inputValue: e
                        }, t), U.copyAnswer(this.props.termBeingCopied, e)
                    }
                }, this.renderAccentBar = () => {
                    const e = this.props.showingSide === re.E.DEFINITION_SIDE ? this.props.wordAccents : this.props.defAccents,
                        t = this.props.showingSide === re.E.DEFINITION_SIDE ? this.props.wordLang : this.props.defLang;
                    if (0 === e.length) return null;
                    const s = {
                        [t]: e
                    };
                    return (0, V.jsx)(oe, {
                        charactersByLang: s,
                        onClickButton: this.onAccentClick
                    })
                }, this.renderTypingPrompt = () => (0, V.jsxs)("div", {
                    className: "GravityCopyTermView-inputWrapper",
                    children: [(0, V.jsx)(q.Z, {
                        autoCapitalize: "none",
                        autoComplete: "off",
                        autoCorrect: "off",
                        className: "GravityCopyTermView-input",
                        onChange: this.onInputChange,
                        onKeyDown: this.onKeyPress,
                        placeholder: (0, J.Z)("gravity.copy_answer_modal.placeholder"),
                        ref: e => {
                            this.GravityGameCopyInput = e
                        },
                        spellCheck: !1,
                        value: this.state.inputValue
                    }), this.renderAccentBar()]
                }), this.renderDefinitionImage = () => (0, V.jsx)("img", {
                    alt: this.props.term.definition,
                    className: "GravityCopyTermView-definitionImage",
                    src: this.props.term._imageUrl
                }), this.renderDefinition = () => (0, V.jsxs)("div", {
                    className: "GravityCopyTermView-definition",
                    children: [(0, V.jsx)("div", {
                        className: "GravityCopyTermView-definitionText",
                        children: (0, V.jsx)(K.Z, {
                            lang: this.props.defLang,
                            side: re.E.DEFINITION_SIDE,
                            term: this.props.term
                        })
                    }), this.props.term._imageUrl ? this.renderDefinitionImage() : null]
                }), this.renderWord = () => (0, V.jsx)("div", {
                    className: "GravityCopyTermView-word",
                    children: (0, V.jsx)(K.Z, {
                        lang: this.props.wordLang,
                        side: re.E.WORD_SIDE,
                        term: this.props.term
                    })
                }), this.submitCopiedAnswer = function(t, s) {
                    void 0 === s && (s = y), clearTimeout(e.submitCopyAnswerTimeout), e.submitCopyAnswerTimeout = window.setTimeout((() => {
                        U.copyAnswer(e.props.termBeingCopied, t)
                    }), s)
                }
            }
            componentDidMount() {
                window.setTimeout((() => {
                    const e = this.getInputBox();
                    e && e.focus(q.Z.FOCUS_END)
                }), _), this.submitCopiedAnswer(this.state.inputValue, v)
            }
            componentWillUnmount() {
                clearTimeout(this.submitCopyAnswerTimeout)
            }
            render() {
                const e = this.props.showingSide === re.E.DEFINITION_SIDE ? this.renderDefinition() : this.renderWord(),
                    t = this.props.showingSide === re.E.DEFINITION_SIDE ? this.renderWord() : this.renderDefinition();
                return (0, V.jsx)("div", {
                    className: "GravityCopyTermView",
                    children: (0, V.jsxs)("div", {
                        className: "GravityCopyTermView-inner",
                        children: [(0, V.jsx)("div", {
                            className: "GravityCopyTermView-heading",
                            children: (0, V.jsx)(Q.Z, {
                                id: "gravity.copy_answer_modal.prompt"
                            })
                        }), (0, V.jsx)("div", {
                            className: "GravityCopyTermView-prompt",
                            children: e
                        }), (0, V.jsx)("div", {
                            className: "GravityCopyTermView-heading",
                            children: (0, V.jsx)(Q.Z, {
                                id: "gravity.copy_answer_modal.correct_answer"
                            })
                        }), (0, V.jsx)("div", {
                            className: "GravityCopyTermView-answer",
                            children: t
                        }), this.renderTypingPrompt()]
                    })
                })
            }
        }
        const le = (0, V.jsx)("svg", {
                height: "285",
                viewBox: "632 187 268 285",
                width: "268",
                xmlns: "http://www.w3.org/2000/svg",
                children: (0, V.jsx)("path", {
                    d: "M651.75900036 257.59080932c-.31748742.2824402-.66680603.5288071-.96307246.8352982-.98624482 1.00292312-1.88760648 2.10204672-2.6616398 3.3454698-.3638333.61769194-.58856296 1.2112605-.8687003 1.7783896-.41372268.83986303-.79325892 1.6821176-1.07180383 2.55399915-.18818676.56227543-.32018084 1.13976373-.45217392 1.7172521-.25259092 1.15577254-.40183517 2.3074893-.44851787 3.46637788-.00744835.2702718.0506347 115.3838664.0506347 115.3838664.14906282 1.96238838.30436166 3.1805328.5865837 4.38498662.10612734.44745906.21225463.8949191.3533546 1.3335412.35452283 1.15309415.836753 2.281269 1.43529533 3.38372874.1619179.30468205.2652857.6278348.4507801.92288197.92197416 1.5538307 1.8517766 2.66817193 2.86763146 3.69826564.22439186.2300682.497507.41841156.7454763.638846.93646568.855297 1.92558046 1.6127272 3.0015317 2.27468328.1972716.12662542 101.34464133 57.81523782 101.34464133 57.81523782 6.1900409 3.5131182 13.8035155 3.5377674 19.99347296.01026616l100.6275807-57.20904115c5.7722649-3.28591646 9.4707369-9.1765484 9.92533733-15.6776374.03140596-.44912626.0522008-.91027602.05020535-1.37302044l-.15196385-114.5898566c-.00008336-7.0406204-3.82788947-13.54780483-10.005749-17.07135472l-100.7681493-57.3800196c-6.2014361-3.51391504-13.8149117-3.5385643-20.00486816-.011063L655.16730574 255.030948c-1.54856106 1.02001756-2.50378207 1.74303494-3.40830537 2.55986133z",
                    fill: "#FFF",
                    fillRule: "evenodd"
                })
            }),
            de = (0, V.jsx)("svg", {
                height: "105",
                viewBox: "40 0 48 105",
                width: "48",
                xmlns: "http://www.w3.org/2000/svg",
                children: (0, V.jsxs)("g", {
                    fill: "#4257B2",
                    fillRule: "evenodd",
                    children: [(0, V.jsx)("path", {
                        d: "M82.865535 34.59280792l.12913983 37.94223145c.01660096 4.84522655-1.85376577 9.39417204-5.26825714 12.8086634-3.4144913 3.4144913-7.9634368 5.28485803-12.8086634 5.26825705-4.8452265-.01660098-9.4070957-1.91818375-12.8450653-5.35615333-3.4379697-3.4379697-5.3404153-8.0007017-5.3570163-12.8459283l-.1642006-47.9242267c-.003168-1.1756138-.9593101-2.131756-2.1357869-2.1357869-1.1756138-.003168-2.1243693.9455875-2.1212014 2.1212013l.1650636 47.9250896c.0204963 5.9821433 2.3686404 11.614507 6.6134628 15.8593294s9.8771861 6.5929665 15.8593294 6.6134628c5.9821433.0204963 11.5994054-2.2899637 15.8143824-6.5049406 4.215834-4.2158341 6.526294-9.8330962 6.5049406-15.8143825l-.1291398-37.9422315c-.004025-1.1747567-.9610301-2.1317618-2.13578688-2.1357868-1.1764767-.0040309-2.1252322.9447246-2.1212013 2.1212013"
                    }), (0, V.jsx)("path", {
                        d: "M71.042433 7.3863255c-1.17647667-.00403096-2.12523218.94472454-2.12120128 2.12120127l.11908868 34.7576633c.00488787 1.17561967.96103002 2.13176183 2.13578682 2.13578682.58823832.0020154 1.11890357-.2335229 1.5037195-.6183388.38395884-.3839589.61949717-.9146242.61748177-1.5028625l-.1190887-34.7576633c-.003168-1.1756139-.9601731-2.1326189-2.1357869-2.1357869M55.0116274 51.4762787c.003168 1.17561382.9601731 2.13261892 2.13578685 2.13578683.58737543.00115252 1.1180406-.2343858 1.50199952-.61834473.3848159-.38481592.6203542-.9154811.6192017-1.50285653l-.066872-19.26652936c-.0040251-1.1747567-.96016718-2.1308988-2.1349239-2.1349238-1.17647678-.0040309-2.12523228.9447246-2.12120135 2.1212014l.06600913 19.2656664zm19.5857683 20.9784762l-6.48365434 7.4691366-9.7476725-1.9245106-2.49446384-7.1739626 8.1505351 1.38154615c.0189318.00350485.03783998.00012968.05762872.00277745.12648152.01849303.25463593.02323213.38533783.01851997.0318111-.00247098.06450865.002801.09717684-.00052708.1487354-.0123902.2982807-.0393974.4468982-.0861875.0051541-.0017023.0094453-.0042676.0145993-.0059699.1039449-.0331834.1983678-.0844591.2953795-.133146.0549456-.0273314.1159377-.0469021.1682885-.0785423.0257469-.0153916.0454473-.0385438.0703313-.0547983.1115404-.0752968.221349-.1540393.3156246-.248315.1456987-.1456987.2629438-.3129946.3603706-.4915382.0290514-.0549397.0443192-.1168064.0690617-.1743409.0580202-.1339592.1074345-.269668.1370364-.4149045.0050717-.0257822.0204749-.0480891.0246836-.0747343.0185369-.1117348.0198738-.2235286.0203538-.3344654-.0000884-.0257999.0058462-.0507193.0048948-.0773822-.0057787-.1806171-.0390539-.35444856-.0886483-.5223161-.0052248-.01893756-.0035637-.03613164-.0087826-.05334926l-2.5046408-7.88520715 7.4447866 1.4694268 3.2648752 9.39279zM61.284772 67.42981482l-4.5012081-.7627515 3.1171881-3.59180736 1.38402 4.35455886zm-.18203914-10.71176816c-.1256304-.02107022-.25379656-.02924926-.3845044-.02625706-.0455769.00070378-.0911715-.00375233-.13673663.00039145-.15045544.01238434-.3008637.03852862-.45120124.0853128-.002577.0008512-.0051482.0034224-.0085882.00341058-.0644262.0212789-.124514.05375256-.1872025.08019743-.0927442.03924167-.1828996.08107213-.2670026.13238326-.0549279.03249127-.1063981.07015433-.1578683.10781745-.1020775.07618913-.1955314.15928775-.2812188.25015288-.0197064.02143213-.0437391.03510955-.0643025.05739883l-8.0880741 9.31863246c-.0188492.0205751-.0273609.04634554-.0453471.0677836-.0813491.10205984-.1549318.2118861-.217308.3294907-.0230695.0437803-.0461392.0875606-.065763.13307268-.0529133.11849703-.0937629.2439152-.123412.37539175-.0084762.03609045-.0229813.06958023-.02887456.1065395-.00254178.01117115-.0076663.0214734-.00848805.03265044-.02697776.1581454-.03074445.3137901-.0216141.4686192.00183795.0344059.0105558.0688352.01497656.1041099.01508257.1350697.0413303.2658778.08133226.3950129.00696243.0241036.0061938.0507605.01487623.0748699l4.07349756 11.7201069c.2509997.7189496.8634248 1.2542401 1.61211778 1.4012833l12.1615716 2.4014743c.6979206.1374094 1.41267844-.0820184 1.908911-.578251.0342821-.0342821.06855823-.0702841.1011084-.108012l8.0880741-9.3186325c.4976933-.5719064.6489014-1.3685967.3996216-2.0875403l-4.0726343-11.719244c-.25186266-.7198125-.8642878-1.2551031-1.6129808-1.4021462l-12.1615716-2.4014744c-.0232347-.00437952-.04730278-.00102203-.0713945-.0045445z"
                    })]
                })
            });
        class ce extends G.PureComponent {
            render() {
                const e = F()({
                    GravityLevelUpBadge: !0,
                    "is-levelingUp": this.props.gameState === l.LEVEL_UP
                });
                return (0, V.jsxs)("div", {
                    className: e,
                    children: [(0, V.jsx)("div", {
                        className: "GravityLevelUpBadge-background",
                        children: le
                    }), (0, V.jsx)("div", {
                        className: "GravityLevelUpBadge-icon",
                        children: de
                    }), (0, V.jsx)("div", {
                        className: "GravityLevelUpBadge-text",
                        children: (0, V.jsx)(Q.Z, {
                            id: "gravity.level_up"
                        })
                    })]
                })
            }
        }
        const ue = ce;
        class pe extends G.Component {
            constructor(e) {
                super(e), this.handleOnError = e => {
                    const {
                        onError: t
                    } = this.props;
                    this.setState({
                        status: "failed"
                    }), t && t(e)
                }, this.handleOnLoad = () => {
                    const {
                        onLoad: e
                    } = this.props, {
                        imageObj: t
                    } = this.state;
                    this.setState({
                        status: "loaded"
                    }), e && e(t)
                }, this.renderContent = () => {
                    const {
                        children: e,
                        preloader: t
                    } = this.props, {
                        status: s
                    } = this.state;
                    if ("loaded" === s) {
                        const e = this.renderImg();
                        if (e) return e
                    } else if ("failed" !== s && t) return t;
                    return e
                }, this.loadImage = e => {
                    const {
                        src: t
                    } = e, {
                        imageObj: s
                    } = this.state;
                    if (this.state.src !== t) {
                        s && (s.onload = null, s.onerror = null);
                        const e = new Image;
                        e.src = t, this.setState({
                            imageObj: e,
                            status: t ? "loading" : "pending",
                            src: t
                        }, (() => {
                            e.onload = this.handleOnLoad, e.onerror = this.handleOnError
                        }))
                    }
                }, this.state = {
                    status: "pending"
                }
            }
            componentDidMount() {
                this.loadImage(this.props)
            }
            componentDidUpdate() {
                this.loadImage(this.props)
            }
            renderImg() {
                const {
                    src: e
                } = this.state, {
                    alt: t,
                    imgProps: s
                } = this.props;
                return e ? (0, V.jsx)("img", {
                    ...s,
                    alt: t || "loaded image",
                    "data-testid": "ImageLoader-testImage",
                    src: e
                }) : null
            }
            render() {
                const {
                    className: e,
                    style: t
                } = this.props, {
                    status: s
                } = this.state, n = F()("imageloader", s, e);
                return (0, V.jsx)("div", {
                    className: n,
                    style: t,
                    children: this.renderContent()
                })
            }
        }
        var he = s("./node_modules/velocity-react/velocity-component.js"),
            me = s.n(he);
        const ge = 10,
            fe = "all 500ms ease-in";

        function _e(e) {
            return (e - 1) % ge + 1
        }

        function ye(e) {
            return 2 * e.windowWidth
        }

        function ve(e) {
            const {
                INTRO: t,
                OPTIONS: s,
                DIRECTIONS: n,
                LOADING: o,
                GAME_OVER: r
            } = l;
            return [t, s, n, o, r].indexOf(e.gameState) > -1
        }

        function be(e) {
            const {
                currentLevel: t,
                planetLevel: s
            } = e;
            return s === _e(t) || s === _e(t + 1) || s === _e(t + 2)
        }
        class Se extends G.PureComponent {
            constructor() {
                super(...arguments), this.getAnimation = () => {
                    const {
                        currentLevel: e,
                        planetLevel: t,
                        windowHeight: s,
                        windowWidth: n
                    } = this.props;
                    let o = 0,
                        r = 9999,
                        i = 1;
                    t === _e(e) ? (o = -.5 * n, r = s - 300) : t === _e(e + 1) ? (o = .7 * n, r = .1 * s, i = .05) : t === _e(e + 2) ? (o = .9 * n, r = .08 * s, i = .02) : t === _e(e + 3) && (o = 9999, r = -1200);
                    return {
                        translateX: o,
                        translateY: r,
                        scaleX: i,
                        scaleY: i
                    }
                }, this.getStyles = () => ({
                    height: ye(this.props),
                    width: ye(this.props),
                    WebkitTransition: fe,
                    MozTransition: fe
                }), this.getClasses = () => {
                    const {
                        planetLevel: e,
                        currentLevel: t
                    } = this.props, s = (1 === t || 2 === t) && 1 === e;
                    return F()("GravityPlanet", {
                        "is-hidden": ve(this.props) || !be(this.props),
                        "GravityPlanet--level1Placeholder": s,
                        ["GravityPlanet--level" + this.props.planetLevel]: !s
                    })
                }, this.renderImageLoader = e => (0, V.jsx)(pe, {
                    className: "GravityPlanet--preload",
                    onLoad: U.markPlanetLoaded.bind(null, this.props.planetLevel),
                    src: e
                })
            }
            render() {
                return 1 === this.props.currentLevel && ve(this.props) && this.props.planetLevel > 3 ? null : (0, V.jsx)(me(), {
                    animation: this.getAnimation(),
                    duration: 500,
                    children: (0, V.jsx)("div", {
                        className: this.getClasses(),
                        style: this.getStyles(),
                        children: this.props.src ? this.renderImageLoader(this.props.src) : null
                    }, "planet" + this.props.planetLevel)
                })
            }
        }
        const Ee = Se;
        var je = s("./node_modules/nullthrows/nullthrows.js"),
            xe = s.n(je),
            Te = s("./node_modules/polished/dist/polished.cjs.js"),
            we = s("./app/j/utils/FontSize.ts"),
            Ce = s("./app/j/utils/ImageSizeHelper.ts");
        const Ae = 1.5;

        function Me(e) {
            const t = (0, we.CI)(e);
            return 1 === t ? 1 : 1 / (t ** 2 * Ae ** 2)
        }
        class Ie extends G.Component {
            constructor(e) {
                super(e), this.handleAnimationEnd = () => {
                    U.missTerm(this.props.liveTermId, !1)
                }, this.state = {
                    xPosition: this.getInitialXPosition()
                }
            }
            getContentStyles() {
                const e = this.getTextLength() / this.getMaxTextLength(),
                    t = Math.max(55 * e, 25),
                    s = "0 " + Math.max(60 * e, 30) + "px 0 " + t + "px";
                return {
                    padding: this.shouldShowTermImage() ? "0 75px 0 60px" : s,
                    width: (0, Te.hO)(this.getTermSize()),
                    maxWidth: (0, Te.hO)(this.getTermSize())
                }
            }
            getInitialXPosition() {
                return Math.random() * (this.props.windowWidth - this.getTermSize())
            }
            getMaxTextLength() {
                return (this.shouldShowTermImage() ? 140 : 190) * Me(this.props.promptLang)
            }
            getTermSize() {
                if (this.shouldShowTermImage()) return 364;
                const e = this.getTextLength() / this.getMaxTextLength(),
                    t = Math.min(364, Math.sqrt(132496 * e) + 20);
                return Math.max(180, t)
            }
            getTermStyles() {
                const e = this.props.gameState === l.FREE_FALL;
                return {
                    animationDuration: this.props.termLife + "ms",
                    animationPlayState: e ? "running" : "paused",
                    height: (0, Te.hO)(this.getTermSize()),
                    width: (0, Te.hO)(this.getTermSize()),
                    top: 0,
                    left: this.state.xPosition + "px",
                    zIndex: this.getZIndex()
                }
            }
            getTextLength() {
                return Math.min(this.props.term[this.props.showingSide].length, this.getMaxTextLength())
            }
            getZIndex() {
                return 300 - parseInt(this.props.liveTermId.split("-")[3], 10)
            }
            renderImage(e) {
                const t = this.getTextLength() > 0 ? (0, Ce.yS)(e) : e;
                return (0, V.jsx)("div", {
                    className: "dvzmxm1",
                    children: (0, V.jsx)("img", {
                        alt: this.props.term.definition,
                        className: "i13a2vzw",
                        "data-testid": "GravityTerm-image",
                        src: t
                    })
                })
            }
            renderText() {
                return (0, V.jsx)("div", {
                    className: "GravityTerm-text TermText",
                    children: (0, V.jsx)(K.Z, {
                        lang: this.props.promptLang,
                        maxLength: this.getMaxTextLength(),
                        side: this.props.showingSide,
                        term: this.props.term
                    })
                })
            }
            render() {
                const e = this.shouldShowTermImage(),
                    t = e && this.getTextLength() > 100 * Me(this.props.promptLang);
                const s = F()("GravityTerm", "tvy3tb5", {
                    "is-showing": this.props.gameState === l.FREE_FALL,
                    "is-unmissed": !this.props.isMeteor,
                    "is-meteor": this.props.isMeteor,
                    "has-image": e,
                    "image-only": e && 0 === this.getTextLength(),
                    "has-image-offset": t
                });
                return (0, V.jsx)("div", {
                    className: s,
                    "data-testid": "GravityTerm",
                    onAnimationEnd: this.handleAnimationEnd,
                    style: this.getTermStyles(),
                    children: (0, V.jsx)("div", {
                        className: F()("w1swt6ej", {
                            hasImageOffset: "ok0u4fh"
                        }),
                        style: {
                            height: this.getTermSize()
                        },
                        children: (0, V.jsxs)("div", {
                            className: "ck228hh",
                            style: this.getContentStyles(),
                            children: [this.shouldShowTermImage() ? this.renderImage(xe()(this.props.term._imageUrl)) : null, this.renderText()]
                        })
                    })
                })
            }
            shouldShowTermImage() {
                return !(this.props.showingSide !== re.E.DEFINITION_SIDE || !this.props.term._imageUrl)
            }
        }
        s("./.linaria-cache/app/j/gravity/components/GravityTerm.linaria.css");
        var Oe = s("./node_modules/keycode-js/dist/keycode.cjs.js");
        class Pe extends G.PureComponent {
            constructor(e) {
                super(e), this.getInputBox = () => this.GravityGameInput, this.onSubmitAnswer = () => {
                    "" !== this.props.textValue && this.isFreeFall() && U.gradeAnswer()
                }, this.onInputChange = e => {
                    U.updateMainTypingPromptValue(e.currentTarget.value)
                }, this.onAccentClick = (e, t) => {
                    t.preventDefault();
                    const s = ie(this.GravityGameInput, this.props.textValue, e);
                    if (null !== s) {
                        const [e, t] = s;
                        U.updateMainTypingPromptValue(e), window.setTimeout((() => {
                            this.GravityGameInput && t()
                        }), 0)
                    }
                }, this.onKeyDown = e => {
                    e.which === Oe.AC && (this.onSubmitAnswer(), e.preventDefault())
                }, this.handleBlur = e => {
                    e.relatedTarget ? !e.relatedTarget.className.indexOf("StudyModeAccentsBar-accentButton") > 0 && window.setTimeout((() => {
                        const e = this.getInputBox();
                        e && e.focus()
                    }), 0) : window.setTimeout((() => {
                        const e = this.getInputBox();
                        e && e.focus()
                    }), 0)
                }, this.renderAccentBar = () => {
                    if (0 === this.props.defAccents.length && 0 === this.props.wordAccents.length) return null;
                    const e = {
                        en: this.props.wordAccents.concat(this.props.defAccents)
                    };
                    return (0, V.jsx)(oe, {
                        charactersByLang: e,
                        onClickButton: this.onAccentClick
                    })
                }, this.renderPrompt = () => {
                    const e = F()({
                        GravityTypingPrompt: !0,
                        "is-showingInput": !0
                    });
                    return (0, V.jsx)("div", {
                        className: e,
                        children: (0, V.jsxs)("div", {
                            className: "GravityTypingPrompt-inner",
                            children: [(0, V.jsx)("div", {
                                className: "GravityTypingPrompt-inputWrapper",
                                children: (0, V.jsx)(q.Z, {
                                    autoCapitalize: "none",
                                    autoComplete: "off",
                                    autoCorrect: "off",
                                    className: "GravityTypingPrompt-input js-keymaster-allow",
                                    onBlur: this.handleBlur,
                                    onChange: this.onInputChange,
                                    onKeyDown: this.onKeyDown,
                                    placeholder: this.props.placeholderText,
                                    ref: e => {
                                        this.GravityGameInput = e
                                    },
                                    spellCheck: !1,
                                    value: this.props.textValue
                                })
                            }), this.renderAccentBar()]
                        })
                    })
                }, this.isFreeFall = () => this.props.gameState === l.FREE_FALL, this.state = {
                    isShowingPrompt: this.isFreeFall()
                }
            }
            UNSAFE_componentWillReceiveProps(e) {
                this.props.gameState !== e.gameState && e.gameState !== l.LEVEL_UP && (e.gameState !== l.FREE_FALL || this.state.isShowingPrompt ? e.gameState !== l.FREE_FALL && this.state.isShowingPrompt && this.setState({
                    isShowingPrompt: !1
                }) : this.setState({
                    isShowingPrompt: !0
                }))
            }
            componentDidUpdate(e) {
                const t = this.getInputBox();
                t && e.gameState !== this.props.gameState && this.isFreeFall() && t.focus()
            }
            render() {
                return (0, V.jsx)(B.uH, {
                    transitionName: "GravityTypingPrompt-animate",
                    children: this.state.isShowingPrompt ? this.renderPrompt() : null
                })
            }
        }
        const Le = Pe;
        s("./node_modules/core-js/modules/es.string.replace.js"), s("./node_modules/core-js/modules/es.array.includes.js");
        var ke = s("./node_modules/@quizlet/grader/quizlet-shared-kotlin-grader.js"),
            Ne = s("./app/j/compatibility/logger/getLoggerConfig.ts"),
            De = s("./app/j/config/enums.ts"),
            Re = s("./app/j/core/superagent-with-csrf.ts");
        const Ue = e => ({
                apply: e
            }),
            Ze = Ue(((e, t) => 20 * e + 150 * (1 + Number(((t - L.BEGINNER) / w).toFixed(0))))),
            Be = {
                correctAnswerPointsFormula: {
                    BEGINNER: Ze,
                    INTERMEDIATE: Ze,
                    EXPERT: Ze
                },
                gravityIncreaseFormula: {
                    BEGINNER: Ue((e => e)),
                    INTERMEDIATE: Ue((e => e + w)),
                    EXPERT: Ue((e => e + w))
                },
                newTermIntervalFormula: {
                    BEGINNER: Ue((e => Math.max(.8 * e, p))),
                    INTERMEDIATE: Ue((e => Math.max(.8 * e, p))),
                    EXPERT: Ue((e => Math.max(.9 * e, p)))
                }
            };
        var He = s("./app/j/highscores/actions/GameOverActionCreators.ts"),
            Fe = s("./app/j/highscores/actions/HighscoresActionCreators.ts"),
            Ge = s("./app/j/i18n/getLocalizedLanguage.ts"),
            Ve = s("./node_modules/immutable/dist/immutable.js"),
            We = s("./node_modules/invariant/browser.js"),
            ze = s.n(We),
            Ke = s("./node_modules/prevent-backspace/index.js"),
            qe = s.n(Ke),
            Qe = s("./app/j/stores/Store.ts"),
            Ye = s("./app/j/models/QModel.ts");
        class Xe extends Ye.Z {}
        Xe.URL_BASE = "answers", Xe.MODEL_NAME = "answer", Xe.ALLOW_SOFT_DELETE = !1;
        const $e = {
            ...s("./app/j/syncers/LegacySyncer.ts").Z
        };
        $e.BATCH_SIZE = 100, $e.init(Xe);
        const Je = $e;
        var et = s("./app/j/syncers/SessionSyncer.ts"),
            tt = s("./app/j/syncers/StudySettingSyncer.ts"),
            st = s("./app/j/utils/appendOptionalTrackingParams.ts"),
            nt = s("./app/j/utils/deferPromise.ts"),
            ot = s("./app/j/utils/idKey.ts"),
            rt = s("./app/j/utils/log-page-action.ts"),
            it = s("./app/j/utils/obfuscate.ts"),
            at = s("./app/j/utils/redirect.ts"),
            lt = s("./app/j/utils/shuffle-array.ts"),
            dt = s("./app/j/utils/StudyEventLogger.ts"),
            ct = s("./app/j/utils/StudyPageVisibilityTracker.ts"),
            ut = s("./app/j/utils/tamperProofNow.ts");
        let pt = {
            setup(e) {
                let {
                    acceptsPartialAnswer: t,
                    baseUrl: s,
                    definitionAccents: n,
                    funnelUUID: o,
                    hasPhotoOnlyDefinitions: r,
                    personId: i,
                    planetAssetPaths: d,
                    selectedOnly: c,
                    sessionLuid: u,
                    sets: p,
                    showingTermSide: h,
                    studyableId: m,
                    studyablePath: g,
                    studyableType: f,
                    studyStarredPath: _,
                    terms: y,
                    wordAccents: v
                } = e;
                const {
                    wordLabel: b,
                    defLabel: S,
                    showSetLanguages: E
                } = this._getLabelData(p);
                this.dataMap = (0, Ve.Map)({
                    acceptsPartialAnswer: t,
                    baseUrl: s,
                    definitionAccents: n,
                    defLabel: S,
                    funnelUUID: o,
                    hasPhotoOnlyDefinitions: r,
                    isShowingDontKnowTip: !1,
                    mainTypingPromptValue: "",
                    percentLoaded: 5,
                    personId: i,
                    planetAssetPaths: d,
                    selectedOnly: c,
                    sessionLuid: u,
                    sets: (0, Ve.Map)((0, ot.Z)("id", p)),
                    showingAdModal: !1,
                    showingTermSide: h || M,
                    showSetLanguages: E,
                    studyableId: m,
                    studyablePath: g,
                    studyableType: f,
                    studyStarredPath: _,
                    terms: this._getLuidToTerms((0, ot.Z)("id", y)),
                    wordAccents: v,
                    wordLabel: b
                }), this._setupStudyLogging({
                    selectedOnly: c,
                    studyableId: m,
                    studyableType: f,
                    funnelUUID: o
                }), this._initNewGame(), this._setDifficultyLevel(D), this._setupScoreSubmission(), this.answerSyncer = Je, this.grader = ke.DefaultGraderFactoryJs.create(), this.bindActions(a.MOVE_TO_OPTIONS, (() => this._updateGameState(l.OPTIONS))), this.bindActions(a.MOVE_TO_DIRECTIONS, (() => this._updateGameState(l.DIRECTIONS))), this.bindActions(a.START_GAME, this._startGame), this.bindActions(a.PAUSE_GAME, this._pauseGame), this.bindActions(a.RESUME_GAME, this._resumeGame), this.bindActions(a.RESTART_GAME, this._reInitGame), this.bindActions(a.ADVANCE_LEVEL, this._advanceLevel), this.bindActions(a.GRADE_ANSWER, this._gradeAnswer), this.bindActions(a.UPDATE_ALTERNATE_ANSWER_OPTION, this._updateAlternateAnswerOption), this.bindActions(a.MISS_TERM, this._missTerm), this.bindActions(a.CHANGE_SHOWING_SIDE, this._changeShowingSide), this.bindActions(a.CHECK_COPIED_ANSWER, this._checkCopiedAnswer), this.bindActions(a.CHANGE_DIFFICULTY_LEVEL, this._setDifficultyLevel), this.bindActions(a.UPDATE_MAIN_PROMPT_VALUE, this._updateMainTypingPromptValue), this.bindActions(a.MARK_PLANET_LOADED, this._markPlanetLoaded), this.bindActions(a.CLOSE_HIGH_SCORE_MODAL, this._onCloseModal), this.bindActions(a.RELOAD_PAGE, this._reload)
            },
            getDataMap() {
                return this.dataMap
            },
            isMeteor(e) {
                return this._getMissedCount(e) === T - 1
            },
            _getTermLuids() {
                return this.dataMap.get("terms").keySeq().toArray()
            },
            _getAvailableTermLuids() {
                return this._getTermLuids().filter((e => {
                    const t = this.dataMap.get("terms").get(e),
                        s = this.dataMap.get("showingTermSide");
                    return !("" === t.word || "" === t.definition && !t._imageUrl) && (s !== re.E.WORD_SIDE || "" !== t.definition)
                }))
            },
            _getLiveTermIds() {
                return this.dataMap.get("liveTerms").keySeq().toArray()
            },
            _getTermLuidFromLiveTermId(e) {
                return this.dataMap.getIn(["liveTerms", e, "luid"])
            },
            _getMissedCount(e) {
                const t = this._getTermLuidFromLiveTermId(e);
                return this.dataMap.getIn(["termLuidToMissedCount", t])
            },
            _isWordShowing(e) {
                return this.dataMap.getIn(["liveTerms", e, "side"]) === re.E.WORD_SIDE
            },
            _getSetIdForTerm(e) {
                return this.dataMap.getIn(["terms", e]).setId
            },
            _getSetForTerm(e) {
                const t = this._getSetIdForTerm(e),
                    s = this.dataMap.get("sets").get(t.toString());
                return ze()(s, "Missing set in GravityStore"), s
            },
            _getAnswerLang(e) {
                const t = this._getTermLuidFromLiveTermId(e),
                    s = this._getAnswerSide(e);
                return this._getLang(t, s)
            },
            _getLang(e, t) {
                return this._getSetForTerm(e)[t === re.E.DEFINITION_SIDE ? "defLang" : "wordLang"]
            },
            _getPromptSide(e) {
                return this._isWordShowing(e) ? re.E.WORD_SIDE : re.E.DEFINITION_SIDE
            },
            _getAnswerSide(e) {
                return this._isWordShowing(e) ? re.E.DEFINITION_SIDE : re.E.WORD_SIDE
            },
            _getCorrectAnswer(e) {
                const t = this._getAnswerSide(e),
                    s = this._getTermLuidFromLiveTermId(e);
                return this.dataMap.getIn(["terms", s])[t]
            },
            _getMissedSide(e) {
                return this.dataMap.getIn(["missedTermsToSide", e])
            },
            _reInitGame() {
                this._clearGame(), this._initNewGame()
            },
            _startGame() {
                let e = !1;
                this._isInitialPlanetsLoaded() ? this._startGameplay() : (this._enterLoadingState(), e = !0), (0, rt.Z)("startGravity", {
                    didSeeLoadingBar: e
                }), this.logStudyEvent(De.WVJ.EXIT_SCREEN, {
                    screen: De.HtK.ONBOARDING
                }), this._maybeCreateSession()
            },
            _enterLoadingState() {
                this._updateGameState(l.LOADING), this._updateLoadingPercent(30, c).then((() => this._updateLoadingPercent(50, u))).then((() => this._updateLoadingPercent(80, u))).then((() => this._updateLoadingPercent(100, u))).then((() => this._startGameplayAfterDelay(u + 500))).catch((() => {}))
            },
            _updateLoadingPercent(e, t) {
                const s = (0, nt.Z)();
                return window.setTimeout((() => {
                    100 === this.dataMap.get("percentLoaded") ? s.reject() : (this.dataMap = this.dataMap.set("percentLoaded", e), this.change(), s.resolve())
                }), t), s.promise
            },
            _startGameplayAfterDelay(e) {
                window.setTimeout((() => {
                    this._startGameplay(), this.change()
                }), e)
            },
            _startGameplay() {
                const e = this._getAvailableTermLuids();
                if (0 === e.length) return this._updateGameState(l.ERROR_NO_AVAILABLE_TERMS);
                this.dataMap = this.dataMap.set("allRemainingTermLuids", (0, Ve.List)((0, lt.Z)(e))), this._updateGameState(l.FREE_FALL), this._getNewLevelTerms(), this._resetTimer(), this.tipTimer = window.setTimeout((() => {
                    this._showDontKnowTip()
                }), E)
            },
            _pauseGame() {
                this._pauseTimer(), this._updateGameState(l.PAUSED)
            },
            _resumeGame() {
                this._resumeTimer(), this._updateGameState(l.FREE_FALL)
            },
            _clearGame() {
                this.dataMap = this.dataMap.merge((0, Ve.fromJS)({
                    isShowingDontKnowTip: !1,
                    isMeteorIncoming: !1,
                    mainTypingPromptValue: ""
                })), this._pauseTimer(), clearTimeout(this.tipTimer)
            },
            _endGame() {
                this._clearGame(), this._updateGameState(l.GAME_OVER), He.Z.setOnCloseModal(U.maybeShowAdModal), this._syncScoreAndShowHighscoresModal(), qe()(), (0, rt.Z)("gravity_game_over", {
                    level: this.dataMap.get("level"),
                    mode: De.StudyModeType.GRAVITY
                }), this.logStudyEvent(De.WVJ.ENTER_SCREEN, {
                    screen: De.HtK.RESULTS
                })
            },
            _onCloseModal() {
                this._reload()
            },
            _onLeaveGame() {
                (0, at.ZP)(this.getDataMap().get("studyablePath"))
            },
            _reload() {
                const e = (0, st.Z)(window.location.href, {
                    funnelUUID: this.dataMap.get("funnelUUID")
                });
                return ze()(e, "locationWithFunnelTracking should not be null"), window.location.replace(e)
            },
            _updateGameState(e) {
                this.dataMap = this.dataMap.set("gameState", e)
            },
            _advanceLevel() {
                this.dataMap = this.dataMap.update("level", (e => e + 1));
                const e = Be.gravityIncreaseFormula[this.dataMap.get("difficultyLevel")];
                this.dataMap = this.dataMap.update("gravityConstant", (t => e.apply(t))), this._updateGameState(l.LEVEL_UP), window.setTimeout((() => {
                    this._beginNextLevel()
                }), j)
            },
            _beginNextLevel() {
                this._getNewLevelTerms(), this._setNewTermInterval(), this._setTermLife(), this._resetTimer(), this._updateGameState(l.FREE_FALL), this.change()
            },
            _promptCopyAnswer(e) {
                this._pauseTimer(), this._updateGameState(l.COPY_ANSWER), this.dataMap = this.dataMap.set("termBeingCopied", e)
            },
            _updateMainTypingPromptValue(e) {
                this.dataMap = this.dataMap.set("mainTypingPromptValue", e)
            },
            _updatePoints(e) {
                this.dataMap = this.dataMap.update("points", (t => Math.max(0, t + e)))
            },
            _scoreIncorrect() {
                this._updatePoints(x), this.dataMap = this.dataMap.set("mainTypingPromptValue", "")
            },
            _scoreCorrect() {
                const e = Be.correctAnswerPointsFormula[this.dataMap.get("difficultyLevel")].apply(this.dataMap.get("consecutiveCorrect"), this.dataMap.get("gravityConstant"));
                this._updatePoints(e)
            },
            _resetConsecutive() {
                this.dataMap = this.dataMap.set("consecutiveCorrect", 0)
            },
            _addConsecutive() {
                this.dataMap = this.dataMap.update("consecutiveCorrect", (e => e + 1))
            },
            _addMissed(e) {
                const t = this._getTermLuidFromLiveTermId(e);
                this._incrementMissedCount(t), this.dataMap = this.dataMap.setIn(["missedTermsToSide", t], this.dataMap.getIn(["liveTerms", e, "side"])), this.dataMap = this.dataMap.update("currentLevelMissedTermLuids", (e => e.push(t))), this._syncAnswer(e, !1)
            },
            _incrementMissedCount(e) {
                this.dataMap = this.dataMap.updateIn(["termLuidToMissedCount", e], (e => e + 1))
            },
            _addCorrect(e) {
                this._syncAnswer(e, !0)
            },
            _missTerm(e) {
                let {
                    liveTermId: t,
                    wasSkipped: s
                } = e;
                const n = this._getAcceptsPartialAnswerSettings(),
                    o = this.dataMap.get("mainTypingPromptValue");
                this._isCorrectAnswerForTerm(o, t, n).isCorrect ? this._markCorrectAndAdvanceGame(t) : (s && clearTimeout(this.tipTimer), this._resetConsecutive(), this._addMissed(t), this._promptCopyAnswer(t))
            },
            _markCorrectAndAdvanceGame(e) {
                this._markCorrect(e), this._removeFromLiveTerms(e), this._advanceGameAfterCorrect(), this.dataMap = this.dataMap.set("mainTypingPromptValue", "")
            },
            _markCorrect(e) {
                this._addConsecutive(), this._addCorrect(e), this._scoreCorrect()
            },
            _advanceGameAfterCorrect() {
                if (this.dataMap.get("liveTerms").isEmpty() && this.dataMap.get("currentLevelTermsRemaining").isEmpty()) this._advanceLevel();
                else {
                    const e = this.timer < this.dataMap.get("newTermInterval") - f;
                    this.dataMap.get("liveTerms").isEmpty() && e && this._resetTimer(), this.dataMap.get("gameState") !== l.FREE_FALL && this._resumeGame()
                }
            },
            _isCorrectAnswerForTerm(e, t) {
                const s = this._getCorrectAnswer(t);
                return this.grader.gradeWithSuggestions(s, e, {
                    answerLanguage: this._getAnswerLang(t),
                    gradingSettings: this._getAcceptsPartialAnswerSettings()
                })
            },
            _gradeAnswer() {
                const e = this.dataMap.get("mainTypingPromptValue");
                for (const t of this.dataMap.get("liveTerms").keys()) {
                    if (this._isCorrectAnswerForTerm(e, t).isCorrect) return void this._markCorrectAndAdvanceGame(t)
                }
                this._scoreIncorrect()
            },
            _checkCopiedAnswer(e) {
                let {
                    liveTermId: t,
                    answer: s
                } = e;
                if (!this.dataMap.get("termBeingCopied")) return null;
                const n = this._getCorrectAnswer(t);
                if (this.grader.gradeWithSuggestions(n, s, {
                        answerLanguage: this._getAnswerLang(t),
                        gradingSettings: this._getAcceptsPartialAnswerSettings()
                    }).isCorrect) {
                    this.dataMap = this.dataMap.merge((0, Ve.fromJS)({
                        termBeingCopied: null,
                        mainTypingPromptValue: ""
                    }));
                    const e = this._getMissedCount(t) === T;
                    this._removeFromLiveTerms(t), e ? this._endGame() : this._advanceGameAfterCorrect()
                }
            },
            _getAcceptsPartialAnswerSettings() {
                const e = this.dataMap.get("acceptsPartialAnswer");
                return {
                    [De._1P.ACCEPT_PARTIAL_ANSWERS]: e
                }
            },
            _updateAlternateAnswerOption(e) {
                const t = this.getDataMap().get("personId"),
                    s = De.Std.FLEXIBLE_GRADING_ACCEPT_PARTIAL_ANSWERS,
                    n = e ? 1 : 0,
                    o = this.getDataMap().get("studyableId"),
                    r = this.getDataMap().get("studyableType");
                tt.Z.addAndSave({
                    personId: t,
                    settingType: s,
                    settingValue: n,
                    studyableId: o,
                    studyableType: r
                }), this.dataMap = this.dataMap.set("acceptsPartialAnswer", e)
            },
            _getNewLevelTerms() {
                const e = this.dataMap.get("currentLevelTerms");
                let t = this.dataMap.get("allRemainingTermLuids"),
                    s = this.dataMap.get("allUsedTermLuids"),
                    n = this.dataMap.get("currentLevelMissedTermLuids");
                const o = e.filterNot((e => n.includes(e)));
                for (s = s.concat(o); n.size < C;) s.isEmpty() && t.isEmpty() ? t = (0, Ve.List)((0, lt.Z)(this._getAvailableTermLuids())) : t.isEmpty() && (t = (0, Ve.List)((0, lt.Z)(s.toArray())), s = (0, Ve.List)()), n = n.push(t.last()), t = t.pop();
                n = (0, Ve.List)((0, lt.Z)(n.toArray())), this.dataMap = this.dataMap.merge((0, Ve.fromJS)({
                    allUsedTermLuids: s,
                    allRemainingTermLuids: t,
                    currentLevelTerms: n,
                    currentLevelTermsRemaining: n,
                    currentLevelMissedTermLuids: (0, Ve.List)()
                }))
            },
            _setDifficultyLevel(e) {
                this.dataMap = this.dataMap.merge((0, Ve.fromJS)({
                    difficultyLevel: e,
                    gravityConstant: L[e],
                    newTermInterval: k[e]
                }))
            },
            _setNewTermInterval() {
                const e = Be.newTermIntervalFormula[this.dataMap.get("difficultyLevel")];
                this.dataMap = this.dataMap.update("newTermInterval", (t => e.apply(t)))
            },
            _setTermLife() {
                this.dataMap = this.dataMap.update("termLife", (e => Math.max(.9 * e, m)))
            },
            _resetTimer() {
                this.timer = 0, this.initialTermTimer = window.setTimeout((() => {
                    this._fireTerm(), this._pauseTimer(), this._resumeTimer()
                }), f)
            },
            _resumeTimer() {
                this.timerInterval = window.setInterval((() => {
                    this._incrementTimer()
                }), g)
            },
            _pauseTimer() {
                clearTimeout(this.initialTermTimer), clearInterval(this.timerInterval)
            },
            _incrementTimer() {
                this.dataMap.get("gameState") === l.FREE_FALL && (this.timer >= this.dataMap.get("newTermInterval") && (this._fireTerm(), this.timer -= this.dataMap.get("newTermInterval")), this.timer += g)
            },
            _showDontKnowTip() {
                this.dataMap = this.dataMap.set("isShowingDontKnowTip", !0), this.change(), window.setTimeout((() => {
                    this.dataMap = this.dataMap.set("isShowingDontKnowTip", !1), this.change()
                }), S)
            },
            _updateLiveTerms(e, t) {
                this.dataMap = this.dataMap.setIn(["liveTerms", e], (0, Ve.Map)(t))
            },
            _fireTerm() {
                if (this.dataMap.get("currentLevelTermsRemaining").isEmpty()) this._pauseTimer();
                else {
                    const e = this._getNextTermToFire(),
                        t = this._getNextLiveTermId(e),
                        s = this._getNextSide(),
                        n = {
                            answerLang: this._getLang(e, s),
                            luid: e,
                            promptLang: this._getLang(e, s),
                            side: s
                        };
                    this._updateLiveTerms(t, n), this.dataMap = this.dataMap.update("currentLevelTermsRemaining", (e => e.shift())), this._updateIsMeteorIncoming(), this.change()
                }
            },
            _updateIsMeteorIncoming() {
                const e = this._liveTermsHasMeteor();
                this.dataMap.get("isMeteorIncoming") !== e && (this.dataMap = this.dataMap.set("isMeteorIncoming", e))
            },
            _liveTermsHasMeteor() {
                return this.dataMap.get("liveTerms").keySeq().some((e => this.isMeteor(e)))
            },
            _removeFromLiveTerms(e) {
                this.dataMap = this.dataMap.update("liveTerms", (t => t.delete(e))), this._updateIsMeteorIncoming()
            },
            _getNewTermShowingSide(e) {
                const t = this.dataMap.get("terms").get(e);
                let s = this.dataMap.get("showingTermSide");
                return "random" === s && (s = "" === t.definition ? re.E.DEFINITION_SIDE : Math.random() >= .5 ? re.E.WORD_SIDE : re.E.DEFINITION_SIDE), s
            },
            _getNextSide() {
                const e = this._getNextTermToFire();
                return this._getMissedSide(e) || this._getNewTermShowingSide(e)
            },
            _getNextTermToFire() {
                const e = this.dataMap.get("currentLevelTermsRemaining");
                if (!e.isEmpty()) return e.first()
            },
            _getNextLiveTermId(e) {
                const t = C - this.dataMap.get("currentLevelTermsRemaining").size;
                return e + "-" + this.dataMap.get("level") + "-" + t
            },
            _changeShowingSide(e) {
                let {
                    side: t
                } = e;
                if (this.dataMap = this.dataMap.merge((0, Ve.fromJS)({
                        showingTermSide: t
                    })), "random" !== t) {
                    const e = this.dataMap.get("liveTerms").withMutations((e => {
                        this._getLiveTermIds().forEach((s => {
                            e.setIn([s, "side"], t)
                        }))
                    }));
                    this.dataMap = this.dataMap.set("liveTerms", e)
                }
            },
            _maybeCreateSession() {
                const e = this.getDataMap().get("sessionLuid"),
                    t = {
                        personId: this.getDataMap().get("personId"),
                        itemId: this.getDataMap().get("studyableId"),
                        itemType: this.getDataMap().get("studyableType"),
                        selectedOnly: this.getDataMap().get("selectedOnly"),
                        timestamp: (0, ut.Z)(),
                        type: De.StudyModeType.GRAVITY
                    };
                return new Promise(((s, n) => {
                    et.Z.contains(e) || et.Z.add({});
                    const o = et.Z.getModel(e);
                    return o.isNewRecord() ? et.Z.save(e, t).then((e => {
                        let [, t] = e;
                        s(t.properties)
                    })).catch((e => {
                        let [t] = e;
                        n(t)
                    })) : s(o.properties)
                }))
            },
            _buildAnswer(e, t) {
                const s = this._getTermLuidFromLiveTermId(e),
                    n = this.getDataMap().get("personId"),
                    o = this._isWordShowing(e) ? De.TermSide.WORD : De.TermSide.DEFINITION,
                    r = (0, ut.Z)();
                return {
                    personId: n,
                    correctness: t ? De.p7P.CORRECT : De.p7P.INCORRECT,
                    promptSide: o,
                    round: this.dataMap.get("level"),
                    sessionId: void 0,
                    setId: this._getSetIdForTerm(s),
                    termId: this.dataMap.getIn(["terms", s]).id,
                    timestamp: r,
                    type: De.StudyModeType.GRAVITY
                }
            },
            _saveAnswer(e, t) {
                return void 0 === t && (t = 0), new Promise(((s, n) => this._maybeCreateSession().then((o => {
                    null != o && o.id && (e.sessionId = o.id, this.answerSyncer.addAndSave(e).then((e => {
                        let [, t] = e;
                        s(t.properties)
                    })).catch((s => {
                        let [o] = s;
                        if (0 === t && "ValidationError" === o.name && o.message.includes('"identifier":"invalid_session","field":"session"')) return this.dataMap = this.dataMap.set("sessionLuid", et.Z.add({})), this._saveAnswer(e, t + 1);
                        n(o)
                    })))
                }))))
            },
            _syncAnswer(e, t) {
                const s = this._buildAnswer(e, t);
                return this._saveAnswer(s)
            },
            _syncScoreAndShowHighscoresModal() {
                this._submitScore(this.dataMap, o.Z.SERVER_TIME, Promise, Re.ZP, {
                    HighscoresActionCreators: Fe.Z,
                    GameOverActionCreators: He.Z,
                    obfuscate: it.Z
                })
            },
            _isInitialPlanetsLoaded() {
                return this.dataMap.getIn(["planetsLoaded", 1]) && this.dataMap.getIn(["planetsLoaded", 2]) && this.dataMap.getIn(["planetsLoaded", 3])
            },
            _markPlanetLoaded(e) {
                if (this.dataMap = this.dataMap.setIn(["planetsLoaded", e], !0), this._isInitialPlanetsLoaded() && (this.dataMap.get("gameState") === l.LOADING && this._updateLoadingPercent(100, 0).then((() => this._startGameplayAfterDelay(u + 500))), window.performance)) {
                    const e = (new Date).getTime() - window.performance.timing.navigationStart;
                    (0, rt.Z)("gravityPlanetsLoaded", {
                        time: e
                    })
                }
            },
            _initNewGame() {
                this.dataMap = this.dataMap.merge((0, Ve.fromJS)({
                    level: 1,
                    points: 0,
                    gameState: l.INTRO,
                    isMeteorIncoming: !1,
                    termLife: h,
                    consecutiveCorrect: 0,
                    currentLevelTerms: (0, Ve.List)(),
                    currentLevelTermsRemaining: (0, Ve.List)(),
                    liveTerms: (0, Ve.OrderedMap)(),
                    termBeingCopied: null,
                    allRemainingTermLuids: (0, Ve.List)(),
                    allUsedTermLuids: (0, Ve.List)(),
                    currentLevelMissedTermLuids: (0, Ve.List)(),
                    missedTermsToSide: (0, Ve.Map)()
                })), this._initTermLuidToMissedCount(), this.logStudyEvent(De.WVJ.ENTER_SCREEN, {
                    screen: De.HtK.ONBOARDING
                })
            },
            _getLuidToTerms(e) {
                const t = {};
                for (const s of Object.keys(e)) {
                    t["term-" + s] = e[s]
                }
                return (0, Ve.Map)(t)
            },
            _getLabelData(e) {
                const t = 1 === e.length && e[0].wordLang !== e[0].defLang;
                return {
                    wordLabel: t ? (0, Ge.Z)(e[0].wordLang) : (0, J.Z)("gravity.options_view.side_selector.term"),
                    defLabel: t ? (0, Ge.Z)(e[0].defLang) : (0, J.Z)("gravity.options_view.side_selector.definition"),
                    showSetLanguages: t
                }
            },
            _initTermLuidToMissedCount() {
                const e = {};
                this._getTermLuids().forEach((t => {
                    e[t] = 0
                })), this.dataMap = this.dataMap.set("termLuidToMissedCount", (0, Ve.Map)(e))
            },
            _setupStudyLogging(e) {
                var t;
                let {
                    selectedOnly: s,
                    studyableId: n,
                    studyableType: r,
                    funnelUUID: i
                } = e;
                const a = new dt.Z({
                        modeType: De.StudyModeType.GRAVITY,
                        selectedOnly: s,
                        studyableId: n,
                        studyableType: r,
                        embedType: null,
                        funnelUUID: i,
                        userId: null == o.Z || null == (t = o.Z.user) ? void 0 : t.id,
                        uid: null == o.Z ? void 0 : o.Z.uid
                    }),
                    l = function(e, t) {
                        void 0 === t && (t = {}), a.logStudyEvent(e, {
                            loggerConfig: (0, Ne.c)()
                        }, t)
                    };
                this.logStudyEvent = l, this.logStudyEvent(De.WVJ.BEGIN), new ct.Z(l)
            },
            _setupScoreSubmission() {
                window.setupScoreSubmit(this)
            }
        };
        pt._onCloseModal = pt._onCloseModal.bind(pt), pt = Object.assign(pt, Qe.Z), pt.init();
        const ht = pt;
        var mt = s("./node_modules/keymaster/keymaster.js"),
            gt = s.n(mt),
            ft = s("./node_modules/react-progress/dist/react-progress.js"),
            _t = s.n(ft);
        class yt extends G.PureComponent {
            constructor() {
                super(...arguments), this.getInputPlaceholderText = () => {
                    const e = this.props.showingTermSide;
                    return "random" !== e && this.props.showSetLanguages ? (0, J.Z)("gravity.language_prompt_placeholder", {
                        languageName: "word" === e ? this.props.defLabel : this.props.wordLabel
                    }) : (0, J.Z)("gravity.default_prompt_placeholder")
                }, this.onTransitionToFreeFall = () => {
                    window.setTimeout((() => {
                        gt().pushScope(d.GAMEPLAY), gt()(N, d.GAMEPLAY, this.onPressSkipKey)
                    }), 300)
                }, this.onTransitionOutOfFreeFall = () => {
                    gt().popScope(d.GAMEPLAY), gt().unbind(N, d.GAMEPLAY)
                }, this.onPressSkipKey = e => {
                    e.preventDefault();
                    const t = this.props.liveTerms.keys().next().value;
                    t && U.missTerm(t, !0)
                }, this.renderLiveTerms = () => this.props.liveTerms.entrySeq().map((e => {
                    let [t, s] = e;
                    return t === this.props.termBeingCopied ? null : (ze()(t, "Invalid termID from liveTerms"), (0, V.jsx)(Ie, {
                        gameState: this.props.gameState,
                        isMeteor: ht.isMeteor(t),
                        isMeteorIncoming: this.props.isMeteorIncoming,
                        liveTermId: t,
                        promptLang: s.get("promptLang"),
                        showingSide: s.get("side"),
                        term: this.props.terms[s.get("luid")],
                        termLife: this.props.termLife,
                        windowHeight: this.props.windowHeight,
                        windowWidth: this.props.windowWidth
                    }, t))
                })), this.renderTermBeingCopied = () => {
                    const e = this.props.termBeingCopied;
                    if (!e) return null;
                    const t = this.props.liveTerms.get(e);
                    ze()(t, "Missing term id in liveTerms");
                    const s = t.get("luid"),
                        n = t.get("side"),
                        o = "word" === n ? t.get("promptLang") : t.get("answerLang"),
                        r = "word" === n ? t.get("answerLang") : t.get("promptLang");
                    return (0, V.jsx)("div", {
                        className: "GravityGameplayView-copyTermWrapper",
                        children: (0, V.jsx)(ae, {
                            defAccents: this.props.defAccents,
                            defLang: r,
                            previouslyTypedText: this.props.mainTypingPromptValue,
                            showingSide: n,
                            term: this.props.terms[s],
                            termBeingCopied: this.props.termBeingCopied,
                            wordAccents: this.props.wordAccents,
                            wordLang: o
                        }, "CopyTermView-" + s)
                    })
                }, this.renderLoadingBar = () => {
                    const e = {
                        borderRadius: (0, Te.hO)(10),
                        height: 20,
                        position: "absolute",
                        transitionTimingFunction: "linear"
                    };
                    return (0, V.jsx)("div", {
                        className: "GravityGameplayView-loadingBar",
                        children: (0, V.jsx)(_t(), {
                            color: "#fff",
                            percent: this.props.percentLoaded,
                            speed: u / 1e3,
                            style: e
                        })
                    })
                }, this.isInFreeFall = () => this.props.gameState === l.FREE_FALL
            }
            componentDidUpdate(e) {
                this.props.gameState !== e.gameState && (this.props.gameState === l.FREE_FALL ? this.onTransitionToFreeFall() : this.onTransitionOutOfFreeFall())
            }
            render() {
                const e = this.props.gameState === l.INTRO || this.props.gameState === l.OPTIONS || this.props.gameState === l.DIRECTIONS || this.props.gameState === l.LOADING || this.props.gameState === l.GAME_OVER,
                    t = F()({
                        GravityGameplayView: !0,
                        "has-splash": e,
                        "is-gameOver": this.props.gameState === l.GAME_OVER
                    });
                return (0, V.jsxs)("div", {
                    className: t,
                    children: [this.props.gameState === l.LOADING ? this.renderLoadingBar() : null, (0, V.jsx)("div", {
                        className: "GravityGameplayView-starsBgPreload"
                    }), (0, V.jsxs)("div", {
                        className: "GravityGameplayView-inner",
                        children: [(0, V.jsx)(z, {
                            isShowing: this.props.isMeteorIncoming,
                            message: (0, J.Z)("gravity.alerts.asteroid_incoming"),
                            type: "warning"
                        }), (0, V.jsx)(z, {
                            isShowing: this.props.isShowingDontKnowTip,
                            message: (0, J.Z)("gravity.alerts.skip"),
                            type: "info"
                        }), (0, V.jsx)(B.uH, {
                            component: "div",
                            transitionAppear: !0,
                            transitionName: "GravityGameplayView-animateTermToCopy",
                            children: this.renderTermBeingCopied()
                        }), (0, V.jsx)("div", {
                            className: "GravityGameplayView-typingPrompt",
                            children: (0, V.jsx)(Le, {
                                defAccents: this.props.defAccents,
                                gameState: this.props.gameState,
                                placeholderText: this.getInputPlaceholderText(),
                                textValue: this.props.mainTypingPromptValue,
                                wordAccents: this.props.wordAccents
                            })
                        }), this.renderLiveTerms(), (0, V.jsx)(ue, {
                            gameState: this.props.gameState
                        }), (0, V.jsx)(Ee, {
                            currentLevel: this.props.level,
                            gameState: this.props.gameState,
                            planetLevel: 1,
                            src: this.props.planetAssetPaths[1],
                            windowHeight: this.props.windowHeight,
                            windowWidth: this.props.windowWidth
                        }), (0, V.jsx)(Ee, {
                            currentLevel: this.props.level,
                            gameState: this.props.gameState,
                            planetLevel: 2,
                            src: this.props.planetAssetPaths[2],
                            windowHeight: this.props.windowHeight,
                            windowWidth: this.props.windowWidth
                        }), (0, V.jsx)(Ee, {
                            currentLevel: this.props.level,
                            gameState: this.props.gameState,
                            planetLevel: 3,
                            src: this.props.planetAssetPaths[3],
                            windowHeight: this.props.windowHeight,
                            windowWidth: this.props.windowWidth
                        }), (0, V.jsx)(Ee, {
                            currentLevel: this.props.level,
                            gameState: this.props.gameState,
                            planetLevel: 4,
                            windowHeight: this.props.windowHeight,
                            windowWidth: this.props.windowWidth
                        }), (0, V.jsx)(Ee, {
                            currentLevel: this.props.level,
                            gameState: this.props.gameState,
                            planetLevel: 5,
                            windowHeight: this.props.windowHeight,
                            windowWidth: this.props.windowWidth
                        }), (0, V.jsx)(Ee, {
                            currentLevel: this.props.level,
                            gameState: this.props.gameState,
                            planetLevel: 6,
                            windowHeight: this.props.windowHeight,
                            windowWidth: this.props.windowWidth
                        }), (0, V.jsx)(Ee, {
                            currentLevel: this.props.level,
                            gameState: this.props.gameState,
                            planetLevel: 7,
                            windowHeight: this.props.windowHeight,
                            windowWidth: this.props.windowWidth
                        }), (0, V.jsx)(Ee, {
                            currentLevel: this.props.level,
                            gameState: this.props.gameState,
                            planetLevel: 8,
                            windowHeight: this.props.windowHeight,
                            windowWidth: this.props.windowWidth
                        }), (0, V.jsx)(Ee, {
                            currentLevel: this.props.level,
                            gameState: this.props.gameState,
                            planetLevel: 9,
                            windowHeight: this.props.windowHeight,
                            windowWidth: this.props.windowWidth
                        }), (0, V.jsx)(Ee, {
                            currentLevel: this.props.level,
                            gameState: this.props.gameState,
                            planetLevel: 10,
                            windowHeight: this.props.windowHeight,
                            windowWidth: this.props.windowWidth
                        })]
                    })]
                })
            }
        }
        var vt = s("./app/j/components/ModeControls.tsx"),
            bt = s("./app/j/components/UIButton.tsx"),
            St = s("./app/j/components/UIHeading.tsx"),
            Et = s("./app/j/components/UILink.tsx"),
            jt = s("./app/j/utils/NumberFormatters.ts");
        class xt extends G.Component {
            constructor() {
                super(...arguments), this.getIsPaused = () => this.props.gameState === l.PAUSED, this.onClickPause = () => {
                    this.props.gameState === l.FREE_FALL && U.pauseGame()
                }, this.onClickResume = () => {
                    U.resumeGame()
                }, this.onClickRestart = () => {
                    U.restartGame()
                }
            }
            getIsPauseDisabled() {
                return this.props.gameState === l.COPY_ANSWER
            }
            getPauseButtonHandler() {
                return this.getIsPaused() ? this.onClickResume : this.onClickPause
            }
            renderActions() {
                const e = this.getIsPaused() ? (0, V.jsx)(Q.Z, {
                    id: "gravity.sidebar.resume_button"
                }) : (0, V.jsx)(Q.Z, {
                    id: "gravity.sidebar.pause_button"
                });
                return [(0, V.jsx)(bt.Z, {
                    disabled: this.getIsPauseDisabled(),
                    onClick: this.getPauseButtonHandler(),
                    width: "fill",
                    children: e
                }), (0, V.jsx)("div", {
                    className: "GravityModeControls-restartButton",
                    children: (0, V.jsx)(Et.Z, {
                        onClick: this.onClickRestart,
                        children: (0, V.jsx)(Q.Z, {
                            id: "gravity.sidebar.restart_button"
                        })
                    })
                })]
            }
            renderMobileHeaderActions() {
                return [(0, V.jsx)(Et.Z, {
                    disabled: this.getIsPauseDisabled(),
                    onClick: this.getPauseButtonHandler(),
                    variant: "inverted",
                    children: (0, V.jsx)(Y.Z, {
                        className: "GravityModeControls-modeHeaderIcon",
                        icon: "pause"
                    })
                }), (0, V.jsx)(Et.Z, {
                    onClick: this.onClickRestart,
                    variant: "inverted",
                    children: (0, V.jsx)(Y.Z, {
                        className: "GravityModeControls-modeHeaderIcon",
                        icon: "refresh"
                    })
                })]
            }
            renderProgress() {
                return (0, V.jsxs)("div", {
                    children: [(0, V.jsxs)("div", {
                        className: "GravityModeControls-stat",
                        children: [(0, V.jsx)("span", {
                            className: "GravityModeControls-label",
                            children: (0, V.jsx)(St.Z, {
                                deprecatedStyle: !0,
                                size: 6,
                                children: (0, V.jsx)(Q.Z, {
                                    id: "gravity.sidebar.score_label"
                                })
                            })
                        }), (0, V.jsx)("span", {
                            className: "GravityModeControls-value",
                            children: (0, jt.uf)(this.props.points)
                        })]
                    }), (0, V.jsxs)("div", {
                        className: "GravityModeControls-stat",
                        children: [(0, V.jsx)("span", {
                            className: "GravityModeControls-label",
                            children: (0, V.jsx)(St.Z, {
                                deprecatedStyle: !0,
                                size: 6,
                                children: (0, V.jsx)(Q.Z, {
                                    id: "gravity.sidebar.level_label"
                                })
                            })
                        }), (0, V.jsx)("span", {
                            className: "GravityModeControls-value",
                            children: this.props.level
                        })]
                    })]
                })
            }
            render() {
                return (0, V.jsx)("div", {
                    children: (0, V.jsx)(vt.Z, {
                        actions: this.renderActions(),
                        customHeaderActions: this.renderMobileHeaderActions(),
                        modeName: (0, J.Z)("study_mode.name.gravity"),
                        modeType: "gravity",
                        progress: this.renderProgress(),
                        shouldShowOptionsButton: !1,
                        studyablePath: this.props.studyablePath
                    })
                })
            }
        }

        function Tt(e) {
            return (0, V.jsxs)("div", {
                className: "GravityScreenSizeBlocker",
                children: [(0, V.jsx)("div", {
                    className: "GravityScreenSizeBlocker-icon",
                    children: e.isMobile ? (0, V.jsx)(Y.Z, {
                        icon: "no-mobile"
                    }) : (0, V.jsx)(Y.Z, {
                        icon: "fullscreen"
                    })
                }), (0, V.jsx)("div", {
                    className: "GravityScreenSizeBlocker-content",
                    children: e.isMobile ? (0, V.jsx)(Q.Z, {
                        id: "gravity.mobile_blocker"
                    }) : (0, V.jsx)(Q.Z, {
                        id: "gravity.desktop_blocker"
                    })
                })]
            })
        }
        var wt = s("./app/j/components/UIModal.tsx"),
            Ct = s("./app/j/components/UIParagraph.tsx");
        class At extends G.PureComponent {
            constructor() {
                super(...arguments), this.onClickStart = () => {
                    U.startGame()
                }
            }
            render() {
                return (0, V.jsx)(wt.Z, {
                    includeCloseButton: !1,
                    includeOverlay: !1,
                    isOpen: !0,
                    onClose: this.onClickStart,
                    children: (0, V.jsxs)("div", {
                        className: "GravityDirectionsView",
                        children: [(0, V.jsx)("div", {
                            className: "GravityDirectionsView-asteroidImage"
                        }), (0, V.jsx)("div", {
                            className: "GravityDirectionsView-title",
                            children: (0, V.jsx)(Q.Z, {
                                id: "gravity.directions_view.title"
                            })
                        }), (0, V.jsx)(Ct.Z, {
                            children: (0, V.jsx)(Q.Z, {
                                id: "gravity.directions_view.body"
                            })
                        }), (0, V.jsx)("div", {
                            className: "GravityDirectionsView-startButton",
                            children: (0, V.jsx)(bt.Z, {
                                "aria-label": (0, J.Z)("gravity.directions_view.start_button"),
                                hero: !0,
                                onClick: this.onClickStart,
                                children: (0, V.jsx)(Q.Z, {
                                    id: "gravity.directions_view.start_button"
                                })
                            })
                        })]
                    })
                })
            }
        }
        const Mt = At;
        class It extends G.PureComponent {
            render() {
                return (0, V.jsx)(wt.Z, {
                    includeCloseButton: !1,
                    includeOverlay: !1,
                    isOpen: !0,
                    children: (0, V.jsxs)("div", {
                        className: "GravityErrorNoAvailableTermsView",
                        children: [(0, V.jsx)(St.Z, {
                            deprecatedStyle: !0,
                            size: 2,
                            children: (0, V.jsx)(Q.Z, {
                                id: "gravity.error_no_available_terms_view.heading"
                            })
                        }), (0, V.jsx)(Ct.Z, {
                            children: (0, V.jsx)(Q.Z, {
                                id: "gravity.error_no_available_terms_view.message"
                            })
                        }), (0, V.jsx)(bt.Z, {
                            "aria-label": (0, J.Z)("gravity.error_no_available_terms_view.back_to_set_button"),
                            linkTo: this.props.studyablePath,
                            children: (0, V.jsx)(Q.Z, {
                                id: "gravity.error_no_available_terms_view.back_to_set_button"
                            })
                        })]
                    })
                })
            }
        }
        var Ot = s("./app/j/components/UICheckbox.tsx"),
            Pt = s("./app/j/components/UIColumn.tsx"),
            Lt = s("./app/j/components/UIDropdown.tsx"),
            kt = s("./app/j/components/UIFieldset.tsx"),
            Nt = s("./app/j/components/UIRow.tsx"),
            Dt = s("./app/j/components/UISmall.tsx"),
            Rt = s("./app/j/components/UIToggle.tsx"),
            Ut = s("./app/j/study-modes/legacy-common/options/types.ts");

        function Zt(e) {
            return "word" === e ? "definition" : "definition" === e ? "word" : "random"
        }
        class Bt extends G.PureComponent {
            constructor(e) {
                super(e), this.handleClickNext = () => {
                    U.displayGameDirections()
                }, this.handleChangeDifficultyLevel = e => {
                    U.changeDifficultyLevel(e)
                }, this.handleChangeShowingSide = e => {
                    U.changeShowingSide(Zt(e.target.value))
                }, this.handleToggleStarredMode = e => {
                    (0, at.ZP)("starred" === e ? this.props.studyStarredPath : this.props.studyAllPath)
                }, this.handleShowMultipleAnswersOptions = () => {
                    this.setState((e => ({
                        showMultipleAnswersOption: !e.showMultipleAnswersOption
                    })))
                }, this.handleToggleAcceptMultipleAnswers = () => {
                    this.setState((e => ({
                        acceptsPartialAnswer: !e.acceptsPartialAnswer
                    })), (() => {
                        this.handleUpdateAlternateAnswerOption(this.state.acceptsPartialAnswer)
                    }))
                }, this.handleUpdateAlternateAnswerOption = e => U.updateAlternateAnswerOption(e), this.renderStarredToggle = () => (0, V.jsx)(kt.Z, {
                    legend: (0, J.Z)("gravity.options_view.study_starred_selector.title"),
                    children: (0, V.jsxs)(Rt.Z, {
                        onChange: this.handleToggleStarredMode,
                        value: this.props.selectedOnly ? "starred" : "all",
                        children: [(0, V.jsx)(Rt.A, {
                            value: "all",
                            children: (0, V.jsx)(Q.Z, {
                                id: "gravity.options_view.study_starred_selector.all"
                            })
                        }), (0, V.jsx)(Rt.A, {
                            value: "starred",
                            children: (0, V.jsx)(Q.Z, {
                                id: "gravity.options_view.study_starred_selector.starred"
                            })
                        })]
                    })
                }), this.renderSideSelect = () => (0, V.jsx)(kt.Z, {
                    legend: (0, J.Z)("gravity.options_view.side_selector.title"),
                    children: (0, V.jsxs)(Lt.Z, {
                        disabled: !this.props.shouldShowSideSelect,
                        onChange: this.handleChangeShowingSide,
                        value: Zt(this.props.showingTermSide),
                        children: [(0, V.jsx)("option", {
                            value: "word",
                            children: this.props.wordLabel
                        }), (0, V.jsx)("option", {
                            value: "definition",
                            children: this.props.defLabel
                        }), (0, V.jsx)("option", {
                            value: "random",
                            children: (0, J.Z)("gravity.options_view.side_selector.random")
                        })]
                    })
                }), this.renderDifficultyToggle = () => (0, V.jsx)(kt.Z, {
                    legend: (0, J.Z)("gravity.options_view.difficulty_selector.title"),
                    children: (0, V.jsxs)(Rt.Z, {
                        name: "difficultyLevel",
                        onChange: this.handleChangeDifficultyLevel,
                        value: this.props.difficultyLevel,
                        children: [(0, V.jsx)(Rt.A, {
                            value: I,
                            children: (0, V.jsx)(Q.Z, {
                                id: "gravity.options_view.difficulty_selector.easy"
                            })
                        }), (0, V.jsx)(Rt.A, {
                            value: O,
                            children: (0, V.jsx)(Q.Z, {
                                id: "gravity.options_view.difficulty_selector.medium"
                            })
                        }), (0, V.jsx)(Rt.A, {
                            value: P,
                            children: (0, V.jsx)(Q.Z, {
                                id: "gravity.options_view.difficulty_selector.hard"
                            })
                        })]
                    })
                }), this.renderMultipleAnswersCheckbox = () => {
                    const {
                        showMultipleAnswersOption: e,
                        acceptsPartialAnswer: t
                    } = this.state;
                    return e ? (0, V.jsxs)("div", {
                        className: "TestModeOptions-listOption",
                        children: [(0, V.jsx)(Ot.Z, {
                            checked: !!t,
                            label: (0, V.jsx)(Q.Z, {
                                id: "assistant.options.multiple_answers.label"
                            }),
                            name: Ut.$.MULTIPLE_ANSWERS,
                            onChange: this.handleToggleAcceptMultipleAnswers
                        }), (0, V.jsx)(Dt.Z, {
                            children: (0, V.jsx)("div", {
                                className: "GravityOptionsView-alternateAnswersOptionExplanation TestModeOptions-listOption-description",
                                children: (0, V.jsx)(Q.Z, {
                                    id: "assistant.options.multiple_answers.description"
                                })
                            })
                        })]
                    }) : (0, V.jsx)("div", {
                        className: "TestModeOptions-extraRow",
                        children: (0, V.jsx)(Et.Z, {
                            onClick: this.handleShowMultipleAnswersOptions,
                            children: (0, V.jsx)(Q.Z, {
                                id: "assistant.options.show_feedback_options"
                            })
                        })
                    })
                }, this.state = {
                    showMultipleAnswersOption: !1,
                    acceptsPartialAnswer: e.acceptsPartialAnswer
                }
            }
            render() {
                return (0, V.jsx)(wt.Z, {
                    headerContent: (0, J.Z)("gravity.options_view.title"),
                    includeCloseButton: !1,
                    includeOverlay: !1,
                    isOpen: !0,
                    onClose: this.handleClickNext,
                    children: (0, V.jsxs)("div", {
                        className: "GravityOptionsView",
                        children: [(0, V.jsxs)(Nt.Z, {
                            children: [(0, V.jsx)(Pt.Z, {
                                mobileWidth: .5,
                                width: .5,
                                children: this.renderStarredToggle()
                            }), (0, V.jsx)(Pt.Z, {
                                mobileWidth: .5,
                                width: .5,
                                children: this.renderSideSelect()
                            })]
                        }), (0, V.jsx)("div", {
                            className: "GravityOptionsView-row",
                            children: (0, V.jsx)(Nt.Z, {
                                children: (0, V.jsx)(Pt.Z, {
                                    mobileWidth: .5,
                                    width: .5,
                                    children: this.renderDifficultyToggle()
                                })
                            })
                        }), (0, V.jsx)("div", {
                            className: "GravityOptionsView-row",
                            children: (0, V.jsx)(Nt.Z, {
                                children: (0, V.jsx)(Pt.Z, {
                                    mobileWidth: .5,
                                    width: .5,
                                    children: this.renderMultipleAnswersCheckbox()
                                })
                            })
                        }), (0, V.jsx)("div", {
                            className: "GravityOptionsView-nextButtonWrapper",
                            children: (0, V.jsx)(bt.Z, {
                                "aria-label": (0, J.Z)("gravity.options_view.next_button"),
                                hero: !0,
                                onClick: this.handleClickNext,
                                width: "fill",
                                children: (0, V.jsx)(Q.Z, {
                                    id: "gravity.options_view.next_button"
                                })
                            })
                        })]
                    })
                })
            }
        }
        const Ht = Bt;
        class Ft extends G.PureComponent {
            constructor() {
                super(...arguments), this.handleClickStart = () => {
                    U.displayGameOptions()
                }
            }
            render() {
                return (0, V.jsxs)("div", {
                    className: "GravitySplashView",
                    children: [(0, V.jsx)(St.Z, {
                        deprecatedStyle: !0,
                        size: 1,
                        children: (0, V.jsx)(Q.Z, {
                            id: "gravity.splash_view.title"
                        })
                    }), (0, V.jsx)("p", {
                        className: "GravitySplashView-description",
                        children: (0, V.jsx)(Q.Z, {
                            id: "gravity.splash_view.description"
                        })
                    }), (0, V.jsx)(bt.Z, {
                        "aria-label": (0, J.Z)("gravity.splash_view.start_button"),
                        hero: !0,
                        onClick: this.handleClickStart,
                        children: (0, V.jsx)(Q.Z, {
                            id: "gravity.splash_view.start_button"
                        })
                    })]
                })
            }
        }
        const Gt = Ft;
        class Vt extends G.PureComponent {
            constructor() {
                super(...arguments), this.onClickStart = () => {
                    U.startGame()
                }
            }
            render() {
                return (0, V.jsxs)("div", {
                    className: "GravityStartView",
                    children: [(0, V.jsx)("div", {
                        className: "GravityStartView-backdrop"
                    }), (() => {
                        switch (this.props.gameState) {
                            case l.INTRO:
                                return (0, V.jsx)(Gt, {});
                            case l.OPTIONS:
                                return (0, V.jsx)(Ht, {
                                    acceptsPartialAnswer: this.props.acceptsPartialAnswer,
                                    defLabel: this.props.defLabel,
                                    difficultyLevel: this.props.difficultyLevel,
                                    selectedOnly: this.props.selectedOnly,
                                    shouldShowSideSelect: this.props.shouldShowSideSelect,
                                    showingTermSide: this.props.showingTermSide,
                                    studyAllPath: this.props.studyAllPath,
                                    studyStarredPath: this.props.studyStarredPath,
                                    wordLabel: this.props.wordLabel
                                });
                            case l.DIRECTIONS:
                                return (0, V.jsx)(Mt, {});
                            case l.ERROR_NO_AVAILABLE_TERMS:
                                return (0, V.jsx)(It, {
                                    studyablePath: this.props.studyablePath
                                });
                            default:
                                return null
                        }
                    })()]
                })
            }
        }
        Vt.defaultProps = {
            acceptsPartialAnswer: !1
        };
        var Wt = s("./node_modules/lodash/debounce.js"),
            zt = s.n(Wt),
            Kt = s("./node_modules/react-dom/index.js"),
            qt = s("./app/j/utils/BreakpointsHelper.ts"),
            Qt = s("./app/j/utils/EventListener.ts"),
            Yt = s("./app/j/utils/UserAgentHelper.ts");
        class Xt extends G.PureComponent {
            constructor() {
                super(...arguments), this.state = {
                    windowWidth: window.innerWidth,
                    windowHeight: window.innerHeight
                }, this.onWindowResize = () => {
                    this.updateWindowSize()
                }, this.updateWindowSize = () => {
                    const e = (0, Kt.findDOMNode)(this.gameplayView);
                    e && this.setState({
                        windowWidth: e.offsetWidth,
                        windowHeight: window.innerHeight
                    })
                }
            }
            UNSAFE_componentWillMount() {
                this.windowResizeListener = Qt.Z.listen(window, "resize", zt()(this.onWindowResize, b))
            }
            componentDidMount() {
                window.setTimeout(this.updateWindowSize, 1)
            }
            componentWillUnmount() {
                this.windowResizeListener && this.windowResizeListener.remove()
            }
            renderControls() {
                return (0, V.jsx)(xt, {
                    gameState: this.props.gameState,
                    level: this.props.level,
                    points: this.props.points,
                    studyablePath: this.props.studyablePath
                })
            }
            renderView() {
                if ((0, qt.RF)()) return [this.renderGameplayView(), this.renderBlockerView()];
                switch (this.props.gameState) {
                    case l.INTRO:
                    case l.DIRECTIONS:
                    case l.OPTIONS:
                    case l.LOADING:
                    case l.ERROR_NO_AVAILABLE_TERMS:
                        return [this.renderGameplayView(), this.renderStartScreen()];
                    case l.GAME_OVER:
                    default:
                        return this.renderGameplayView()
                }
            }
            renderStartScreen() {
                return (0, V.jsx)(Vt, {
                    acceptsPartialAnswer: this.props.acceptsPartialAnswer,
                    defLabel: this.props.defLabel,
                    difficultyLevel: this.props.difficultyLevel,
                    gameState: this.props.gameState,
                    selectedOnly: this.props.selectedOnly,
                    shouldShowSideSelect: !this.props.hasPhotoOnlyDefinitions,
                    showingTermSide: this.props.showingTermSide,
                    studyablePath: this.props.studyablePath,
                    studyAllPath: this.props.studyAllPath,
                    studyStarredPath: this.props.studyStarredPath,
                    wordLabel: this.props.wordLabel
                }, "GravityStartView")
            }
            renderGameplayView() {
                return (0, V.jsx)(yt, {
                    defAccents: this.props.defAccents,
                    defLabel: this.props.defLabel,
                    gameState: this.props.gameState,
                    isMeteorIncoming: this.props.isMeteorIncoming,
                    isShowingDontKnowTip: this.props.isShowingDontKnowTip,
                    level: this.props.level,
                    liveTerms: this.props.liveTerms,
                    mainTypingPromptValue: this.props.mainTypingPromptValue,
                    newTermInterval: this.props.newTermInterval,
                    percentLoaded: this.props.percentLoaded,
                    planetAssetPaths: this.props.planetAssetPaths,
                    ref: e => {
                        this.gameplayView = e
                    },
                    showingTermSide: this.props.showingTermSide,
                    showSetLanguages: this.props.showSetLanguages,
                    termBeingCopied: this.props.termBeingCopied,
                    termLife: this.props.termLife,
                    terms: this.props.terms,
                    windowHeight: this.state.windowHeight,
                    windowWidth: this.state.windowWidth,
                    wordAccents: this.props.wordAccents,
                    wordLabel: this.props.wordLabel
                }, "GravityGameplayView")
            }
            renderBlockerView() {
                return (0, V.jsx)(Tt, {
                    isMobile: (0, Yt.s2)()
                }, "GravityScreenSizeBlocker")
            }
            render() {
                return (0, V.jsx)("div", {
                    className: "GravityModeLayout",
                    children: (0, V.jsx)(Z.Z, {
                        controls: this.renderControls(),
                        onCloseAdModal: this.props.onCloseAdModal,
                        onMount: () => {},
                        shouldBeFullWidth: !0,
                        shouldUseDarkBackground: !0,
                        shouldUsePortal: !1,
                        showAdModal: this.props.showingAdModal,
                        children: this.renderView()
                    })
                })
            }
        }
        class $t extends G.PureComponent {
            constructor(e) {
                super(e), this.fetchGravityStore = () => ({
                    data: ht.getDataMap()
                }), this.onGravityStoreChange = () => {
                    this.setState(this.fetchGravityStore())
                }, this.state = this.fetchGravityStore()
            }
            UNSAFE_componentWillMount() {
                ht.addChangeListener(this.onGravityStoreChange)
            }
            componentWillUnmount() {
                ht.removeChangeListener(this.onGravityStoreChange)
            }
            render() {
                return (0, V.jsx)(Xt, {
                    acceptsPartialAnswer: this.state.data.get("acceptsPartialAnswer"),
                    defAccents: this.state.data.get("definitionAccents"),
                    defLabel: this.state.data.get("defLabel"),
                    defOptionText: this.state.data.get("defOptionText"),
                    difficultyLevel: this.state.data.get("difficultyLevel"),
                    gameState: this.state.data.get("gameState"),
                    gravityConstant: this.state.data.get("gravityConstant"),
                    hasPhotoOnlyDefinitions: this.state.data.get("hasPhotoOnlyDefinitions"),
                    isMeteorIncoming: this.state.data.get("isMeteorIncoming"),
                    isShowingDontKnowTip: this.state.data.get("isShowingDontKnowTip"),
                    level: this.state.data.get("level"),
                    liveTerms: this.state.data.get("liveTerms"),
                    mainTypingPromptValue: this.state.data.get("mainTypingPromptValue"),
                    newTermInterval: this.state.data.get("newTermInterval"),
                    onCloseAdModal: U.reload,
                    percentLoaded: this.state.data.get("percentLoaded"),
                    planetAssetPaths: this.state.data.get("planetAssetPaths"),
                    points: this.state.data.get("points"),
                    selectedOnly: this.state.data.get("selectedOnly"),
                    shouldShowSideSelect: this.state.data.get("shouldShowSideSelect"),
                    showingAdModal: this.state.data.get("showingAdModal"),
                    showingTermSide: this.state.data.get("showingTermSide"),
                    showSetLanguages: this.state.data.get("showSetLanguages"),
                    studyablePath: this.state.data.get("studyablePath"),
                    studyAllPath: this.state.data.get("baseUrl"),
                    studyStarredPath: this.state.data.get("studyStarredPath"),
                    termBeingCopied: this.state.data.get("termBeingCopied"),
                    termLife: this.state.data.get("termLife"),
                    terms: this.state.data.get("terms").toJS(),
                    wordAccents: this.state.data.get("wordAccents"),
                    wordLabel: this.state.data.get("wordLabel"),
                    wordOptionText: this.state.data.get("wordOptionText")
                })
            }
        }
        const Jt = $t;
        var es = s("./app/j/highscores/components/HighscoresModalContainer.tsx"),
            ts = s("./app/j/highscores/stores/HighscoresStore.ts"),
            ss = s("./app/j/i18n/initLocalizationOnce.ts"),
            ns = s("./app/j/login/index.ts"),
            os = s("./app/j/trophies/components/TrophiesModalContainer.tsx"),
            rs = s("./app/j/trophies/stores/TrophiesStore.ts"),
            is = s("./app/j/utils/readReactTarget.ts"),
            as = s("./app/j/utils/renderReactAppToDOM.tsx");
        window.strform = function(e) {
            const t = function(e) {
                const t = [];
                let s = 0;
                const n = e.length;
                for (; s < n;) {
                    let n = 0;
                    for (let t = 6; t >= 0; t--) " " === e.charAt(s) && (n |= 2 ** t), s++;
                    t.push(String.fromCharCode(n))
                }
                return t.join("")
            }(xe()(e.nodeValue).replace(/\n/g, ""));
            return xe()(e.parentNode).removeChild(e), t
        }, QLoad("Quizlet.strform"), gt().filter = e => {
            const t = e.target || e.srcElement,
                {
                    tagName: s
                } = t,
                n = t.getAttribute("class"),
                o = "INPUT" !== s && "SELECT" !== s,
                r = n && n.indexOf("js-keymaster-allow") >= 0;
            return o || r
        }, QWait("Quizlet.BindGravityMode", (async function() {
            await (0, ss.Z)(), (0, is.Z)("GravityMode").then((e => {
                let {
                    target: t,
                    data: s
                } = e;
                const r = et.Z.add({});
                ht.setup(Object.assign(s, {
                    sessionLuid: r
                })), o.Z.user || (0, ns.default)(), (0, as.Z)((0, V.jsx)(n.ZP, {
                    children: (0, V.jsx)(Jt, {
                        ...s
                    })
                }), t)
            }))
        })), (0, is.Z)("HighscoresModal").then((e => {
            let {
                target: t,
                data: s
            } = e;
            const {
                funnelUUID: n,
                isEmbedding: o,
                isNewStudyBreakAds: r,
                itemId: i,
                itemType: a,
                person: l,
                previousRecord: d,
                selectedOnly: c,
                shouldShowAd: u,
                signupOrigin: p,
                studyablePath: h,
                type: m
            } = s;
            ts.Z.setup(n, r, o, i, a, l, d, c, u, p, h, m), (0, as.Z)((0, V.jsx)(es.Z, {}), t)
        })), (0, is.Z)("TrophiesModal").then((e => {
            let {
                target: t,
                data: s
            } = e;
            rs.Z.setup(s), (0, as.Z)((0, V.jsx)(os.Z, {}), t)
        }))
    }
});
