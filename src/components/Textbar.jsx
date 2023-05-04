import React, { useState } from 'react';

export default function Textbar(props) {
    const [text, SetText] = useState('');
    const [copy, SetCopy] = useState('copy')

    const handleUpperCase = () => {
        let newText = text.toUpperCase();
        SetText(newText);
    };

    const handleLowerCase = () => {
        let newText = text.toLowerCase();
        SetText(newText);
    };

    const handleClearCase = () => {
        SetText('');
    };

    const handleExtraSpace = () => {
        let newText = text.split(/[ ]+/);
        SetText(newText.join(" "));
    };
    
    const handleCopyCase = () => {
        let element = document.getElementById("previewBox");
        let newText = element.innerText;
        if (newText === "enter something to preview here") {
            alert("there is nothing to copy");
        } else {
            SetCopy("Copied!");
            setTimeout(() => {
                SetCopy("copy");
            },2000);
        }
        navigator.clipboard.writeText(text);
    };

    const handleOnChange = (event) => {
        SetText(event.target.value);
    };

    return(
        <>
            <h2 className={`text-${props.mode === 'light' ? 'dark' : 'light'}`}><b>{ props.heading }</b></h2>
            <div className="mb-6" >
                <textarea
                    className={"form-control"}
                    onChange={handleOnChange}
                    value={text}
                    placeholder='Enter Text Here'
                    id="myBox"
                    rows="8"
                    style={
                        {
                            backgroundColor: props.mode === 'light' ? "rgb(22 25 29 / 10%)": "rgb(237 251 255 / 10%)",
                            color: props.mode === 'dark' ? 'white' : 'black',
                        }}
                >
                </textarea>
            </div>
            <div className="container mx-auto my-4">
                <div className="row row-cols-1 gap-2">
                    <button onClick={ handleUpperCase } className="col-sm btn btn-primary">convert to UpperCase</button>
                    <button onClick={ handleLowerCase } className="col-sm btn btn-primary">convert to LowerCase</button>
                    <button onClick={handleExtraSpace} className="col-sm btn btn-primary">Remove Extra Spaces</button>
                    <button onClick={handleClearCase} className="col-sm btn btn-danger">Clear Text</button>
                </div>
            </div>
            <div className={`container text-${props.mode === 'light' ? 'dark' : 'light'}`}>
                <h3> <b>Text Summary</b></h3>
                <p> {text === "" ? 0 : text.split(/\s+/).filter((ele) => { return ele.length !== 0 }).length}
                    words and {text.length} characters.
                </p>
                <p> {0.008 * (text === "" ? 0 : text.split(' ').length).toPrecision(2)} mins read.</p>
                <p> { text === "" ? 0: text.split('.').length } sentences</p>
            </div>
            <div className="container" style={{
                padding: 15,
                backgroundColor: props.mode === 'light' ? "rgb(22 25 29 / 10%)": "rgb(237 251 255 / 10%)",
                color: props.mode === 'light' ? 'black' : 'white'
            }}>
                <span className='h3'>Text Preview</span>
                <span onClick={handleCopyCase} className="btn btn-primary" style={{
                    float: 'right',
                    backgroundColor: copy === "Copied!" ? 'green' : 'blue',
                }}>{copy}</span>
                <span></span>
                <p className='mt-2' id="previewBox">{ text.length>0 ? text: "enter something to preview here" }</p>
            </div>
        </>
    )
}
