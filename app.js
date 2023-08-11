const container = document.getElementById('container')
const sliderOne = document.getElementById('slider-one')
const sliderTwo = document.getElementById('slider-two')
const totalEnergyPlayerOne = document.getElementById('total-energy-player-one')
const totalEnergyPlayerTwo = document.getElementById('total-energy-player-two')
const weakAttackPlayerTwo = document.getElementById('weak-attack-player-two')
const strongAttackPlayerTwo = document.getElementById('strong-attack-player-two')
const fakeAttackPlayerTwo = document.getElementById('fake-attack-player-two')
const weakAttackPlayerOne = document.getElementById('weak-attack-player-one')
const strongAttackPlayerOne = document.getElementById('strong-attack-player-one')
const fakeAttackPlayerOne = document.getElementById('fake-attack-player-one')
const misteryBlockPlayerOne = document.getElementById('mystery-block-player-one')
const riskyBlockPlayerOne = document.getElementById('risky-block-player-one')
const reflectPlayerOne = document.getElementById('reflect-move-player-one')
const misteryBlockPlayerTwo = document.getElementById('mistery-block-player-two')
const riskyBlockPlayerTwo = document.getElementById('risky-block-player-two')
const reflectPlayerTwo = document.getElementById('reflect-move-player-two')
const actionButtons = document.querySelectorAll('.action-buttons')
const textPlayerOne = document.getElementById('text-player-one')
const textPlayerTwo = document.getElementById('text-player-two')
const roundSummary = document.getElementById('round-summary')
const combatText = document.getElementById('combat-text')
const textCheckBox = document.getElementById('text-checkbox')
const animationsCheckbox = document.getElementById('animations-checkbox')
const checkBoxes = document.querySelectorAll('.checkboxes')
const gameInfoButton = document.querySelector('#game-info-button')
const playersDivs = document.querySelectorAll('.players')
const actionButtonsPlayerTwo = document.querySelectorAll('.action-buttons-player-two')
let textInfo = false
let vsAI = false
let animations = false
let arrOfBackgroundImages = ["url(./photos_and_gifs/cover.jpg)", "url(./photos_and_gifs/cover2.jpg)"
, "url(./photos_and_gifs/cover3.jpg)", "url(./photos_and_gifs/cover4.jpg)", "url(./photos_and_gifs/cover5.jpg)"
,"url(./photos_and_gifs/cover6.jpg)" ,"url(./photos_and_gifs/cover7.jpg)", "url(./photos_and_gifs/cover8.jpg)"
,"url(./photos_and_gifs/cover9.jpg)", "url(./photos_and_gifs/cover10.jpg)"]
let indexForArrOfBGImages = 0
let welcomeMessage = 1
let arrOfAttacks = [weakAttackPlayerTwo, strongAttackPlayerTwo, fakeAttackPlayerTwo]
let arrOfDefense = [reflectPlayerTwo, riskyBlockPlayerTwo, misteryBlockPlayerTwo]
let textAppearanceSpeed = 40
let pressedButtons = []
const colors = ['green', 'blue', 'yellowgreen', 'darkgreen', 'green', 'yellow', 'blue'
    , 'yellowgreen', 'darkgreen', 'green', 'blue', 'yellowgreen', 'darkgreen', 'yellow'
    , 'green', 'blue', 'yellowgreen', 'red', 'green', 'yellow', 'blue', 'yellowgreen',
    , 'green', 'blue', 'red', 'darkgreen', 'green', 'yellow', 'blue', 'yellowgreen',
    , 'green', 'blue', 'yellowgreen', 'darkgreen', 'green', 'yellow', 'blue', 'fuchsia']


