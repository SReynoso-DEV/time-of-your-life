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
    const [clockFontColor, setClockFontColor] = useState(clockProps.clockFontColor)

    const [id, setId] = useState(null)
    const [timeZone, setTimeZone] = useState(clockProps.timeZone)
    const [timeZoneOptions, setTimeZoneOptions] = useState([])


  // error variables
  // I create each variable for each input text in case we want independent validations and error messages
  const [fontFamilyError, setFontFamilyError] = useState('')
  const [titleTextError, setTitleTextError] = useState('')
    const [fontColorError, setFontColorError] = useState('')
    const [clockFontColorError, setClockFontColorError] = useState('')

    //panel
    const [isExpanded, setIsExpanded] = useState(true)


  useEffect(() => {
    ; (async () => {
      const response = await fetch('clock/presets')
      const data = await response.json()
      setPresets(data)
        setLoading(false)

        const responseTz = await fetch('timezone')
        const dataTz = await responseTz.json()
        setTimeZoneOptions(dataTz);
    })()
  }, [])

  const getProps = () => {
    const props = new ClockProps()
      props.fontFamily = document.getElementById('fontFamily').value
      props.titleFontSize = document.getElementById('titleFontSize').value
      props.clockFontSize = document.getElementById('clockFontSize').value
      props.fontColor = document.getElementById('fontColor').value
      props.blinkColons = document.getElementById('blinkColons').checked
      props.titleText = document.getElementById('titleText').value
      props.clockFontColor = document.getElementById('clockFontColor').value
      props.timeZone = document.getElementById('timeZoneSelect').value
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

      if (clockFontColorError && clockFontColorError.trim().length >= 1) {
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

    const handleTimeZone = (event) => {
        setTimeZone(event.target.value)
        clockProps.timeZone = event.target.value
        setClockProps()
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

    const validateClockFontColor = () => {
        if (!clockProps.clockFontColor || clockProps.clockFontColor.trim().length === 0) {
            setClockFontColorError('* clockFontColor field is required')
        }
        else {
            setClockFontColorError(null)
        }
    }

    const setClockFontColorUI = (e) => {
        let val = document.getElementById('clockFontColor').value
        setClockFontColor(val)
        clockProps.clockFontColor = val

        validateClockFontColor()
    }

    const sendSelectedPreset = (p) => {
        let setProps = new ClockProps()

        setProps.id = p.id
        setProps.fontFamily = p.fontFamily
        setProps.titleText = p.titleText
        setProps.fontColor = p.fontColor
        setProps.clockFontColor = p.clockFontColor
        setProps.titleFontSize = p.titleFontSize
        setProps.clockFontSize = p.clockFontSize
        setProps.blinkColons = p.blinkColons
        setProps.timeZone = p.timeZone

        setFontFamily(p.fontFamily)
        setFontColor(p.fontColor)
        setBlinkColons(p.blinkColons)
        setTitleText(p.titleText)
        setClockFontColor(p.clockFontColor)
        setTimeZone(p.timeZone)
        setId(p.id)

        document.getElementById('titleFontSize').value = p.titleFontSize
        document.getElementById('clockFontSize').value = p.clockFontSize


        props.setClockProps(setProps)
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
                {`Id: ${p.id},  Font: ${p.fontFamily},  Title Text: ${p.titleText}, Title Color: ${p.fontColor}, Clock Color: ${p.clockFontColor}, Title Size: ${p.titleFontSize}, Clock Size: ${p.clockFontSize}, Blink Column: ${p.blinkColons}, Time Zone: ${p.timeZone}`}
                <button onClick={() => sendSelectedPreset(p)}>✓</button>   
            </li>
        ))}
      </ul>
    )
  })()


  async function savePreset() {
    let data = setClockProps();
    if (data) {
      await postData(data);
    }
  }

    async function fetchPresets() {
        const response = await fetch('clock/presets')
        const data = await response.json()
        return data;
    }

  async function postData(data) {


    try {
      console.log("data: ", data);

      let dto = {
        FontFamily: data.fontFamily,
        TitleFontSize: data.titleFontSize,
        ClockFontSize: data.clockFontSize,
        BlinkColons: data.blinkColons,
        FontColor: data.fontColor,
        ClockFontColor: data.clockFontColor,
        TitleText: data.titleText,
        TimeZone: data.timeZone
      }

      const response = await fetch('clock/presets/' + (id ?? ''), {
        method: (id === '' || id === null) ? 'POST' : 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dto),
      });

      const responseData = await response.json();
      console.log("id", id);
      if (!response.ok) {
        alert('Error: ' + responseData);
      } else {
        alert("successfully" + (id === '' || id === null ? " saved!" : " updated!"))

          let fetchpresets = await fetchPresets ();
        setPresets(fetchpresets)
        setLoading(false)
      }


    } catch (e) {
      alert('catched error: ' + e.message);
    }
  }

  const reset = () => {
    setId('')

    const newPreset = new ClockProps();

    setFontFamily(newPreset.fontFamily)
    setFontColor(newPreset.fontColor)
    setBlinkColons(newPreset.blinkColons)
    setTitleText(newPreset.titleText)
    setClockFontColor(newPreset.clockFontColor)
    setTimeZone(newPreset.timeZone)

    document.getElementById('titleFontSize').value = newPreset.titleFontSize
    document.getElementById('clockFontSize').value = newPreset.clockFontSize

    props.setClockProps(newPreset)
    }

    const toggleClockPanel = () => {
        setIsExpanded(!isExpanded)
    }

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
                      toggleClockPanel()
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
              <div id="ClockContent" style={{ display: isExpanded ? 'block' : 'none' }}>

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
                              <input type="range"
                                  id="titleFontSize"
                                  min={10}
                                  max={50}
                                  step={5}
                                  onChange={setClockProps} />
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
                          <div>Clock Font Color</div>
                          <div>
                              <input
                                  id="clockFontColor"
                                  value={clockFontColor}
                                  onChange={(e) => setClockFontColorUI(e)}
                                  onKeyDown={inputOnKeyDown}
                              />
                              <button onClick={setClockProps}>✓</button>
                          </div>
                          <div>
                              <div style={{
                                  color: 'red'
                              }}>
                                  {clockFontColorError}
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
                          <div>Time Zone</div>
                          <div>
                              <select id="timeZoneSelect" onChange={handleTimeZone} value={timeZone}>
                                  {timeZoneOptions.map((timezone) => (
                                      <option key={timezone}>{timezone}</option>
                                  ))}
                              </select>
                          </div>
                      </div>
                      <div>
                          <div>
                              <button
                                  onClick={() =>
                                      savePreset()
                                  }
                              >
                                  Save Preset
                              </button>
                          </div>
                          <br></br>
                          <div>
                              <button
                                  onClick={() =>
                                      reset()
                                  }
                              >
                                  Reset to Default
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
    </div>
  )
}

export default SetClockProps
