import { useState, useEffect } from 'react'
import ClockProps from './ClockProps'

function SetClockProps(props) {
  const clockProps = new ClockProps()
  const [fontFamily, setFontFamily] = useState(clockProps.fontFamily)
  const [fontColor, setFontColor] = useState(clockProps.fontColor)
  const [blinkColons, setBlinkColons] = useState(clockProps.blinkColons)
  const [presets, setPresets] = useState([])
  const [loading, setLoading] = useState(true)
  const [titleText, setTitleText] = useState(clockProps.titleText)



  // error variables
  // I create each variable for each input text in case we want independent validations and error messages
  const [fontFamilyError, setFontFamilyError] = useState('')
  const [titleTextError, setTitleTextError] = useState('')
  const [fontColorError, setFontColorError] = useState('')


  useEffect(() => {
    ; (async () => {
      const response = await fetch('clock/presets')
      const data = await response.json()
      setPresets(data)
      setLoading(false)
    })()
  }, [])

  const getProps = () => {
    const props = new ClockProps()
    props.fontFamily = document.getElementById('fontFamily').value
    props.titleFontSize = document.getElementById('titleFontSize').value
    props.clockFontSize = document.getElementById('clockFontSize').value
    props.fontColor = document.getElementById('fontColor').value
    props.titleText = document.getElementById('titleText').value
    props.blinkColons = document.getElementById('blinkColons').checked
    return props
  }


  const validateInputFields = () => {
    let validate = true
    if (fontFamilyError && fontFamilyError.trim().length >= 1) {
      validate = false
    }

    if (titleTextError && titleTextError.trim().length >= 1) {
      validate = false
    }

    if (fontColorError && fontColorError.trim().length >= 1) {
      validate = false
    }

    return validate

  }
  const inputOnKeyDown = (e) => {
    if (e.key === 'Enter') {
      setClockProps()
    }
  }

  const setClockProps = () => {
    if (validateInputFields() === true) {
      const setProps = getProps()
      props.setClockProps(setProps)
      return setProps
    }
    else {
      alert("fix input field errors")
      return null
    }
  }

  const validateTitleText = () => {
    if (!clockProps.titleText || clockProps.titleText.trim().length === 0) {
      setTitleTextError('* titleText field is required')
    }
    else {
      setTitleTextError(null)
    }
  }

  const setTitleTextUI = () => {

    let val = document.getElementById('titleText').value
    setTitleText(val)
    clockProps.titleText = val
    validateTitleText();


  }

  const validateFontFamily = () => {
    if (!clockProps.fontFamily || clockProps.fontFamily.trim().length === 0) {
        setFontFamilyError('* fontFamily field is required')
    }
    else {
        setFontFamilyError(null)
    }
}

const setFontFamilyUI = () => {

    let val = document.getElementById('fontFamily').value
    setFontFamily(val)
    clockProps.fontFamily = val
    validateFontFamily()
}


const validateFontColor = () => {
    if (!clockProps.fontColor || clockProps.fontColor.trim().length === 0) {
        setFontColorError('* fontColor field is required')
    }
    else {
        setFontColorError(null)
    }
}


const setFontColorUI = (e) => {
    let val = document.getElementById('fontColor').value
    setFontColor(val)
    clockProps.fontColor = val

    validateFontColor()
}

  const fontSizeOptions = (selctedSize) => {
    return clockProps.availableFontSizes.map((size) => {
      var option = <option>{size}</option>
      if (size === selctedSize) {
        option = <option selected>{size}</option>
      }
      return option
    })
  }

  const setBlinkColonsUI = () => {
    setBlinkColons(document.getElementById('blinkColons').checked)
    clockProps.blinkColons = document.getElementById('blinkColons').checked
    setClockProps()
  }

  const presetsDisplay = (() => {
    console.log(presets)
    return loading ? (
      <div>
        This is a good place to display and use the presets stored on the sever.
      </div>
    ) : (
      <ul>
        {presets.map((p, i) => (
          <li>
            Preset {i + 1}:{' '}
            {`Font: ${p.fontFamily}, Color: ${p.fontColor}, Title Size: ${p.titleFontSize}, Clock Size: ${p.clockFontSize}`}
          </li>
        ))}
      </ul>
    )
  })()

  return (
    <div id="ClockProps" style={{ overflow: 'auto' }}>
      <div
        style={{
          float: 'left',
          width: '40px',
          height: '100%',
          border: '1px solid white',
          fontSize: '20pt',
        }}
      >
        <a
          style={{ cursor: 'pointer' }}
          onClick={() =>
            alert(
              'This the button that would expand or collapse the settings panel.'
            )
          }
        >
          +/-
        </a>
      </div>
      <div>
        <div>
          <h1>Clock Properties</h1>
          <hr />
        </div>
        <div>
          <div>
            <h2>Settings</h2>
          </div>
          <div>
            <div>Font Family</div>
            <div>
              <input
                id="fontFamily"
                value={fontFamily}
                onChange={setFontFamilyUI}
                onKeyDown={inputOnKeyDown}
              />
              <button onClick={setClockProps}>✓</button>
            </div>
            <div style={{
              color: 'red'
            }}>
              {fontFamilyError}
            </div>
          </div>
          <div>
            <div>Title Text</div>
            <div>
              <input
                id="titleText"
                value={titleText}
                onChange={setTitleTextUI}
                onKeyDown={inputOnKeyDown}
              />
              <button onClick={setClockProps}>✓</button>
              <div>
                <div style={{
                  color: 'red'
                }}>
                  {titleTextError}
                </div>
              </div>
            </div>
          </div>
          <div>
            <div>Title Font Size</div>
            <div>
              <select id="titleFontSize" onChange={setClockProps}>
                {fontSizeOptions(clockProps.titleFontSize)}
              </select>
            </div>
          </div>
          <div>
            <div>Clock Font Size</div>
            <div>
              <select id="clockFontSize" onChange={setClockProps}>
                {fontSizeOptions(clockProps.clockFontSize)}
              </select>
            </div>
          </div>
          <div>
            <div>Font Color</div>
            <div>
              <input
                id="fontColor"
                value={fontColor}
                onChange={(e) => setFontColorUI(e)}
                onKeyDown={inputOnKeyDown}
              />
              <button onClick={setClockProps}>✓</button>
            </div>
            <div>
              <div style={{
                color: 'red'
              }}>
                {fontColorError}
              </div>
            </div>
          </div>
          <div>
            <div>Blink Colons</div>
            <div>
              <input
                id="blinkColons"
                checked={blinkColons}
                type="checkbox"
                onChange={setBlinkColonsUI}
              />
            </div>
          </div>
          <div>
            <div>
              <button
                onClick={() =>
                  alert('This should save the preset to the sever.')
                }
              >
                Save Preset
              </button>
            </div>
          </div>
        </div>
        <hr />
        <div>
          <h2>Presets</h2>
          <div>{presetsDisplay}</div>
        </div>
      </div>
    </div>
  )
}

export default SetClockProps