actionButtons.forEach(button => {
    let innerHTML = button.innerHTML
    button.addEventListener('mouseover', (event) => {
        button.style.fontSize = '14px'
        button.style.fontWeight = 'bold'
        if (button.classList.contains('action-buttons-player-one'))
            button.style.outline = '2px solid gold'
        else {
            button.style.transform = 'scaleX(1)'
            button.style.outline = '2px solid lightgreen'
        }

        if (button.classList.contains('weak-attack')) {
            button.textContent = 'Weak Attack'
        }
        else if (button.classList.contains('strong-attack')) {
            button.textContent = 'Strong Attack'
        }
        else if (button.classList.contains('fake-attack')) {
            button.textContent = 'Fake Attack'
        }
        else if (button.classList.contains('mistery-block')) {
            button.textContent = 'Mistery Block'
        }
        else if (button.classList.contains('risky-block')) {
            button.textContent = 'Risky Block'
        }
        else if (button.classList.contains('reflect-move')) {
            button.textContent = 'Reflect'
        }
    })
    button.addEventListener('mouseout', () => {
        button.innerHTML = innerHTML
        button.style.fontSize = '30px'
        button.style.outline = '0'
        if (button.classList.contains('action-buttons-player-two'))
            button.style.transform = 'scaleX(-1)'
    })
    button.addEventListener('click', (event) => {
        pressedButtons.push(button)
        textPlayerOne.innerText = ''
        textPlayerTwo.innerText = ''
        roundSummary.innerText = ''

        if (textInfo)
            combatText.style.display = 'block'

        if (!vsAI) {
            if (pressedButtons.length === 1 && pressedButtons[0].classList.contains('attacking-buttons')) {
                const player = pressedButtons[0].classList.contains('action-buttons-player-one')
                if (player) combatText.style.outline = '5px solid yellow'
                else combatText.style.outline = '5px solid lightgreen'
                const attackChosen = `${player ? 'Yellow' : 'Green'} chose an attack, ${!player ? 'Yellow' : 'Green'} should choose defense now`
                roundSummary.style.marginBottom = '40px'
                for (let i = 0; i < attackChosen.length; i++) {
                    setTimeout(() => {
                        roundSummary.textContent += attackChosen[i]
                    }, i * textAppearanceSpeed / 3)
                }
            }
            else if (pressedButtons.length === 1 && pressedButtons[0].classList.contains('defensive-buttons')) {
                const warning = 'First move has to be an attacking move!'
                combatText.style.outline = '5px solid red'
                roundSummary.style.marginBottom = '40px'
                for (let i = 0; i < warning.length; i++) {
                    setTimeout(() => {
                        roundSummary.textContent += warning[i]
                    }, i * textAppearanceSpeed / 3)
                }
                pressedButtons.length = 0
            }

            if (pressedButtons.length === 2 && pressedButtons[0].classList.contains('attacking-buttons') && pressedButtons[1].classList.contains('defensive-buttons')) {

                if (pressedButtons[0].classList.contains('action-buttons-player-one') && pressedButtons[1].classList.contains('action-buttons-player-two'))
                    calculateDMG(pressedButtons[0], pressedButtons[1], pressedButtons[0].classList.contains('action-buttons-player-one'))
                else if (pressedButtons[0].classList.contains('action-buttons-player-two') && pressedButtons[1].classList.contains('action-buttons-player-one'))
                    calculateDMG(pressedButtons[0], pressedButtons[1], pressedButtons[0].classList.contains('action-buttons-player-one'))
                else {
                    const warning = 'Why would you attack yourself...'
                    combatText.style.outline = '5px solid red'
                    roundSummary.style.marginBottom = '40px'
                    for (let i = 0; i < warning.length; i++) {
                        setTimeout(() => {
                            roundSummary.textContent += warning[i]
                        }, i * textAppearanceSpeed / 3)
                    }
                }
                pressedButtons.length = 0
            }
            else if (pressedButtons.length === 2) {
                const warning = 'One player attacks, other player defends!'
                combatText.style.outline = '5px solid red'
                roundSummary.style.marginBottom = '40px'
                for (let i = 0; i < warning.length; i++) {
                    setTimeout(() => {
                        roundSummary.textContent += warning[i]
                    }, i * textAppearanceSpeed / 3)
                }
                pressedButtons.length = 0
            }
        }
        else if (pressedButtons.length === 1 && pressedButtons[0].classList.contains('attacking-buttons') && vsAI) {
            if (pressedButtons[0].classList.contains('attacking-buttons')) {
                combatText.style.outline = '5px solid yellow'
                const humanChoseAttack = `Human chose an attack. AI will choose defense now.`
                const AIChoseAttack = 'AI chose an attack. Human should choose defense now.'
                roundSummary.style.marginBottom = '40px'
                for (let i = 0; i < humanChoseAttack.length; i++) {
                    setTimeout(() => {
                        roundSummary.textContent += humanChoseAttack[i]
                    }, i * textAppearanceSpeed / 3)
                }
                setTimeout(() => {
                    calculateDMG(pressedButtons[0], arrOfDefense[Math.floor(Math.random() * 3)], pressedButtons[0].classList.contains('action-buttons-player-one'))
                    pressedButtons.length = 0
                }, textAppearanceSpeed * 40);

                if (totalEnergyPlayerOne.textContent > 0 && totalEnergyPlayerTwo.textContent > 0) {
                    setTimeout(() => {
                        combatText.style.outline = '5px solid lightgreen'
                        textPlayerOne.innerText = ''
                        textPlayerTwo.innerText = ''
                        roundSummary.innerText = ''
                        for (let i = 0; i < AIChoseAttack.length; i++) {
                            setTimeout(() => {
                                if (totalEnergyPlayerTwo.textContent > 0)
                                    roundSummary.textContent += AIChoseAttack[i]
                            }, i * textAppearanceSpeed / 3)
                        }
                        pressedButtons.push(arrOfAttacks[Math.floor(Math.random() * 3)])
                    }, textAppearanceSpeed * 150);
                }
            }
        }
        else if (pressedButtons.length === 2 && pressedButtons[1].classList.contains('defensive-buttons') && vsAI) {
            roundSummary.style.marginBottom = '40px'
            setTimeout(() => {
                calculateDMG(pressedButtons[0], pressedButtons[1], pressedButtons[0].classList.contains('action-buttons-player-one'))
                pressedButtons.length = 0
            }, 50);
        }
        else if (pressedButtons.length === 2 && pressedButtons[1].classList.contains('attacking-buttons') && vsAI) {
            pressedButtons.pop()
            textPlayerOne.innerText = ''
            textPlayerTwo.innerText = ''
            roundSummary.innerText = ''
            const arrOfTexts = [textPlayerOne, textPlayerTwo, roundSummary]
            const arrOfWarnings = [`People say that the attack is the best defense but...`
                , `That doesn't work here as rules are different.`
                , `Please, choose defense to defend from AI attack`]

            arrOfWarnings.forEach((text, index) => {
                setTimeout(() => {
                    displayText(text, arrOfTexts[index])
                }, index * textAppearanceSpeed * 25);
            })
        }
        else if (pressedButtons.length === 1 && pressedButtons[0].classList.contains('defensive-buttons') && vsAI) {
            const warning = "How do you plan on damaging AI with defense moves..."
            combatText.style.outline = '5px solid red'
            roundSummary.style.marginBottom = '40px'
            for (let i = 0; i < warning.length; i++) {
                setTimeout(() => {
                    roundSummary.textContent += warning[i]
                }, i * textAppearanceSpeed / 3)
            }
            pressedButtons.length = 0
        }
    })
})

