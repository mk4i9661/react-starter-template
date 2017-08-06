import React from 'react'
import ReactDOM from 'react-dom'
import Hello from './components/Hello'

const App = () => {
    return (
        <div>
            <p>Hello world!!!!</p>
        </div>
    );
}

ReactDOM.render(<Hello name="TypeScript" enthusiasmLevel={5}/>, document.getElementById("app"))