import { useState, useEffect } from 'react'

function Clock(props) {
  const [date, setDate] = useState(new Date())
    const words = [
        'zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine',
        'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'
    ];

    const tensWords = ['', '', 'twenty', 'thirty', 'forty', 'fifty'];

  function refreshClock() {
    getServerTime()
  }

  //this is not the best approach, to sync the client with the server time, it's better to use
  //webSocket so we can have 1 single connection open to retrieve data

  useEffect(() => {
    getServerTime()
    const timerId = setInterval(refreshClock, 1000)
    return function cleanup() {
      clearInterval(timerId)
    }
  }, [])

  function getServerTime() {
    fetch('clock/time')
      .then(response => {
        return response.json()
      })
      .then(data => {
        setDate(new Date(data))
      })
  }

    let [hours, minutes] = date.toLocaleTimeString('en-US', { timeZone: props.clockProps.timeZone, hour12: false }).split(":").map(Number);
    const ampm = hours < 12 ? 'am' : 'pm'
    const formmattedhours = hours % 12 || 12
    let displayDateText = `${convertNumberToWords(formmattedhours)} ${convertNumberToWords(minutes)} ${ampm}`

    function convertNumberToWords(number) {
        if (number < 20) {
            return words[number];
        }
        else {
            const tensDigit = Math.floor(number / 10)
            const oneDigit = number % 10
            return `${tensWords[tensDigit]} ${words[oneDigit]}`;
        }
    }


    let displayText = date.toLocaleTimeString('en-US', { timeZone: props.clockProps.timeZone, hour12: true })
  if (props.clockProps.blinkColons & (date.getSeconds() % 2 === 0)) {
    displayText = displayText.replace(/:/g, ' ')
  }

  let displayStyle = {
    fontFamily: props.clockProps.fontFamily,
    color: props.clockProps.fontColor,
  }

  let titleStyle = {
    fontSize: `${props.clockProps.titleFontSize}pt`,
  }

  let clockStyle = {
      fontSize: `${props.clockProps.clockFontSize}pt`,
      color: props.clockProps.clockFontColor,
  }

  return (
    <div id="Clock">
      <div id="Digits" style={displayStyle}>
        <div id="title" style={titleStyle}>
          {props.clockProps.titleText}
        </div>
        <div id="time" style={clockStyle}>
          {displayText}
              </div>
              <div id="textTime" style={{ color: 'red' }} >
                  {displayDateText}
              </div>
              <div id="timeZone" style={{ color: 'blue' }} >
                  {props.clockProps.timeZone}
              </div>

      </div>
    </div>
  );
}

export default Clock