function displayText(text, player) {
    player.textContent = ''
    for (let i = 0; i < text.length; i++) {
        setTimeout(() => {
            player.textContent += text[i]
        }, i * textAppearanceSpeed / 3)
    }
}

function calculateDMG(attack, defense, player) {
    let energyTaken = 0
    let attackLevel = Math.floor(Math.random() * 5) + 1
    let defenseLevel = Math.floor(Math.random() * 5) + 1
    if (attack.classList.contains('weak-attack')) {
        if (defense.classList.contains('reflect-move')) {
            player = !player
            energyTaken = attackLevel
            defenseLevel = attackLevel
        }
        else if (defense.classList.contains('risky-block')) {
            defenseLevel *= (Math.floor(Math.random() * 5) - 1)
            energyTaken = attackLevel - defenseLevel
        }
        else if (defense.classList.contains('mistery-block')) {
            energyTaken = attackLevel - defenseLevel
        }
    }
    else if (attack.classList.contains('strong-attack')) {
        if (!player) {
            sliderTwo.value -= 5
            totalEnergyPlayerTwo.innerText = sliderTwo.value
        }
        else {
            sliderOne.value -= 5
            totalEnergyPlayerOne.innerText = sliderOne.value
        }
        if (defense.classList.contains('reflect-move')) {
            player = !player
            attackLevel *= 3
            energyTaken = attackLevel
            defenseLevel = attackLevel
        }
        else if (defense.classList.contains('risky-block')) {
            defenseLevel *= (Math.floor(Math.random() * 5) - 1)
            attackLevel *= 3
            energyTaken = attackLevel - defenseLevel
        }
        else if (defense.classList.contains('mistery-block')) {
            attackLevel *= 3
            energyTaken = attackLevel - defenseLevel
        }
    }
    else if (attack.classList.contains('fake-attack')) {
        if (defense.classList.contains('reflect-move')) {
            energyTaken = 15
            attackLevel = 0
            defenseLevel = 0
        }
        else if (defense.classList.contains('risky-block')) {
            energyTaken = 0
            attackLevel = 0
        }
        else if (defense.classList.contains('mistery-block')) {
            energyTaken = 0
            attackLevel = 0
        }
    }

    if (energyTaken < 0) energyTaken = 0

    if (player) {
        sliderTwo.value -= energyTaken
        totalEnergyPlayerTwo.innerText = sliderTwo.value
    }
    else {
        sliderOne.value -= energyTaken
        totalEnergyPlayerOne.innerText = sliderOne.value
    }

    let nameOfAttack = attack.id.replace(/(^\w+)-(\w+)-\w+-\w+/, (match, p1, p2, p3, p4) => {
        return p1.toUpperCase() + ' ' + p2.toUpperCase()
    })
    let nameOfDefense = defense.id.replace(/(^\w+)-(\w+)-\w+-\w+/, (match, p1, p2, p3, p4) => {
        return p1.toUpperCase() + ' ' + p2.toUpperCase()
    })

    let damageTaker = player

    if (defense.classList.contains('reflect-move') && !attack.classList.contains('fake-attack')) {
        player = !player
        damageTaker = !player
    }

    if (animations) showGif(attack.id)

    const textArr = [`Player ${(player) ? 'Yellow' : 'Green'} used ${nameOfAttack} which attacked with ${attackLevel} damage`,
    `Player ${(!player) ? 'Yellow' : 'Green'} used ${nameOfDefense} that ${defense.classList.contains('reflect-move') ? 'reflected' : 'defended'} ${defenseLevel} damage`,
    `Round ended with ${!damageTaker ? 'Yellow' : 'Green'} receiving ${energyTaken} damage`]
    const threeTexts = [textPlayerOne, textPlayerTwo, roundSummary]

    combatText.style.outline = '5px solid purple'

    threeTexts.forEach((text) => {
        text.innerText = ''
        text.style.margin = 0
    })

    textArr.forEach((text, index) => {
        setTimeout(() => {
            displayText(text, threeTexts[index])
        }, index * textAppearanceSpeed * 25)
    })

    if (textInfo) combatText.style.display = 'block'

    if (totalEnergyPlayerOne.innerText == 0) {
        roundSummary.style.marginBottom = '40px'
        setTimeout(() => {
            threeTexts.forEach((text) => text.innerText = '')
            winnerOfTheDuel(false)
        }, 80 * textAppearanceSpeed);
        setTimeout(() => {
            combatText.style.outline = '8px solid lightgreen'
        }, 118 * textAppearanceSpeed)
    }
    else if (totalEnergyPlayerTwo.innerText == 0) {
        setTimeout(() => {
            threeTexts.forEach((text) => text.innerText = '')
            winnerOfTheDuel(true)
        }, 80 * textAppearanceSpeed);
        setTimeout(() => {
            combatText.style.outline = `8px solid yellow`
        }, 118 * textAppearanceSpeed)
    }
}

function winnerOfTheDuel(player) {
    const warning = `CONGRATULATIONS! Player ${player ? 'Yellow' : 'Green'} WINS!`
    combatText.style.outline = `5px solid ${player ? 'yellow' : 'lightgreen'}`
    roundSummary.style.marginBottom = '40px'
    for (let i = 0; i < warning.length; i++) {
        setTimeout(() => {
            combatText.style.outline = `8px solid ${colors[i]}`
            roundSummary.textContent += warning[i]
        }, i * textAppearanceSpeed)
    }
    sliderOne.value = 100
    sliderTwo.value = 100
    totalEnergyPlayerTwo.innerText = sliderOne.value
    totalEnergyPlayerOne.innerText = sliderOne.value
    pressedButtons.length = 0
}

sliderOne.addEventListener('input', (event) => {
    totalEnergyPlayerOne.innerText = sliderOne.value
})
sliderTwo.addEventListener('input', (event) => {
    totalEnergyPlayerTwo.innerText = sliderTwo.value
})

const musicCheckbox = document.getElementById('music-checkbox');
const music = document.getElementById('music');
const volumeContainer = document.getElementById('volume-container');
const volumeSlider = document.getElementById('volume-slider');
let musicVolume = 0.5
volumeSlider.value = 0.5

function toggleMusic() {
    // volumeContainer.style.outline = '2px solid red'
    if (musicCheckbox.checked) {
        music.play();
        volumeContainer.style.visibility = 'visible';
    } else {
        music.pause();
        volumeContainer.style.visibility = 'hidden';
    }
}
volumeSlider.addEventListener('input', () => {
    music.volume = volumeSlider.value;
});

musicCheckbox.addEventListener('change', () => {
    if (musicCheckbox.checked) {
        music.volume = musicVolume; // starting value
    }
    toggleMusic();
})

musicCheckbox.addEventListener('change', toggleMusic);

const closeText = document.querySelector('#close-text')
closeText.addEventListener('click', () => {
    combatText.style.display = 'none'
})

const textSpeedSlider = document.getElementById('text-speed-slider')
const textSpeedContainer = document.getElementById('text-speed-container')

textCheckBox.addEventListener('change', () => {
    if (textCheckBox.checked) {
        if (welcomeMessage > 0 && roundSummary.innerText === '') {
            let message = 'Welcome to the DUEL, I hope that you will have fun playing it :)'
            roundSummary.style.marginBottom = '40px'
            for (let i = 0; i < message.length; i++) {
                setTimeout(() => {
                    roundSummary.textContent += message[i]
                    combatText.style.outline = `8px solid ${colors[i]}`
                }, i * textAppearanceSpeed / 3);
            }
            welcomeMessage--
        }
        textSpeedContainer.style.visibility = 'visible'
        combatText.style.display = 'block'
        textInfo = true
    }
    else {
        textSpeedContainer.style.visibility = 'hidden'
        combatText.style.display = 'none'
        textInfo = false
    }
})

textSpeedSlider.addEventListener('input', () => {
    textAppearanceSpeed = +textSpeedSlider.max + 10 - textSpeedSlider.value
})

animationsCheckbox.addEventListener('change', () => {
    animations = animationsCheckbox.checked ? true : false
})

const gameInfoDiv = document.querySelector('#game-info-div')
const gameInfoDivButton = document.querySelector('#game-info-button-div')
gameInfoButton.addEventListener('mouseover', () => {
    gameInfoDiv.style.transition = 'top 1s ease'
    gameInfoDiv.style.visibility = 'visible'
    gameInfoButton.style.boxShadow = 'inset 0 0 0 17px red'
})
gameInfoButton.addEventListener('mouseout', () => {
    gameInfoDiv.style.visibility = 'hidden'
    gameInfoButton.style.boxShadow = 'inset 0 0 0 0'
})

const greenIsAI = document.querySelector('#green-is-AI-checkbox')
greenIsAI.addEventListener('change', () => {
    const introducingAI = `Green is ${greenIsAI.checked ? 'now AI' : 'no longer AI'}. ${greenIsAI.checked ? 'Human player can choose starting attack.' : 'It is human vs human now.'} `
    textPlayerOne.innerText = ''
    textPlayerTwo.innerText = ''
    roundSummary.innerText = ''
    roundSummary.style.marginBottom = '40px'
    combatText.style.outline = '5px solid lightgreen'
    actionButtonsPlayerTwo.forEach(button => {
        button.style.pointerEvents = `${greenIsAI.checked ? 'none' : 'auto'}`
    })
    for (let i = 0; i < introducingAI.length; i++) {
        setTimeout(() => {
            roundSummary.textContent += introducingAI[i]
        }, i * textAppearanceSpeed / 3)
    }
    vsAI = greenIsAI.checked ? true : false
    pressedButtons.length = 0
})

const gifOverlay = document.getElementById('gifOverlay');

function showGif(id) {

    let backgroundGif = ''

    switch (id) {
        case 'weak-attack-player-one': backgroundGif = "url(./photos_and_gifs/weak_attack_player_one.gif)"; setTimeout(hideGifOnce, 500); break;
        case 'strong-attack-player-one': backgroundGif = "url(./photos_and_gifs/strong_attack_player_one.gif)"; setTimeout(hideGifOnce, 1200); break;
        case 'fake-attack-player-one': backgroundGif = "url(./photos_and_gifs/fake_attack_player_one.gif)"; setTimeout(hideGifOnce, 1000); break;
        case 'weak-attack-player-two': backgroundGif = "url(./photos_and_gifs/weak_attack_player_two.gif)"; setTimeout(hideGifOnce, 800); break;
        case 'strong-attack-player-two': backgroundGif = "url(./photos_and_gifs/strong_attack_player_two.gif)"; setTimeout(hideGifOnce, 1500); break;
        case 'fake-attack-player-two': backgroundGif = "url(./photos_and_gifs/fake_attack_player_two.gif)"; setTimeout(hideGifOnce, 1000); break; break;
    }

    gifOverlay.style.backgroundImage = ''
    gifOverlay.style.backgroundImage = backgroundGif
    gifOverlay.style.display = 'block';
 
}

function hideGifOnce() {
    gifOverlay.style.backgroundImage = ''
    gifOverlay.style.backgroundImage = "url(./photos_and_gifs/cover.jpg)"
    gifOverlay.style.display = 'none'
}

container.addEventListener('click', (event) => {
    if (event.target.id === 'container' || event.target.classList.contains('players')) {
        indexForArrOfBGImages++
        if (indexForArrOfBGImages < arrOfBackgroundImages.length)
            container.style.backgroundImage = arrOfBackgroundImages[indexForArrOfBGImages]
        else 
            container.style.backgroundImage = arrOfBackgroundImages[indexForArrOfBGImages = 0]
    }  
})
